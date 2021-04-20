import { useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import Input from '~/components/global/Input/Input';
import Markdown from '~/components/global/Markdown/Markdown';
import Toast from '~/components/global/Toast/Toast';
import { ReturnRequestImageAttachment } from '~/data/models/ReturnRequestImageAttachment';
import { SiteImage } from '~/data/models/SiteImage';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, INPUT_TYPE } from '~/lib/constants';
import { getMIMEType } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderImageUpload.styles';
import { createSiteImage } from './OrderImageUpload.utils';

const CONSTANTS = {
  MAX_IMAGES: 4,
  LIMIT_FILE_SIZE: 1024,
};

interface Props {
  attachedImages: Array<ReturnRequestImageAttachment>;
  canAddComment: boolean | null;
  canUploadImage: boolean | null;
  comments: string;
  images: Array<SiteImage>;
  setComment: (index: string) => void;
  storeAttachedImages: (
    updatedArray: Array<ReturnRequestImageAttachment>,
  ) => void;
  storeImage: (updatedArray: Array<SiteImage>) => void;
}

function OrderImageUpload({
  canUploadImage,
  canAddComment,
  comments,
  setComment,
  images,
  storeImage,
  attachedImages,
  storeAttachedImages,
}: Props) {
  const [toastMessageStatus, showToastMessage] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadFile = (event: any) => {
    const filesSelected = event.target.files;
    if (filesSelected.length > 0 && images.length < CONSTANTS.MAX_IMAGES) {
      const file = filesSelected[0];
      if (file.size / 1024 < CONSTANTS.LIMIT_FILE_SIZE) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onerror = function () {
          console.info('An error has occured while reading the file.');
          showToastMessage(true);
          setToastMessage(ui('tracking.imageReadError'));
        };

        reader.onloadend = function () {
          const mimeType = getMIMEType(reader.result as string);
          const base64Content = (reader.result as string).split(',')[1];
          const fileName = file.name;
          const imageObject = {
            attachedFileType: mimeType,
            attachedImage: base64Content,
            imageName: fileName,
          };
          storeAttachedImages([...attachedImages, imageObject]);
        };

        const imageFile = URL.createObjectURL(file);
        const imageSelected = createSiteImage(imageFile);
        storeImage([...images, imageSelected]);
      } else {
        setToastMessage(ui('tracking.imageSizeError'));
        showToastMessage(true);
      }
    }
  };

  const removeImage = (index: number) => {
    images.splice(index, 1);
    storeImage([...images]);
  };

  const hasUserUploadedImage = images && images.length > 0;
  const maxImagesUploaded = images.length >= CONSTANTS.MAX_IMAGES;
  const { bk } = useBreakpoints();

  function imageSizeErrorToast() {
    return (
      <Toast
        isOpen={toastMessageStatus}
        onDismiss={() => showToastMessage(false)}
      >
        <Markdown>{toastMessage}</Markdown>
      </Toast>
    );
  }

  function renderUploadSection() {
    return (
      canUploadImage && (
        <>
          <label
            css={[
              styles.browseButton,
              maxImagesUploaded && styles.disabledBrowseButton,
            ]}
          >
            {'Browse'}
            <input
              type="file"
              accept=".jpg, .pdf"
              onChange={onUploadFile}
              css={{ display: 'none' }}
              disabled={maxImagesUploaded}
            ></input>
          </label>
        </>
      )
    );
  }

  function renderImageSection() {
    return (
      canUploadImage && (
        <>
          {hasUserUploadedImage && (
            <ul
              css={
                [BREAKPOINT_SIZES.S].includes(bk)
                  ? styles.imageWrapperMobile
                  : styles.imageWrapper
              }
            >
              {images.map((item, i) => (
                <li css={styles.listWrapper} key={i}>
                  <div css={{ position: 'relative' }}>
                    <button
                      onClick={() => removeImage(i)}
                      css={[styles.deleteFloatButton]}
                    >
                      <Icon name={ICONS.CLOSE} css={styles.closeIcon} />
                    </button>
                    <Image css={styles.image} responsive {...item} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )
    );
  }

  function renderCommentsSection() {
    return (
      canAddComment && (
        <>
          <h5 css={styles.commentsHeader}>{ui('tracking.commentsHeader')}</h5>
          <Input
            label={ui('tracking.commentsDescription')}
            onChange={setComment}
            type={INPUT_TYPE.TEXT}
            isTextArea
            value={comments}
          />
        </>
      )
    );
  }

  function renderForBrowser() {
    return (
      <Grid>
        <GridItem gridColumnM="1/8" gridColumnL="1/12" gridColumnXL="1/16">
          <h5 css={styles.sectionHeader}>
            {ui('tracking.returnImageProofHeader')}
          </h5>
        </GridItem>
        <GridItem gridColumnM="1/2" gridColumnL="1/8" gridColumnXL="1/4">
          {renderUploadSection()}
        </GridItem>
        <GridItem
          css={[styles.imageGridContainer]}
          gridColumnM="6/6"
          gridColumnL="10/10"
          gridColumnXL="14/14"
        >
          {renderImageSection()}
        </GridItem>
        <GridItem
          css={styles.commentGridContainer}
          gridColumnM="1/8"
          gridColumnL="1/12"
          gridColumnXL="1/16"
        >
          {imageSizeErrorToast()}
          {renderCommentsSection()}
        </GridItem>
      </Grid>
    );
  }

  function renderForMobile() {
    return (
      <>
        <h5 css={styles.sectionHeader}>
          {ui('tracking.returnImageProofHeader')}
        </h5>
        {renderUploadSection()}
        {renderImageSection()}
        {imageSizeErrorToast()}
        {renderCommentsSection()}
      </>
    );
  }

  function handleRender() {
    return (
      <>
        {[BREAKPOINT_SIZES.S].includes(bk)
          ? renderForMobile()
          : renderForBrowser()}
      </>
    );
  }

  return canUploadImage || canAddComment ? handleRender() : null;
}
export default OrderImageUpload;
