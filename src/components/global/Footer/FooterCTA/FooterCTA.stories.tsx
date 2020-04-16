import FooterCTA from './FooterCTA';

import { ICONS } from '~/components/global/Icon/Icon.constants';

export default {
  component: FooterCTA,
  title: 'Footer CTA',
};

export function SalesCTA() {
  return (
    <FooterCTA href="/" icon={ICONS.PHONE}>
      Sales
    </FooterCTA>
  );
}

export function CustomerSupportCTA() {
  return (
    <FooterCTA href="/" icon={ICONS.MAIL}>
      Customer support
    </FooterCTA>
  );
}
