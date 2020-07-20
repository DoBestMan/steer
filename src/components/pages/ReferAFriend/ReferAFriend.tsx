import { useEffect } from 'react';

import { appendReferAFriendScript } from '~/lib/helpers/refer-a-friend';

import styles from './ReferAFriend.styles';

function ReferAFriend() {
  useEffect(() => {
    appendReferAFriendScript();
  }, []);

  return (
    <div css={[styles.root, styles.rootIos]}>
      <div id="talkable-offer"></div>
    </div>
  );
}

export default ReferAFriend;
