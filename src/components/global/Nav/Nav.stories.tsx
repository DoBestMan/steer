import Nav from '~/components/global/Nav/Nav';
import { data } from '~/components/global/Nav/Nav.data';

export default {
  component: Nav,
  title: 'Nav',
};

export function NavNoKnobs() {
  return <Nav links={data.links} isHomepage />;
}

export function NavNotHomepage() {
  return <Nav links={data.links} />;
}
