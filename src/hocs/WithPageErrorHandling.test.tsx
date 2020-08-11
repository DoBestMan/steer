import '~/pages/_error';

import { render, screen } from '@testing-library/react';

import WithErrorPageHandling from './WithPageErrorHandling';

jest.mock('~/pages/_error', () => {
  return function MockError({ statusCode }: { statusCode: number }) {
    return <h1>Error {statusCode}</h1>;
  };
});

function TestPage({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

const TestPageWithHoc = WithErrorPageHandling(TestPage);

describe('WithPageErrorHandling', () => {
  test('successful page', () => {
    render(<TestPageWithHoc title="My Page" />);

    expect(screen.getByText('My Page')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  test('page with error', () => {
    render(<TestPageWithHoc errorStatusCode={404} />);

    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });
});
