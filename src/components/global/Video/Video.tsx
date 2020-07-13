import { useCallback, useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import Loading from '~/components/global/Loading/Loading';
import { CSSStyles, THEME } from '~/lib/constants';
import { ratioToPercentage } from '~/lib/utils/number';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import { useYoutubeApi } from './Video.hooks';
import styles, { activeVideoStyles } from './Video.styles';

export interface Props {
  aspectRatio?: string;
  containerStyles?: CSSStyles;
  posterFrame: string;
  setShouldStopVideo?: (shouldStopVideo: boolean) => void;
  shouldStopVideo?: boolean;
  sizes: number[];
  videoStyles?: CSSStyles;
  youtubeId: string;
}

function Video({
  containerStyles,
  aspectRatio = '16/9',
  posterFrame,
  sizes,
  videoStyles,
  youtubeId,
  shouldStopVideo,
  setShouldStopVideo,
}: Props) {
  const [videoId] = useState(`${randomString(10)}-video`);

  const { hasPlayedVideo, isLoading, setIsLoading, stopVideo } = useYoutubeApi({
    youtubeId,
    videoId,
  });

  const loadVideo = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const containerBottomPadding = `${ratioToPercentage(aspectRatio)}%`;

  const handleStopVideo = useCallback(() => {
    if (hasPlayedVideo) {
      stopVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlayedVideo]);

  useEffect(() => {
    if (shouldStopVideo && setShouldStopVideo) {
      handleStopVideo();
      setShouldStopVideo(false);
    }
  }, [handleStopVideo, setShouldStopVideo, shouldStopVideo, stopVideo]);

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
        tabIndex={hasPlayedVideo ? -1 : 0}
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
            altText=""
            customStyles={styles.posterFrame as CSSStyles}
            widths={sizes}
            src={posterFrame}
            responsive
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
