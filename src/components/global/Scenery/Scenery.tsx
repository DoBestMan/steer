import { styles } from './Scenery.styles';
import { instanceOfSceneries, Sceneries } from './Scenery.types';

type Props = {
  animate?: boolean;
  sceneryID: Sceneries | string | null;
};

function Scenery({ sceneryID, animate = false, ...rest }: Props) {
  // No need to render if no sceneryID
  if (!sceneryID || !instanceOfSceneries(sceneryID)) {
    return null;
  }

  const inlineStyle = {
    backgroundImage: `url(/static/assets/sceneries/${sceneryID}.svg)`,
  };

  const classAnimation = animate && styles[`containerAnimated_${sceneryID}`];

  return (
    <div
      css={[styles.container, classAnimation]}
      style={inlineStyle}
      {...rest}
    ></div>
  );
}

export default Scenery;
