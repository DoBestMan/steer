import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { parseCookies, setCookie } from 'nookies';

import ErrorPage from '~/components/pages/ErrorPage/ErrorPage';
import { COOKIES } from '~/lib/constants/cookies';
import { isLocal, isMockDeploy } from '~/lib/utils/deploy';
import { redirectToNotFound } from '~/lib/utils/routes';

interface Data {
  cartQty: string;
}

const isFakeCheckoutEnabled = isMockDeploy() || isLocal();

function FakeCheckout({ cartQty }: Data) {
  return (
    <ErrorPage
      errorCode={cartQty}
      description="Cart quantity updated!"
      hasHomeButton
    />
  );
}

const rotatingValues = ['4', '12', '0'];

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  if (!isFakeCheckoutEnabled) {
    redirectToNotFound(context.res);
    return {} as GetServerSidePropsResult<Data>;
  }

  const cookies = parseCookies(context);
  const currentCartQty = cookies[COOKIES.CART_QTY] || '0';
  const currentIndex = rotatingValues.findIndex((v) => v === currentCartQty);
  const newIndex = (currentIndex + 1) % rotatingValues.length;
  const newCartQty = rotatingValues[newIndex];

  setCookie(context, COOKIES.CART_QTY, newCartQty, {
    maxAge: 24 * 60 * 60, // valid for 1 day
    path: '/',
  });

  return { props: { cartQty: newCartQty } };
};

export default FakeCheckout;
