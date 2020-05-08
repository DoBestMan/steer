import { ui } from '~/lib/utils/ui-dictionary';

import styles from './FooterMailingList.styles';

function FooterMailingList() {
  return (
    <div css={styles.container}>
      <p css={styles.heading}>{ui('footer.mailingList.heading')}</p>
      <p css={styles.text}>{ui('footer.mailingList.description')}</p>
    </div>
  );
}

export default FooterMailingList;
