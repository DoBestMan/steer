import { Fragment, MouseEventHandler } from 'react';
import { SerializedStyles } from '@emotion/core';

import styles from './SearchButton.styles';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

import { Home as HomeType } from '~/lib/constants/home.types';

interface Props {
  onClick: MouseEventHandler;
  type: HomeType;
}

const mapTypesToStyles: { [key: string]: SerializedStyles[] } = {
  [HomeType.NORMAL]: styles.primary,
  [HomeType.PROMOTIONAL]: styles.secondary,
};

function SearchButton(props: Props) {
  const { onClick, type = HomeType.NORMAL } = props;
  const typeStyles = mapTypesToStyles[type];

  return (
    <Button onClick={onClick} css={[styles.container, typeStyles]}>
      <Fragment>
        Search by vehicle
        <Icon name={ICONS.MAIN_SEARCH} css={styles.icon} />
      </Fragment>
    </Button>
  );
}

export default SearchButton;
