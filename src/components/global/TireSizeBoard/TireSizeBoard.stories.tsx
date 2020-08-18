import React from 'react';

import TireSizeBoard from '~/components/global/TireSizeBoard/TireSizeBoard';
import { tireSizeBoardPropsMock } from '~/components/global/TireSizeBoard/TireSizeBoard.mocks';

export default {
  component: TireSizeBoard,
  title: 'Global/Tire size board',
};

export function DefaultTireSizeBoard() {
  return <TireSizeBoard {...tireSizeBoardPropsMock} />;
}
