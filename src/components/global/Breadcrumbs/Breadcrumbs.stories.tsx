import BreadcrumbsComponent, { BreadcrumbsItem } from './Breadcrumbs';

export default {
  component: BreadcrumbsComponent,
  title: 'Global/Breadcrumbs',
};

const mockNavigationData: BreadcrumbsItem[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'All Brands',
    url: '/all-brands',
  },
  {
    label: 'Continental',
    url: '/continental',
  },
  {
    label: 'ProContact Tire Line',
    url: '/continental/pro-contact',
  },
  {
    label: '215/55R16',
    url: '/continental/pro-contact/?size=215/55R16',
  },
];

export function Breadcrumbs() {
  return (
    <BreadcrumbsComponent
      currentPath={mockNavigationData.slice().pop()?.url}
      navigationItems={mockNavigationData}
    />
  );
}
