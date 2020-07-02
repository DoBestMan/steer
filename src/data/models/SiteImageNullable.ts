/**
 * General image implementation for the site
 * @export
 * @interface SiteImageNullable
 */
export interface SiteImageNullable {
  /**
   * **Always `SiteImage`**, the discriminator when icons and images are used with oneOf
   * @type {string}
   * @memberof SiteImageNullable
   */
  type: SiteImageNullableTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SiteImageNullable
   */
  src: string;
  /**
   * Alternative text that describes the content of this image. Required for images that have no caption surrounding them.
   * @type {string}
   * @memberof SiteImageNullable
   */
  altText: string;
  /**
   * Original width of asset
   * @type {number}
   * @memberof SiteImageNullable
   */
  width: number | null;
  /**
   * Original height of asset
   * @type {number}
   * @memberof SiteImageNullable
   */
  height: number | null;
}

export enum SiteImageNullableTypeEnum {
  SiteImage = 'SiteImage',
}
