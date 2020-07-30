import { Fragment } from 'react';

import BaseLink from '~/components/global/Link/BaseLink';
import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';

import styles from './FilterContent.styles';
import { FilterGroup } from './Filters.types';

interface Props {
  contentLabel?: string;
  filterGroups: FilterGroup[];
  handleCloseDropdown: () => void;
}

function FilterContent({
  filterGroups,
  contentLabel,
  handleCloseDropdown,
}: Props) {
  return (
    <>
      {!!contentLabel && <span css={styles.title}>{contentLabel}</span>}
      <div>
        {filterGroups.map(({ title, items }, filterGroupIdx) => (
          <Fragment key={filterGroupIdx}>
            {/* TODO: Semantics pass for this heading */}
            {title && <p css={styles.label}>{title}</p>}
            <ul css={styles.filterGroup}>
              {items.map(
                (
                  { link, count, description, isSelected, flair, title },
                  filterGroupItemIdx,
                ) => (
                  <li key={filterGroupItemIdx} css={styles.item}>
                    <BaseLink
                      href={link.href}
                      onClick={handleCloseDropdown}
                      isExternal={link.isExternal}
                      css={[styles.link, isSelected && styles.linkSelected]}
                    >
                      <TitleSelectorLabel
                        count={count}
                        description={description}
                        flair={flair}
                        label={title}
                      />
                    </BaseLink>
                  </li>
                ),
              )}
            </ul>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default FilterContent;
