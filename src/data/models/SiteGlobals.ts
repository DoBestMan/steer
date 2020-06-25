/**
 * Global information
 */
export interface SiteGlobals {
  customerServiceEnabled: boolean;

  customerServiceNumber: {
    display: string;
    value: string;
  };

  /**
   * Optional color scheme (used for promotions)
   */
  siteTheme: string | null;
}
