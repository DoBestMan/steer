import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './InsightsItem.styles';

interface Props {
  actions: { action: () => void; label: string }[] | null;
  hasInfoModule?: boolean;
  isOpen: boolean;
  onClose: () => void;
  vehicle?: string | null;
  vehicleModel?: string | null;
}

function SizeCheckModal({
  actions,
  hasInfoModule,
  isOpen,
  onClose,
  vehicle,
  vehicleModel,
}: Props) {
  const learnMoreLink = '[Learn more](#)';
  const eyebrow = hasInfoModule ? undefined : vehicle;

  return (
    <BottomCardModal
      contentLabel={ui('pdp.insights.fitting.modalContentLabel')}
      isOpen={isOpen}
      onClose={onClose}
    >
      {eyebrow && <span css={styles.eyebrow}>{eyebrow}</span>}
      <div
        css={[
          modalContainerStyles.container,
          eyebrow ? styles.modalWithEyebrow : undefined,
        ]}
      >
        {hasInfoModule && (
          <>
            <FeaturedInfoModule
              copy={ui('pdp.insights.fitting.modalInfoCopy', {
                link: learnMoreLink,
              })}
              icon={ICONS.TIP_MECHANIC}
              featureDescription={ui(
                'pdp.insights.fitting.modalInfoDescription',
              )}
              title={ui('pdp.insights.fitting.modalInfoTitle', {
                model: vehicleModel || '',
              })}
            />

            <span css={styles.modalDivider} />
          </>
        )}

        {actions && (
          <ul>
            {actions.map(({ label, action }) => (
              <li key={label} css={styles.modalListItem}>
                <button type="button" onClick={action} css={styles.modalButton}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </BottomCardModal>
  );
}

export default SizeCheckModal;
