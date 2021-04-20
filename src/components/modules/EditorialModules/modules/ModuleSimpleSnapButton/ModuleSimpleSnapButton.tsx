import { useEffect } from 'react';

import Button from '~/components/global/Button/Button';
import { useTireSnapModalContext } from '~/components/modules/TireSnap/TireSnapModal.context';
import { useSiteNotificationsContext } from '~/context/SiteNotifications.context';
import { SiteIcon } from '~/data/models/SiteIcon';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import simpleSnapStyles from './ModuleSimpleSnapButton.styles';

function ModuleSimpleSnapButton() {
  const { setIsTireSnapOpen } = useTireSnapModalContext();
  const { isMobile } = useBreakpoints();
  const { addNotification } = useSiteNotificationsContext();
  const theme = THEME.ORANGE;
  const style = BUTTON_STYLE.SOLID;

  useEffect(() => {
    if (!isMobile) {
      addNotification({
        handleNotificationClick: () => {},
        icon: {
          svgId: 'tag',
          type: 'SiteIcon',
        } as SiteIcon,
        id: 'SimpleSnap',
        subtext:
          'To try SimpleSnap , visit simpletire.com on your mobile phone.',
        suppressFromHomePage: true,
        title: 'SimpleSnap',
        type: 'Sale',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  return (
    <div
      data-component="module-simplesnapboardbutton"
      css={simpleSnapStyles.wrapper}
    >
      {isMobile ? (
        <Button
          type={'button'}
          onClick={() => setIsTireSnapOpen(true)}
          theme={theme}
          style={style}
          css={simpleSnapStyles.simpleSnapButtonSection}
        >
          {ui('simpleSnap.cta')}
        </Button>
      ) : null}
    </div>
  );
}

export default ModuleSimpleSnapButton;
