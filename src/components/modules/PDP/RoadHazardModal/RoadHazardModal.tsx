import { useEffect } from 'react';

import Button from '~/components/global/Button/Button';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import { modalContainerStyles } from '~/components/global/Modal/BottomCardModal.styles';
import RadioSelector from '~/components/global/RadioSelector/RadioSelector';
import { BUTTON_STYLE, LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import PDPModalHeader from '../PDPModalHeader/PDPModalHeader';
import styles from './RoadHazardModal.styles';

export const CONSTANTS = {
  RADIO_NAME: 'road-hazard-radio',
  HAS_COVERAGE: 'coverage',
  NO_COVERAGE: 'no-coverage',
};

const mapCoverageToState = {
  [CONSTANTS.HAS_COVERAGE]: true,
  [CONSTANTS.NO_COVERAGE]: false,
};

interface Props {
  copy: string;
  hasCoverage: string;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
  onConfirm: (goToCheckout?: boolean) => void;
  setHasCoverage: (value: string) => void;
  shouldDisplayOptions?: boolean;
  subtitle: string;
}

function LearnMoreLink() {
  return (
    <Link
      as={LINK_TYPES.BUTTON}
      css={styles.link}
      theme={THEME.LIGHT}
      // TODO wire up link url
      href="/"
    >
      {ui('pdp.roadHazard.coverageLink')}
    </Link>
  );
}

function RoadHazardModal({
  copy,
  hasCoverage,
  isOpen,
  onClose,
  onBack,
  onConfirm,
  setHasCoverage,
  shouldDisplayOptions,
  subtitle,
}: Props) {
  function handleIntercepAction(value: string) {
    setHasCoverage(value);
    onConfirm();
  }

  useEffect(() => {
    if (
      !shouldDisplayOptions &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
  }, [shouldDisplayOptions]);

  return (
    <BottomCardModal
      contentLabel="Road Hazard"
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
    >
      <div css={modalContainerStyles.container}>
        <PDPModalHeader
          copy={copy}
          customCopyStyles={styles.modalHeaderStyles}
          icon={ICONS.SMILEY_WINK}
          title={ui('pdp.roadHazard.title')}
          subtitle={subtitle}
        />

        {shouldDisplayOptions && (
          <div>
            <RadioSelector
              activeValue={hasCoverage}
              css={styles.roadHazardRadio}
              label={ui('pdp.roadHazard.coverageLabel')}
              name={CONSTANTS.RADIO_NAME}
              onChange={setHasCoverage}
              outerContent={<LearnMoreLink />}
              value={CONSTANTS.HAS_COVERAGE}
            >
              <>
                <p css={styles.price}>
                  {/* TODO wire up price */}
                  {ui('pdp.roadHazard.price', { price: '$13.02' })}
                </p>
                <p css={styles.copyHeader}>{ui('pdp.roadHazard.copyHeader')}</p>
                <p css={styles.copy}>
                  <Markdown renderers={{ paragraph: 'span' }}>
                    {ui('pdp.roadHazard.copy')}
                  </Markdown>
                </p>
              </>
            </RadioSelector>
            <RadioSelector
              activeValue={hasCoverage}
              css={styles.removeCoverageRadio}
              label={ui('pdp.roadHazard.removeLabel')}
              name={CONSTANTS.RADIO_NAME}
              onChange={setHasCoverage}
              value={CONSTANTS.NO_COVERAGE}
            />
          </div>
        )}

        <div css={modalContainerStyles.ctaGroup}>
          {shouldDisplayOptions ? (
            <Button
              css={styles.button}
              onClick={function () {
                onConfirm(mapCoverageToState[hasCoverage]);
              }}
              theme={THEME.LIGHT}
            >
              {ui('pdp.roadHazard.continueButtonLabel')}
            </Button>
          ) : (
            <>
              <Button
                css={styles.button}
                onClick={function () {
                  handleIntercepAction(CONSTANTS.HAS_COVERAGE);
                }}
                theme={THEME.LIGHT}
              >
                {ui('pdp.roadHazard.keepCoverageButtonLabel')}
              </Button>
              <Button
                css={styles.button}
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
