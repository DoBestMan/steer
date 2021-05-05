import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { ModalContextProps } from '~/context/Modal.context';
import { THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './InstallationWhatsIncluded.styles';

const whatsIncludedItemKeys = [
  'pdp.installation.whatsIncluded.items.mounting',
  'pdp.installation.whatsIncluded.items.disposal',
  'pdp.installation.whatsIncluded.items.rubber',
  'pdp.installation.whatsIncluded.items.shop',
  'pdp.installation.whatsIncluded.items.tpms',
];

function InstallationWhatsIncluded({
  openStaticModal,
}: Pick<ModalContextProps, 'openStaticModal'>) {
  const openModal = () => {
    openStaticModal(STATIC_MODAL_IDS.WHATS_INCLUDED_WITH_INSTALLATION);
  };

  return (
    <div css={styles.container}>
      <h4 css={styles.title}>{ui('pdp.installation.whatsIncluded.title')}</h4>
      <ul css={styles.items}>
        {whatsIncludedItemKeys.map((key) => (
          <li key={key}>
            <Icon name={ICONS.CHECKMARK} css={styles.checkmark} />
            {ui(key)}
          </li>
        ))}
      </ul>
      <Link
        as="button"
        onClick={openModal}
        theme={THEME.LIGHT}
        css={styles.details}
      >
        {ui('pdp.installation.whatsIncluded.details')}
      </Link>
    </div>
  );
}

export default InstallationWhatsIncluded;
