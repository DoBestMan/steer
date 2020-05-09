import { MouseEventHandler } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SearchButton.styles';

interface Props {
  onClick: MouseEventHandler;
}

function SearchButton({ onClick }: Props) {
  return (
    <div css={styles.container}>
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
