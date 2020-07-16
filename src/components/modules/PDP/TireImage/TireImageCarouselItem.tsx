import Video from '~/components/global/Video/Video';
import {
  SiteCatalogProductImage,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import {
  SiteYouTubeVideo,
  SiteYouTubeVideoTypeEnum,
} from '~/data/models/SiteYouTubeVideo';
import { getWidthFromMaxHeight } from '~/lib/utils/number';

import CarouselImage from './CarouselImage';
import CarouselImageButton from './CarouselImageButton';
import styles from './TireImage.styles';

interface Props {
  handleClick?: (index: number) => void;
  handleImageClick: (index: number) => () => void;
  imageItem: SiteCatalogProductImage | SiteYouTubeVideo;
  index: number;
  isFullscreen?: boolean;
  maxHeight: number;
  setShouldStopVideo?: (shouldStopVideo: boolean) => void;
  shouldStopVideo?: boolean;
}

function TireImageCarouselItem({
  handleClick,
  handleImageClick,
  imageItem,
  index,
  isFullscreen,
  maxHeight,
  shouldStopVideo,
  setShouldStopVideo,
}: Props) {
  const imageWidth =
    imageItem.type === SiteCatalogProductImageTypeEnum.SiteCatalogProductImage
      ? imageItem.image?.width &&
        imageItem.image?.height &&
        getWidthFromMaxHeight(
          imageItem.image.width,
          imageItem.image.height,
          maxHeight,
        )
      : undefined;

  return (
    <>
      {imageItem.type ===
        SiteCatalogProductImageTypeEnum.SiteCatalogProductImage &&
        (handleClick ? (
          <CarouselImageButton
            handleClick={handleImageClick(index)}
            image={imageItem.image}
            maxHeight={maxHeight}
            imageWidth={imageWidth}
          />
        ) : (
          <CarouselImage image={imageItem.image} isFullscreen={isFullscreen} />
        ))}

      {imageItem.type === SiteYouTubeVideoTypeEnum.SiteYouTubeVideo && (
        <Video
          containerStyles={styles.videoContainerStyles}
          videoStyles={styles.videoStyles}
          poster={imageItem.poster}
          sizes={[300, 700]}
          shouldStopVideo={shouldStopVideo}
          video={imageItem.video}
          setShouldStopVideo={setShouldStopVideo}
        />
      )}
    </>
  );
}

export default TireImageCarouselItem;
