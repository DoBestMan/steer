import { render } from '@testing-library/react';

import Layout from './Layout';

describe('Layout', () => {
  it('renders children', () => {
    const { getByText } = render(<Layout>Hello!</Layout>);

    expect(getByText('Hello!')).toBeInTheDocument();
  });
});
