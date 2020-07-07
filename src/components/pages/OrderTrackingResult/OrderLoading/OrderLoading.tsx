import Loading from '~/components/global/Loading/Loading';

import styles from './OrderLoading.styles';

function OrderLoading() {
  return (
    <div css={styles.wrapper}>
      <Loading />
    </div>
  );
}

export default OrderLoading;
