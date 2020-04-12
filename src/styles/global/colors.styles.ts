import { css } from '@emotion/core';

import { colors as colorConsts } from '~/styles/constants/colors';

const colorCategoryKeys = Object.keys(colorConsts);
const colorCategoryVals = Object.values(colorConsts);

export const colors = Object.assign(
  {},
  ...colorCategoryKeys.map((category, index) => {
    const categoryColors = colorCategoryVals[index];
    const categoryColorEntries = Object.entries(categoryColors);
    const colorMap = Object.assign(
      {},
      ...categoryColorEntries.map((color) => {
        const colorKey = color[0];
        const colorVal = color[1];

        return { [colorKey]: css({ color: colorVal }) };
      }),
    );
    return { [category]: colorMap };
  }),
);

export const backgroundColors = Object.assign(
  {},
  ...colorCategoryKeys.map((category, index) => {
    const categoryColorEntries = Object.entries(colorCategoryVals[index]);
    const colorMap = Object.assign(
      {},
      ...categoryColorEntries.map((colorKey) => {
        return { [colorKey[0]]: css({ backgroundColor: colorKey[1] }) };
      }),
    );
    return { [category]: colorMap };
  }),
);
