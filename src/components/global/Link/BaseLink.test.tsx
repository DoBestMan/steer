import { render } from '@testing-library/react';
import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { ROUTE_MAP, ROUTES } from '~/lib/constants';

import BaseLink from './BaseLink';
import { useBaseLinkProps } from './BaseLink.hooks';

// Mock of next/link to make sure we're passing the proper
// `as` and `prefetch` values
jest.mock('next/link', () => {
  return function MockNextLink({
    children,
    prefetch,
    as,
  }: LinkProps & { children: ReactNode }) {
    return (
      <div data-test-as={as} data-test-prefetch={prefetch}>
        {children}
      </div>
    );
  };
});

// Test component logic (for external or internal absolute links)
describe('BaseLink', () => {
  test('internal static link', () => {
    const { container } = render(
      <BaseLink href="/brands">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <a>
          Click here
        </a>
      </div>
    `);
  });

  test('external static link', () => {
    const { container } = render(
      <BaseLink href="/tire-brands" isExternal>
        Click here
      </BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-prefetch="false"
      >
        <a
          href="/tire-brands"
          rel="noopener noreferrer"
          target="_blank"
        >
          Click here
        </a>
      </div>
    `);
  });

  test('internal absolute link', () => {
    const { container } = render(
      <BaseLink href="http://www.google.com">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-prefetch="false"
      >
        <a
          href="http://www.google.com"
        >
          Click here
        </a>
      </div>
    `);
  });

  test('external absolute link', () => {
    const { container } = render(
      <BaseLink href="http://www.google.com" isExternal>
        Click here
      </BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-prefetch="false"
      >
        <a
          href="http://www.google.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Click here
        </a>
      </div>
    `);
  });

  test('mail link', () => {
    const { container } = render(
      <BaseLink href="mailto:sarah@mogin.com">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-prefetch="false"
      >
        <a
          href="mailto:sarah@mogin.com"
        >
          Click here
        </a>
      </div>
    `);
  });

  test('telephone link', () => {
    const { container } = render(
      <BaseLink href="tel:1234567890">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-prefetch="false"
      >
        <a
          href="tel:1234567890"
        >
          Click here
        </a>
      </div>
    `);
  });
});

// Test hook logic (for internal dynamic links)
describe('BaseLink hook', () => {
  test('internal dynamic link', () => {
    expect(
      useBaseLinkProps({
        href: '/brands/drupal-tires',
      }),
    ).toEqual({
      as: '/brands/drupal-tires',
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  test('internal dynamic link - one param', () => {
    expect(
      useBaseLinkProps({
        href: '/brands/drupal-tires/reviews',
      }),
    ).toEqual({
      as: '/brands/drupal-tires/reviews',
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]/reviews',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  test('internal dynamic link - two params', () => {
    expect(
      useBaseLinkProps({
        href: '/brands/drupal-tires/tractors',
      }),
    ).toEqual({
      as: '/brands/drupal-tires/tractors',
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]/[productLine]',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  test('internal dynamic link with hash params', () => {
    expect(
      useBaseLinkProps({
        href: '/brands/drupal-tires/tractors#tireSize=200-r14',
      }),
    ).toEqual({
      as: '/brands/drupal-tires/tractors#tireSize=200-r14',
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]/[productLine]',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  test('internal dynamic link with anchor', () => {
    expect(
      useBaseLinkProps({
        href: '/brands/drupal-tires/tractors#anchor',
      }),
    ).toEqual({
      as: '/brands/drupal-tires/tractors#anchor',
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]/[productLine]',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  test('internal dynamic link - with query params', () => {
    expect(
      useBaseLinkProps({
        href: '/brands/drupal-tires?trim=LX',
      }),
    ).toEqual({
      as: '/brands/drupal-tires?trim=LX',
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]',
        query: {
          trim: 'LX',
        },
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  it('obeys order of ROUTE_TYPE_MAP so static links beat matching dynamic paths ', () => {
    expect(
      useBaseLinkProps({
        // matches /[slug], but /track-your-order has priority
        href: '/track-your-order',
      }),
    ).toEqual({
      as: undefined,
      externalProps: {},
      finalHref: '/track-your-order',
      isInternal: true,
      prefetch: undefined,
    });
  });

  test('open template slug', () => {
    expect(
      useBaseLinkProps({
        href: '/my-open-template',
      }),
    ).toEqual({
      as: '/my-open-template',
      externalProps: {},
      finalHref: {
        pathname: '/[slug]',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });

  describe('internal dynamic link with special route params', () => {
    const routeQueryParamOptions = {
      routes: [ROUTE_MAP[ROUTES.VEHICLE_CATALOG]],
      params: {
        brand: 'continental',
      },
    };

    it('appends specified params when route matches list', () => {
      expect(
        useBaseLinkProps({
          href: '/vehicles/honda/civic/2019?trim=LX',
          routeQueryParamOptions,
        }),
      ).toEqual({
        as: '/vehicles/honda/civic/2019?brand=continental&trim=LX',
        externalProps: {},
        finalHref: {
          pathname: '/vehicles/[make]/[model]/[year]',
          query: {
            brand: 'continental',
            trim: 'LX',
          },
        },
        isInternal: true,
        prefetch: undefined,
      });
    });

    it('does not append params if route is not a match', () => {
      expect(
        useBaseLinkProps({
          href: '/brands/drupal-tires',
          routeQueryParamOptions,
        }),
      ).toEqual({
        as: '/brands/drupal-tires',
        externalProps: {},
        finalHref: {
          pathname: '/brands/[brand]',
          query: {},
        },
        isInternal: true,
        prefetch: undefined,
      });
    });
  });
});
