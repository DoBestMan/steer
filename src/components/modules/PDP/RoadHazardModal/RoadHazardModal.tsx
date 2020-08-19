import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import FeaturedInfoModule from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import RadioSelector from '~/components/global/Radio/RadioSelector';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { useModalContext } from '~/context/Modal.context';
import { BUTTON_STYLE, LINK_TYPES, THEME } from '~/lib/constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './RoadHazardModal.styles';

export const CONSTANTS = {
  RADIO_NAME: 'road-hazard-radio',
  HAS_COVERAGE: 'coverage',
  NO_COVERAGE: 'no-coverage',
};

interface Props {
  durationLabel: string;
  isOpen: boolean;
  onClose: () => void;
  price: string;
}

function LearnMoreLink({
  openStaticModal,
}: {
  openStaticModal: (id: string) => void;
}) {
  function handleClick() {
    openStaticModal(STATIC_MODAL_IDS.ROAD_HAZARD_COVERAGE);
  }

  return (
    <Link
      as={LINK_TYPES.BUTTON}
      css={styles.link}
      theme={THEME.LIGHT}
      onClick={handleClick}
    >
      {ui('pdp.roadHazard.coverageLink')}
    </Link>
  );
}

function RoadHazardModal({ durationLabel, isOpen, onClose, price }: Props) {
  const { addToCart, isAddingToCart } = useProductDetailContext();

  const { openStaticModal } = useModalContext();
  const [value, setValue] = useState(CONSTANTS.HAS_COVERAGE);
  const [shouldIntercept, setShouldIntercept] = useState(false);

  function handleBack() {
    setShouldIntercept(false);
  }

  function handleConfirm() {
    if (value === CONSTANTS.NO_COVERAGE) {
      setShouldIntercept(true);
      return;
    }

    addToCart({ shouldAddCoverage: value === CONSTANTS.HAS_COVERAGE });
  }

  function handleIntercepAction(_value: string) {
    addToCart({ shouldAddCoverage: _value === CONSTANTS.HAS_COVERAGE });
  }

  useEffect(() => {
    if (shouldIntercept && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [shouldIntercept]);

  return (
    <BottomCardModal
      contentLabel="Road Hazard"
      isOpen={isOpen}
      onClose={onClose}
      onBack={shouldIntercept ? handleBack : undefined}
    >
      <div data-testid="road-hazard-modal" css={modalContainerStyles.container}>
        <FeaturedInfoModule
          copy={ui(
            shouldIntercept
              ? 'pdp.roadHazard.interceptCopy'
              : 'pdp.roadHazard.headerCopy',
            {
              durationLabel,
              price: formatDollars(price),
            },
          )}
          customCopyStyles={styles.modalHeaderStyles}
          icon={ICONS.SMILEY_WINK}
          featureDescription={ui('pdp.roadHazard.featureDescription')}
          title={ui(
            shouldIntercept
              ? 'pdp.roadHazard.interceptTitle'
              : 'pdp.roadHazard.headerTitle',
            {
              durationLabel,
              price: formatDollars(price),
            },
          )}
        />

        {!shouldIntercept && (
          <div>
            <RadioSelector
              activeValue={value}
              css={styles.roadHazardRadio}
              label={ui('pdp.roadHazard.coverageLabel')}
              name={CONSTANTS.RADIO_NAME}
              onChange={setValue}
              outerContent={<LearnMoreLink openStaticModal={openStaticModal} />}
              value={CONSTANTS.HAS_COVERAGE}
            >
              <>
                <p css={styles.price}>{formatDollars(price)}</p>
                <p css={styles.copyHeader}>{ui('pdp.roadHazard.copyHeader')}</p>
                <p css={styles.copy}>
                  <Markdown renderers={{ paragraph: 'span' }}>
                    {ui('pdp.roadHazard.copy', {
                      durationLabel,
                    })}
                  </Markdown>
                </p>
              </>
            </RadioSelector>
            <RadioSelector
              activeValue={value}
              css={styles.removeCoverageRadio}
              label={ui('pdp.roadHazard.removeLabel')}
              name={CONSTANTS.RADIO_NAME}
              onChange={setValue}
              value={CONSTANTS.NO_COVERAGE}
            />
          </div>
        )}

        <div css={modalContainerStyles.ctaGroup}>
          {!shouldIntercept ? (
            <Button
              css={styles.button}
              data-testid="road-hazard-continue"
              onClick={handleConfirm}
              isDisabled={isAddingToCart}
              theme={THEME.LIGHT}
            >
              <span>{ui('pdp.roadHazard.continueButtonLabel')}</span>
              {isAddingToCart && (
                <div css={styles.buttonLoading}>
                  <Loading theme={THEME.DARK} />
                </div>
              )}
            </Button>
          ) : isAddingToCart ? (
            <div css={styles.loading}>
              <Loading theme={THEME.LIGHT} />
            </div>
          ) : (
            <>
              <Button
                css={styles.button}
                data-testid="add-coverage"
                onClick={function () {
                  handleIntercepAction(CONSTANTS.HAS_COVERAGE);
                }}
                theme={THEME.LIGHT}
              >
                {ui('pdp.roadHazard.keepCoverageButtonLabel')}
              </Button>
              <Button
                css={styles.button}
                data-testid="no-coverage"
                onClick={function () {
                  handleIntercepAction(CONSTANTS.NO_COVERAGE);
                }}
                style={BUTTON_STYLE.OUTLINED}
                theme={THEME.LIGHT}
              >
                {ui('pdp.roadHazard.noThanksButtonLabel')}
              </Button>
            </>
          )}
        </div>
      </div>
    </BottomCardModal>
  );
}

export default RoadHazardModal;
