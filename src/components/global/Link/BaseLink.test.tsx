import { render } from '@testing-library/react';
import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import BaseLink from './BaseLink';

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

describe('BaseLink', () => {
  test('internal static link', () => {
    const { container } = render(
      <BaseLink href="/tire-brands">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <a
          href="/tire-brands"
        >
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

  test('internal dynamic link', () => {
    const { container } = render(
      <BaseLink href="/drupal-tires">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-as="/drupal-tires"
      >
        <a
          href="/[brandName]-tires"
        >
          Click here
        </a>
      </div>
    `);
  });

  test('internal dynamic link - one param', () => {
    const { container } = render(
      <BaseLink href="/drupal-tires/reviews">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-as="/drupal-tires/reviews"
      >
        <a
          href="/[brandName]-tires/reviews"
        >
          Click here
        </a>
      </div>
    `);
  });

  test('internal dynamic link - two params', () => {
    const { container } = render(
      <BaseLink href="/drupal-tires/tractors">Click here</BaseLink>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-test-as="/drupal-tires/tractors"
      >
        <a
          href="/[brandName]/[categoryOrType]"
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
