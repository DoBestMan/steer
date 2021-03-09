import { VIEWPORTS } from '~/lib/constants/viewport';

export function getUserAgentType(userAgent: string) {
  const isMobile =
    !!userAgent.match(/IEMobile/) ||
    !!userAgent.match(/Android/i) ||
    !!userAgent.match(/iPhone/i) ||
    !!userAgent.match(/iPod/i) ||
    !!userAgent.match(/BlackBerry/i);
  const isTablet = userAgent.match(/iPad/i) || !!userAgent.match(/webOS/i);

  return (
    (isMobile && VIEWPORTS.MOBILE) ||
    (isTablet && VIEWPORTS.TABLET) ||
    VIEWPORTS.DESKTOP
  );
}
