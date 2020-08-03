import Video from '~/components/global/Video/Video';
import {
  SiteCatalogProductImage,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import {
  SiteYouTubeVideo,
  SiteYouTubeVideoTypeEnum,
} from '~/data/models/SiteYouTubeVideo';
import { LOADING_OPTIONS } from '~/lib/constants';

import CarouselImage from './CarouselImage';
import CarouselImageButton from './CarouselImageButton';
import styles from './TireImage.styles';

interface Props {
  handleClick?: (index: number) => void;
  handleImageClick: (index: number) => () => void;
  height?: number;
  imageItem: SiteCatalogProductImage | SiteYouTubeVideo;
  index: number;
  isActive?: boolean;
  setShouldPauseVideo?: (shouldPauseVideo: boolean) => void;
  shouldPauseVideo?: boolean;
  width?: number;
}

function TireImageCarouselItem({
  isActive,
  handleClick,
  handleImageClick,
  height,
  imageItem,
  index,
  shouldPauseVideo,
  setShouldPauseVideo,
  width,
}: Props) {
  return (
    <>
      {imageItem.type ===
        SiteCatalogProductImageTypeEnum.SiteCatalogProductImage &&
        (handleClick ? (
          <CarouselImageButton
            handleClick={handleImageClick(index)}
            image={imageItem.image}
            height={height}
            width={width}
          />
        ) : (
          <div css={[styles.fullscreenContainer, { height, width }]}>
            <CarouselImage
              image={imageItem.image}
              height={height}
              width={width}
            />
          </div>
        ))}

      {imageItem.type === SiteYouTubeVideoTypeEnum.SiteYouTubeVideo && (
        <Video
          customContainerStyles={[
            styles.videoContainerStyles,
            // Width of video follows 16/9 aspect ratio
            { height, width: height && height * (16 / 9) },
          ]}
          imageLoading={LOADING_OPTIONS.EAGER}
          isButtonFocusable={isActive}
          poster={imageItem.poster}
          sizes={[300, 700]}
          shouldPauseVideo={shouldPauseVideo}
          video={imageItem.video}
          setShouldPauseVideo={setShouldPauseVideo}
        />
      )}
    </>
  );
}

export default TireImageCarouselItem;
