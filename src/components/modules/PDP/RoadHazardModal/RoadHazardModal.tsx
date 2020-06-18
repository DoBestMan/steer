import { useState } from 'react';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import RadioSelector from '~/components/global/RadioSelector/RadioSelector';
import { LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import PDPModalHeader from '../PDPModalHeader/PDPModalHeader';
import styles from './RoadHazardModal.styles';

const CONSTANTS = {
  RADIO_NAME: 'road-hazard-radio',
  RH_COVERAGE_VALUE: 'roadHazardCoverage',
  REMOVE_COVERAGE_VALUE: 'removeCoverage',
};
const title = 'Road Hazard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
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

function RoadHazardModal({ isOpen, onClose }: Props) {
  const [activeValue, setIsActive] = useState(CONSTANTS.RH_COVERAGE_VALUE);
  function handleSetIsActive(value: string) {
    setIsActive(value);
  }

  return (
    <BottomCardModal contentLabel={title} isOpen={isOpen} onClose={onClose}>
      <PDPModalHeader
        copy={ui('pdp.roadHazard.headerCopy')}
        customCopyStyles={styles.modalHeaderStyles}
        icon={ICONS.SMILEY_WINK}
        title={ui('pdp.roadHazard.title')}
        subtitle={ui('pdp.roadHazard.headerSubtitle')}
      />
      <div>
        <RadioSelector
          activeValue={activeValue}
          css={styles.roadHazardRadio}
          label={ui('pdp.roadHazard.coverageLabel')}
          name={CONSTANTS.RADIO_NAME}
          onChange={handleSetIsActive}
          outerContent={<LearnMoreLink />}
          value={CONSTANTS.RH_COVERAGE_VALUE}
        >
          <>
            <p css={styles.price}>
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
          activeValue={activeValue}
          css={styles.removeCoverageRadio}
          label={ui('pdp.roadHazard.removeLabel')}
          name={CONSTANTS.RADIO_NAME}
          onChange={handleSetIsActive}
          value={CONSTANTS.REMOVE_COVERAGE_VALUE}
        />
      </div>
    </BottomCardModal>
  );
}

export default RoadHazardModal;
