import { GetStaticProps } from 'next';

import ReferAFriend from '~/components/pages/ReferAFriend/ReferAFriend';

function Invite() {
  return <ReferAFriend />;
}

export const getStaticProps: GetStaticProps<Record<
  string,
  unknown
>> = async () => {
  return {
    props: {},
  };
};

export default Invite;
