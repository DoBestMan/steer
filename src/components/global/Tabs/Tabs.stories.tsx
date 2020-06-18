import { array } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Tabs from './Tabs';

export default {
  component: Tabs,
  title: 'Global/Tabs',
};

export function TabsWithKnobs() {
  const tabsLabels = array('Tabs', [
    'First Tab',
    'Second Tab',
    'Third Tab',
    'Fourth Tab',
  ]);

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK, minHeight: '100vh' }}>
      <Tabs tabsLabels={tabsLabels} id="storybook">
        {tabsLabels.map((label, idx) => (
          <div
            key={idx}
            css={[typography.bodyCopy, { color: COLORS.GLOBAL.WHITE }]}
          >
            <p>Current tab: {label}</p>
          </div>
        ))}
      </Tabs>
    </div>
  );
}
