import FilterButton from '~/components/global/Button/FilterButton';
import Carousel from '~/components/global/Carousel/CarouselDynamic';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Filters.styles';

export interface FilterItem {
  label: string;
}

interface Props {
  filters: FilterItem[];
}

function handleOnClick() {
  // TODO: open dropdown WCS-724
  // eslint-disable-next-line no-console
  console.log('handle on click');
}

function Filters({ filters }: Props) {
  return (
    <>
      <span css={styles.label}>{ui('reviews.searchBy')}</span>
      <div css={styles.container}>
        {/* TODO: make filters functional - break this into its own component WCS-724 */}
        <Carousel wrapperClass="filters-wrapper" freeScroll>
          {filters.map(({ label }) => {
            return (
              <FilterButton
                key={label}
                isActive={false}
                isDropdownOpen={false}
                label={label}
                onClick={handleOnClick}
                theme={THEME.ORANGE}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default Filters;
