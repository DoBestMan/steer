import NextButton from './ControlButton/NextButton';
import PrevButton from './ControlButton/PrevButton';
import styles from './Frame.styles';

interface Props {
  children?: React.ReactNode;
  currentIndex: number;
  length: number;
  slideTo: (index: number) => void;
}

function Frame({ currentIndex, slideTo, length }: Props) {
  return (
    <div css={styles.root}>
      {currentIndex > 0 && (
        <PrevButton currentIndex={currentIndex} slideTo={slideTo} />
      )}
      {currentIndex < length && (
        <NextButton currentIndex={currentIndex} slideTo={slideTo} />
      )}
    </div>
  );
}

export default Frame;
