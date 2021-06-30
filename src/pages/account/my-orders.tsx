import { AccountContextProvider } from '~/components/modules/Account/Account.context';
import MyOrdersPage from '~/components/pages/MyOrdersPage/MyOrdersPage';

function MyGarage() {
  return (
    <AccountContextProvider>
      <MyOrdersPage />
    </AccountContextProvider>
  );
}

export default MyGarage;
