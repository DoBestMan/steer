// params will include diameter and category or type
// final structure should be something like `/tire-sizes/12-inch-winter-tires

import { COLORS } from '~/lib/constants';

function TireCategory() {
  return <div css={{ background: COLORS.GLOBAL.ORANGE, paddingTop: 200 }} />;
}

export default TireCategory;
