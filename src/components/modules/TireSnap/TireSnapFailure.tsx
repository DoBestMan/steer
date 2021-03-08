import Button from '~/components/global/Button/Button';
import Image from '~/components/global/Image/Image';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import stylesTireSnap from './TireSnap.styles';
import styles from './TireSnapModal.styles';

interface Props {
  onRetake: () => void;
  onSearchAnotherWay: () => void;
}
function TireSnapFailure({ onRetake, onSearchAnotherWay }: Props) {
  return (
    <div css={styles.failureScreenWrapper}>
      <div css={styles.failureTopSection}>
        <Image
          width={74}
          altText={ui('simpleSnap.failureScreen.image.alt')}
          src={ui('simpleSnap.failureScreen.image.src')}
          css={styles.mainIcon}
        />
        <h2>{ui('simpleSnap.failureScreen.message')}</h2>
        <h3 css={styles.smallTitle}>{ui('simpleSnap.failureScreen.note')}</h3>
      </div>
      <Image
        altText={ui('simpleSnap.tireSnapModal.image.alt')}
        src={ui('simpleSnap.tireSnapModal.image.src')}
        css={styles.headerFailureImage}
      />
      <div css={stylesTireSnap.widthWrapper}>
        <ol css={stylesTireSnap.instructionsList}>
          {ui('simpleSnap.failureScreen.instructions')
            .split('|')
            .map((e, i) => (
              <li key={i}>{e}</li>
            ))}
        </ol>
      </div>
      <div css={styles.control}>
        <Button
          css={styles.actionButton}
          onClick={onSearchAnotherWay}
          style={BUTTON_STYLE.OUTLINED}
          theme={THEME.ORANGE}
        >
          {ui('simpleSnap.failureScreen.searchButtonText')}
        </Button>
        <Button
          css={styles.actionButton}
          onClick={onRetake}
          theme={THEME.ORANGE}
        >
          {ui('simpleSnap.failureScreen.retakePhotoButtonText')}
        </Button>
      </div>
    </div>
  );
}

export default TireSnapFailure;
