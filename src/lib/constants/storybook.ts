import { COLORS } from '~/lib/constants';

const colorCategoryKeys = Object.keys(COLORS);
const colorCategoryVals = Object.values(COLORS);

// Export all colors as a flat object so they're easy to use in storybook
export const STORYBOOK_COLORS = Object.assign(
  {},
  ...colorCategoryKeys.map((category, index) => {
    const categoryColors = colorCategoryVals[index];
    const categoryColorEntries = Object.entries(categoryColors);
    const colorMap = Object.assign(
      {},
      ...categoryColorEntries.map((color) => {
        const colorKey = color[0];
        const colorVal = color[1];

        return { [`${category}_${colorKey}`]: colorVal };
      }),
    );
    return colorMap;
  }),
);
