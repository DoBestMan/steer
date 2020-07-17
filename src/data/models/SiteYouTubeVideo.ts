import { SiteImage } from './SiteImage';
import { SiteYouTubeVideoVideo } from './SiteYouTubeVideoVideo';

/**
 *
 * @export
 * @interface SiteYouTubeVideo
 */
export interface SiteYouTubeVideo {
  /**
   *
   * @type {SiteImage}
   * @memberof SiteYouTubeVideo
   */
  poster: SiteImage;
  /**
   *
   * @type {SiteYouTubeVideoVideo}
   * @memberof SiteYouTubeVideo
   */
  video: SiteYouTubeVideoVideo;
  /**
   *
   * @type {string}
   * @memberof SiteYouTubeVideo
   */
  type: SiteYouTubeVideoTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SiteYouTubeVideoTypeEnum {
  SiteYouTubeVideo = 'SiteYouTubeVideo',
}
