import { GetStaticProps } from 'next';

import ReferAFriend from '~/components/pages/ReferAFriend/ReferAFriend';

function Invite() {
  return <ReferAFriend />;
}

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  };
};

export default Invite;
