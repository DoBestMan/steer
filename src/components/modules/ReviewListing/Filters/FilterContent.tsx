import BaseLink from '~/components/global/Link/BaseLink';
import TitleSelectorLabel from '~/components/global/TitleSelectorLabel/TitleSelectorLabel';

import styles from './FilterContent.styles';
import { FilterGroup } from './Filters.types';

interface Props {
  contentLabel?: string;
  filterGroups: FilterGroup[];
}

function FilterContent({ filterGroups, contentLabel }: Props) {
  return (
    <>
      {!!contentLabel && <span css={styles.title}>{contentLabel}</span>}
      <div>
        {filterGroups.map(({ title, id, items }) => (
          <>
            {/* TODO: Semantics pass for this heading */}
            {!!title && <p css={styles.label}>{title}</p>}
            <ul key={id} css={styles.filterGroup}>
              {items.map(({ count, description, flair, id, link, title }) => (
                <li key={id} css={styles.item}>
                  <BaseLink
                    href={link.href}
                    isExternal={link.isExternal}
                    css={styles.link}
                  >
                    <TitleSelectorLabel
                      count={count}
                      description={description}
                      flair={flair}
                      label={title}
                    />
                  </BaseLink>
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </>
  );
}

export default FilterContent;
