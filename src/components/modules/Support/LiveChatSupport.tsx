import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { iconCTA } from '~/components/global/Link/Link.styles';
import { appendLiveChatScript } from '~/lib/helpers/live-chat';
import { isBrowser } from '~/lib/utils/browser';
import { typography } from '~/styles/typography.styles';

import styles from './LiveChatSupport.styles';

declare global {
  interface Window {
    $zohosq: {
      floatwindow: {
        visible: (visible: string) => void;
      };
      visitor: {
        info: (info: Record<string, string>) => void;
      };
    };
  }
}

function LiveChatSupport() {
  const [isScriptAppended, setIsScriptAppended] = useState<boolean>(false);
  const onClickHandler = () => {
    if (
      isBrowser() &&
      window.FS &&
      window.$zohosq &&
      window.$zohosq?.floatwindow?.visible
    ) {
      const sessionUrl = window.FS.getCurrentSessionURL();
      window.$zohosq.visitor.info({ fsSessionURL: sessionUrl });
    }
    if (window.$zohosq && window.$zohosq?.floatwindow?.visible) {
      window.$zohosq.floatwindow.visible('show');
    }
  };

  useEffect(() => {
    if (isScriptAppended) {
      return;
    }

    async function addScript() {
      await appendLiveChatScript();
    }

    addScript();
    setIsScriptAppended(true);
  }, [isScriptAppended]);

  return (
    <div
      css={[styles.container, iconCTA.root]}
      onClick={onClickHandler}
      role="button"
      tabIndex={0}
    >
      <div css={[iconCTA.container, typography.primarySubhead]}>
        <Icon
          name={ICONS.CUSTOMER_SUPPORT}
          css={[iconCTA.icon, styles.svgContainer]}
        />
        <span>Live Chat</span>
      </div>
    </div>
  );
}

export default LiveChatSupport;
