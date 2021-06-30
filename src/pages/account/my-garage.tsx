import { GetStaticProps } from 'next';

import { AccountContextProvider } from '~/components/modules/Account/Account.context';
import MyGaragePageContainer from '~/components/pages/MyGaragePage/MyGaragePage.container';

function MyGarage() {
  return (
    <AccountContextProvider>
      <MyGaragePageContainer />
    </AccountContextProvider>
  );
}

export const getStaticProps: GetStaticProps<Record<
  string,
  unknown
>> = async () => {
  return {
    props: {},
  };
};

export default MyGarage;
