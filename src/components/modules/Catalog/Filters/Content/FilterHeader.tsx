import { ReactNode, useMemo } from 'react';

import { SiteCatalogFilterList } from '~/data/models/SiteCatalogFilterList';
import { CSSStylesProp } from '~/lib/constants';
import { isValidStaticModal } from '~/lib/utils/modal';

import { ChildProps } from '../Popup/FilterPopup.utils';
import styles from './FilterHeader.styles';

type Props = {
  customHeaderStyles?: CSSStylesProp;
  isGroupHeader?: boolean;
  title: ReactNode;
} & Pick<SiteCatalogFilterList, 'header'> &
  Pick<ChildProps, 'isLarge' | 'openStaticModal'>;

function FilterHeader({
  customHeaderStyles,
  header,
  isLarge = false,
  isGroupHeader = false,
  openStaticModal,
  title,
}: Props) {
  const modalId = header?.infoLink?.siteStaticModal.contentId;
  const hasValidInfoLink = useMemo(
    () => header?.infoLink && modalId && isValidStaticModal(modalId),
    [header, modalId],
  );
  const showHeader = header && (isGroupHeader || !isLarge || hasValidInfoLink);

  function openHeaderModal() {
    if (modalId) {
      openStaticModal(modalId);
    }
  }

  if (!showHeader) {
    return null;
  }

  return (
    <div css={customHeaderStyles}>
      {title}
      {hasValidInfoLink && (
        <button
          css={[
            styles.infoLink,
            !(isLarge || isGroupHeader) && styles.roomForModalCloseButton,
          ]}
          onClick={openHeaderModal}
        >
          {header?.infoLink?.label}
        </button>
      )}
    </div>
  );
}

export default FilterHeader;
