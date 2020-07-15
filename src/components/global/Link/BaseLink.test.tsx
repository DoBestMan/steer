import { render } from '@testing-library/react';
import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

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
      as: {
        pathname: '/brands/drupal-tires',
        query: {},
      },
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
      as: {
        pathname: '/brands/drupal-tires/reviews',
        query: {},
      },
      externalProps: {},
      finalHref: {
        pathname: '/brands/[brand]/reviews',
        query: {},
      },
      isInternal: true,
      prefetch: undefined,
    });
  });
});

test('internal dynamic link - two params', () => {
  expect(
    useBaseLinkProps({
      href: '/brands/drupal-tires/tractors',
    }),
  ).toEqual({
    as: {
      pathname: '/brands/drupal-tires/tractors',
      query: {},
    },
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
    as: {
      pathname: '/brands/drupal-tires',
      query: {
        trim: 'LX',
      },
    },
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
