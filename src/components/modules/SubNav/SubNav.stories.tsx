import { default as SubNavComponent } from './SubNav';
import subnav from './SubNav.mocks';

export default {
  component: SubNavComponent,
  title: 'Sub Nav',
};

export function SubNav() {
  return <SubNavComponent {...subnav} />;
}
