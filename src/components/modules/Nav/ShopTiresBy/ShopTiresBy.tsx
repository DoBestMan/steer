import { Cars } from '~/components/global/Car/Car.enums';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import {
  initialSearchTireSizeData,
  initialSearchVehicleData,
} from '~/components/modules/Search/Search.data';
import { useInputQuery } from '~/components/modules/Search/Search.hooks';
import {
  SearchActionType,
  SearchResult,
} from '~/components/modules/Search/Search.types';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { SearchDataParams } from '~/lib/api/search';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { ui } from '~/lib/utils/ui-dictionary';

import IconWithTitle from './IconWithTitle';
import styles from './ShopTiresBy.styles';

interface Props {
  onSearchQuery: ({ queryText, queryType }: SearchDataParams) => void;
  onSetSearchState: (searchState: string) => void;
}

function ShopTiresBy({ onSearchQuery, onSetSearchState }: Props) {
  const { setCurrentInputQuery } = useInputQuery();

  const { greaterThan, lessThan } = useBreakpoints();
  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const { action } = searchResult;

    const category =
      action.type === SearchActionType.QUERY ? action.queryType : '';
    onSetSearchState(category);

    if (action.type === SearchActionType.QUERY) {
      setCurrentInputQuery({
        queryText: action.queryText,
        queryType: action.queryType,
      });

      onSearchQuery({
        queryText: action.queryText,
        queryType: action.queryType,
      });
    }
  };

  const handleClick = (data: SiteSearchResultTextItem) => {
    toggleIsSearchOpen();
    handleSearchCategoryClick(data);
  };
  const { toggleIsSearchOpen } = useSearchModalContext();
  const isSkipHtml = lessThan.L || greaterThan.XL;

  return (
    <div css={styles.root}>
      <h3 css={styles.title}>
        <Markdown skipHtml={isSkipHtml}>{ui('nav.shopTiresBy.title')}</Markdown>
      </h3>
      <div css={styles.iconWithTitles}>
        <IconWithTitle
          image={{
            type: ICON_IMAGE_TYPE.CAR,
            vehicleType: Cars['car--sedan'],
          }}
          title={ui('nav.shopTiresBy.vehicle')}
          data={initialSearchVehicleData}
          handleClick={handleClick}
        />
        <IconWithTitle
          image={{
            svgId: ICONS['TIRE'],
            type: ICON_IMAGE_TYPE.ICON,
          }}
          title={ui('nav.shopTiresBy.tireSize')}
          data={initialSearchTireSizeData}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default ShopTiresBy;
