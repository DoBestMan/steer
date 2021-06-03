import { text } from '@storybook/addon-knobs';
import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteLink } from '~/data/models/SiteLink';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import ConfirmFitDecisionModal from './ConfirmFitDecisonModal';

export default {
  component: ConfirmFitDecisionModal,
  title: 'PDP/ConfirmFitDecisionModal',
};

export function ConfirmFitDecisionModalWithKnobs() {
  const [modalStatus, setModalStatus] = useState<boolean>(true);
  const header = text('header', 'header');
  const subTitle = text('sub-title', 'sub-title');
  const title = text('title', 'title');
  const linkLabel = text('link label', 'link label');
  const link = {
    label: linkLabel,
    link: {
      href: '/',
      isExternal: false,
    } as SiteLink,
  };
  const mockDecisionModalParams = {
    header,
    icon: ICONS.TIP_MECHANIC,
    labelLink: link,
    subTitle,
    title,
  };
  return (
    <div>
      <Button theme={THEME.LIGHT} onClick={() => setModalStatus(true)}>
        {ui('pdp.insights.openDecisionModal')}
      </Button>
      <ConfirmFitDecisionModal
        data={mockDecisionModalParams}
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        openVehicleSelector={() => null}
      />
    </div>
  );
}
