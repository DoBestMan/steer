import Link from '~/components/global/Link/Link';
import { SiteCatalogSummaryTopPickItemAdditionalInfo } from '~/data/models/SiteCatalogSummaryTopPickItemAdditionalInfo';
import { LINK_THEME, THEME } from '~/lib/constants';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';
import { typography } from '~/styles/typography.styles';

import { styles } from '../../TopPicksItem/TopPicksItem.styles';
import { TopPickItemsHeader } from '../../TopPicksItem/TopPicksItems.types';

interface Props {
  header: TopPickItemsHeader;
  oeModal?: SiteCatalogSummaryTopPickItemAdditionalInfo | null;
  openModal: () => void;
}

export default function TPITitleLine2({ header, oeModal, openModal }: Props) {
  if (!header.titleLine2) {
    return null;
  }

  if (!header.additionalInfoLabel && !oeModal) {
    return <>{header.titleLine2}</>;
  }

  const buttonLabel = header.additionalInfoLabel;
  let titleLine2 = header.titleLine2;

  // If we expect an OE Modal, we're looking in titleLine2 the buttonlabel value
  // If found, let's make a button around buttonlabel
  // Otherwise, let's make the whole line a button to open a modal
  const r = new RegExp(`(${buttonLabel})`, 'i');
  const match = titleLine2.match(r);

  if (match) {
    titleLine2 = titleLine2.replace(r, '{{ buttonLabel }}');

    return (
      <>
        {uiJSX(titleLine2, {
          buttonLabel: (
            <Link
              key={'modalButton'}
              theme={LINK_THEME.LIGHT_HIGHLIGHTED}
              as="button"
              onClick={openModal}
              css={[typography.primaryHeadline, styles.modalButton]}
            >
              {buttonLabel}
            </Link>
          ),
        })}
      </>
    );
  }

  return (
    <Link
      theme={THEME.LIGHT}
      as="button"
      onClick={openModal}
      css={[typography.primaryHeadline, styles.modalButton]}
    >
      {titleLine2}
    </Link>
  );
}
