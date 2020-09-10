import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { dealsLink } from '~/components/modules/Nav/mappers/links';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import { useSearchContext } from '../../Search/Search.context';
import { useSearchModalContext } from '../../Search/SearchModal.context';
import styles from './BrowseTires.styles';

function TireCategoryLinks({
  siteMenuBrowseList,
}: Pick<SiteMenu, 'siteMenuBrowseList'>) {
  const { activeCategory, createSelectCategoryHandler } = useNavContext();
  const { isMobile } = useBreakpoints();
  const {
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const onVehicleCTAClick = () => {
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  };

  const onTireSizeCTAClick = () => {
    lockSearchStateToTireSize();
    setIsSearchOpen(true);
  };

  function renderLink({
    onClick,
    title,
  }: {
    onClick: () => void;
    title: string;
  }) {
    const isSelected = activeCategory === title;
    return (
      <span key={title} css={[styles.container, isSelected && styles.selected]}>
        <div css={isSelected && styles.decoration} />
        <button
          aria-label={title}
          aria-current={isSelected}
          css={styles.label}
          onClick={onClick}
        >
          {title}
        </button>
      </span>
    );
  }

  return (
    <GridItem gridColumnM="1/3" gridColumnL="1/4">
      <div css={styles.header}>
        {isMobile
          ? ui('nav.browseTires.mobileHeader')
          : ui('nav.browseTires.header')}
      </div>
      {siteMenuBrowseList.map(({ title }) =>
        renderLink({ title, onClick: createSelectCategoryHandler(title) }),
      )}
      {renderLink({ title: ui('nav.vehicle'), onClick: onVehicleCTAClick })}
      {renderLink({ title: ui('nav.size'), onClick: onTireSizeCTAClick })}
      {isMobile && (
        <span css={styles.container}>
          <Link
            css={[styles.label, styles.dealsLink]}
            icon={ICONS.FIRE}
            href={dealsLink.href}
            isExternal={dealsLink.isExternal}
          >
            {dealsLink.text}
          </Link>
        </span>
      )}
    </GridItem>
  );
}

export default TireCategoryLinks;
