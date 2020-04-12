import GridHelper from './GridHelper';

import Layout from '~/components/global/Layout/Layout';

export default {
  component: GridHelper,
  title: 'GridHelper',
};

export function ShowGridHelper() {
  return (
    <Layout>
      <GridHelper show />
    </Layout>
  );
}
