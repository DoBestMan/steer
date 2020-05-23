import { screenReaderText } from '~/styles/document/accessibility.styles';

interface Props {
  text: string;
}

function LiveRegion({ text }: Props) {
  return (
    <span css={screenReaderText} role="region">
      {text}
    </span>
  );
}

export default LiveRegion;
