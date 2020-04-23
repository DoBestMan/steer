export interface SiteIcon {
  /**
   * Front-end specific ID that defines which SVG to load and display
   */
  svgId: string;

  /**
   * Discriminator when icons and images are used with oneOf
   */
  type: 'SiteIcon';
}
