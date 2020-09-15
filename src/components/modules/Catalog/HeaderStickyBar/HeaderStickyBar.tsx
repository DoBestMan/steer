import { useTheme } from 'emotion-theming';
import { ReactNode } from 'react';

import Toggle from '~/components/global/Toggle/Toggle';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { useGlobalToastContext } from '~/context/GlobalToast.context';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './HeaderStickyBar.styles';

interface Props {
  children: ReactNode;
}

export default function HeaderStickyBar({ children }: Props) {
  const {
    handleUpdateResults,
    setIsAdvancedView,
    isAdvancedView,
  } = useCatalogProductsContext();
  const { header } = useTheme();

  const { setGlobalToastMessage } = useGlobalToastContext();

  const onToggleView = async () => {
    const newParams = isAdvancedView ? {} : { skipGroups: 'true' };
    setIsAdvancedView(!isAdvancedView);
    handleUpdateResults(newParams as Record<string, string>).catch((e) => {
      setIsAdvancedView(isAdvancedView);
      setGlobalToastMessage(e.message);
    });
  };

  return (
    <div css={[styles.root, header.background]}>
      <div css={styles.toggle}>
        <span css={[styles.label, header.advancedLabel]}>
          {ui('catalog.header.advancedViewLabel')}
        </span>
        <Toggle
          testId="advanced-view-toggle"
          name={ui('catalog.header.advancedViewLabel')}
          onToggle={onToggleView}
          defaultChecked={isAdvancedView}
        />
      </div>
      {children}
    </div>
  );
}
