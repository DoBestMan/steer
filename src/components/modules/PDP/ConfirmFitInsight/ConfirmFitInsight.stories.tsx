import { useState } from 'react';

import RadioOptions from '~/components/global/Radio/RadioOptions';
import {
  defaultTireSize,
  radioOptionsForStorybook,
} from '~/components/modules/PDP/ConfirmFitInsight/ConfirmFitInsight.mock';
import { ConfirmFitInsightData } from '~/data/models/ConfirmFitInsightData';

import ConfirmFitInsight from './ConfirmFitInsight.container';
import { styles } from './ConfirmFitInsight.styles';

export default {
  component: ConfirmFitInsight,
  title: 'PDP/ConfirmFitInsight',
};

export function ConfirmFitInsightComponent() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleChange = () => (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div css={styles.storyBookContainer}>
        {radioOptionsForStorybook.map((item, index) => {
          const { title, data } = item;
          const isSelected = index === activeIndex;
          return (
            <li css={styles.storyBookRadio} key={index}>
              <RadioOptions
                name={title}
                onChange={handleChange}
                value={title}
                label={title}
                activeValue={isSelected ? title : undefined}
              />
              {isSelected &&
                data.map((confirmFitItem: ConfirmFitInsightData, i: number) => (
                  <div key={i} css={styles.storyBookConfirmInsightComp}>
                    <ConfirmFitInsight
                      {...confirmFitItem}
                      isLoading={false}
                      tireSize={defaultTireSize}
                    />
                  </div>
                ))}
            </li>
          );
        })}
      </div>
    </>
  );
}
