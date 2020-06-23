import { useEffect, useState } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Props {
  videoId: string;
  youtubeId: string;
}

interface Player {
  destroy: () => void;
  playVideo: () => void;
}

const CONSTANTS = {
  YOUTUBE_API_URL: '//www.youtube.com/iframe_api',
  SCRIPT_ID: 'youtube-api',
};

const appendYoutubeApiScript = (onLoadCallBack: () => void) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.id = CONSTANTS.SCRIPT_ID;
  script.src = `${window.location.protocol}${CONSTANTS.YOUTUBE_API_URL}`;
  document.getElementsByTagName('head')[0].appendChild(script);

  script.onload = function () {
    onLoadCallBack();
  };
};

export function useYoutubeApi({ videoId, youtubeId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);

  let player: Player;

  // This automatically gets run when the Youtube script has successfully loaded
  window.onYouTubeIframeAPIReady = function () {
    createVideo();
  };

  function playVideo() {
    if (!player) {
      return;
    }

    setHasPlayedVideo(true);
    player.playVideo();
  }

  function cleanupPlayer() {
    if (!player) {
      return;
    }
    player.destroy();
  }

  function createVideo() {
    if (!window.YT.Player || !window.YT) {
      return;
    }

    player = new window.YT.Player(videoId, {
      events: {
        onReady: playVideo,
      },
      playerVars: {
        rel: 0,
      },
      videoId: youtubeId,
    });
  }

  useEffect(() => {
    // If script has already been loaded, skip to creating the video
    if (document.querySelector(`#${CONSTANTS.SCRIPT_ID}`) && isLoading) {
      createVideo();
      return;
    }

    if (isLoading) {
      appendYoutubeApiScript(createVideo);
    }

    return () => {
      cleanupPlayer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasPlayedVideo]);

  return { isLoading, setIsLoading, hasPlayedVideo };
}
