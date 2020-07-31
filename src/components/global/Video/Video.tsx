import { useCallback, useEffect } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import Loading from '~/components/global/Loading/Loading';
import { SiteImage } from '~/data/models/SiteImage';
import { SiteYouTubeVideoVideo } from '~/data/models/SiteYouTubeVideoVideo';
import { CSSStyles, Loading as ImageLoading, THEME } from '~/lib/constants';
import { ratioToPercentage } from '~/lib/utils/number';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { useYoutubeApi } from './Video.hooks';
import styles, { activeVideoStyles } from './Video.styles';

export interface Props {
  aspectRatio?: string;
  containerStyles?: CSSStyles;
  imageLoading?: ImageLoading;
  isButtonFocusable?: boolean;
  poster: SiteImage;
  setShouldPauseVideo?: (shouldPauseVideo: boolean) => void;
  shouldPauseVideo?: boolean;
  sizes: number[];
  video: SiteYouTubeVideoVideo;
  videoStyles?: CSSStyles;
}

function Video({
  containerStyles,
  aspectRatio = '16/9',
  imageLoading,
  isButtonFocusable = true,
  poster,
  sizes,
  videoStyles,
  video,
  shouldPauseVideo,
  setShouldPauseVideo,
}: Props) {
  const videoId = `${randomString(10)}-video`;

  const { hasPlayedVideo, isLoading, setIsLoading, pauseVideo } = useYoutubeApi(
    {
      youtubeId: video.youtubeId,
      videoId,
    },
  );

  const loadVideo = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const containerBottomPadding = `${ratioToPercentage(aspectRatio)}%`;

  const handlePauseVideo = useCallback(() => {
    pauseVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlayedVideo]);

  useEffect(() => {
    if (shouldPauseVideo && setShouldPauseVideo) {
      handlePauseVideo();
      setShouldPauseVideo(false);
    }
  }, [handlePauseVideo, setShouldPauseVideo, shouldPauseVideo, pauseVideo]);

  return (
    <div
      css={[
        styles.container,
        { paddingBottom: containerBottomPadding },
        containerStyles,
      ]}
    >
      <button
        aria-label={ui('common.video.play')}
        onClick={loadVideo}
        tabIndex={hasPlayedVideo || !isButtonFocusable ? -1 : 0}
        css={[styles.button, hasPlayedVideo && activeVideoStyles.button]}
      >
        <div css={styles.buttonContent}>
          <span css={styles.posterIcon}>
            {isLoading ? (
              <Loading theme={THEME.DARK} />
            ) : (
              <Icon name={ICONS.PLAY} />
            )}
          </span>

          <Image
            loading={imageLoading}
            customStyles={styles.posterFrame as CSSStyles}
            widths={sizes}
            responsive
            {...poster}
          />
        </div>
      </button>

      <div
        css={[
          styles.video,
          hasPlayedVideo && activeVideoStyles.video,
          videoStyles,
        ]}
      >
        <div
          css={[
            styles.videoIframe,
            hasPlayedVideo && activeVideoStyles.videoIframe,
          ]}
          id={videoId}
        />
      </div>
    </div>
  );
}

export default Video;
