/**
 * Global information
 */
export interface SiteGlobals {
  customerServiceEnabled: boolean;
  priceDisplayInAddtoCart: boolean;

  customerServiceNumber: {
    display: string;
    value: string;
  };

  /**
   * Optional color scheme (used for promotions)
   */
  siteTheme: string | null;
  isDesktop?: boolean;
  userAgentType?: string;
}
