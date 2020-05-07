import { SerializedStyles } from '@emotion/core';
import { MouseEventHandler } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SearchButton.styles';

interface Props {
  onClick: MouseEventHandler;
  theme: SiteGlobals['siteTheme'];
}

const mapThemeToStyles: { [key: string]: SerializedStyles } = {
  promotional: styles.secondary,
};

function SearchButton({ onClick, theme }: Props) {
  const themeStyles = !theme ? styles.primary : mapThemeToStyles[theme];

  return (
    <div css={[styles.container, themeStyles]}>
      <Button onClick={onClick} css={styles.button}>
        <>
          {ui('common.header.searchShortLabel')}
          <Icon name={ICONS.MAIN_SEARCH} css={styles.icon} />
        </>
      </Button>
    </div>
  );
}

export default SearchButton;
