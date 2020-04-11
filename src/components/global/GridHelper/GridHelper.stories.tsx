import Layout from '~/components/global/Layout/Layout';
import GridHelper from './GridHelper';

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
