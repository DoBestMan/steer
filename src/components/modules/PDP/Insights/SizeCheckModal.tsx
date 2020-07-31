import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import { ui } from '~/lib/utils/ui-dictionary';

import { SIZE_CHECK_STATES } from './Insights.types';
import styles from './SizeCheckModal.styles';

interface Props {
  actions: { action: () => void; label: string }[] | null;
  isOpen: boolean;
  onClose: () => void;
  sizeCheckState: SIZE_CHECK_STATES;
  vehicle?: string | null;
  vehicleModel?: string | null;
}

function SizeCheckModal({
  actions,
  isOpen,
  onClose,
  sizeCheckState,
  vehicle,
  vehicleModel,
}: Props) {
  const learnMoreLink = '[Learn more](#)';
  const doesFit =
    sizeCheckState === SIZE_CHECK_STATES.SIZE_FITS ||
    sizeCheckState === SIZE_CHECK_STATES.TIRE_LINE_FITS;
  const tireLineDoesNotFit =
    sizeCheckState === SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT;
  const eyebrow = doesFit ? vehicle : undefined;

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
        {!doesFit && (
          <>
            <FeaturedInfoModule
              copy={ui('pdp.insights.fitting.modalInfoCopy', {
                link: learnMoreLink,
              })}
              icon={ICONS.TIP_MECHANIC}
              featureDescription={ui(
                'pdp.insights.fitting.modalInfoDescription',
              )}
              title={ui(
                tireLineDoesNotFit
                  ? 'pdp.insights.fitting.modalInfoTitleTireLine'
                  : 'pdp.insights.fitting.modalInfoTitle',
                {
                  model: vehicleModel || '',
                },
              )}
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
