import Image from '~/components/global/Image/Image';
import Markdown from '~/components/global/Markdown/Markdown';
import { FS_EVENT_NAMES } from '~/lib/constants/fullstory';
import { setFSCustomEvent } from '~/lib/helpers/fullstory';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TireSnap.styles';
import modalStyles from './TireSnapModal.styles';

interface Props {
  onImageTaken: (image: string | undefined) => void;
}
function TireSnap({ onImageTaken }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadFile = (evt: any) => {
    const file = evt.target.files[0];
    const imageFile = URL.createObjectURL(file);
    setFSCustomEvent(FS_EVENT_NAMES.SIMPLESNAP, {
      takePhoto: true,
    });
    onImageTaken(imageFile);
  };

  return (
    <div css={styles.screenWrapper}>
      <div css={styles.content}>
        <Image
          altText={ui('simpleSnap.tireSnapModal.image.alt')}
          src={ui('simpleSnap.tireSnapModal.image.src')}
          css={styles.headerImage}
        />
        <div css={styles.widthWrapper}>
          <h1 css={styles.title}>
            <Markdown isEditorial>
              {ui('simpleSnap.tireSnapModal.title')}
            </Markdown>
          </h1>
          <ol css={styles.instructionsList}>
            {ui('simpleSnap.tireSnapModal.instructions')
              .split('|')
              .map((e, i) => (
                <li key={i}>{e}</li>
              ))}
          </ol>
        </div>
        <div css={styles.widthWrapper}>
          <h3 css={styles.smallTitle}>{ui('simpleSnap.tireSnapModal.note')}</h3>
          <p css={styles.paragraph}>
            {ui('simpleSnap.tireSnapModal.description')}
          </p>
        </div>
      </div>
      <div css={modalStyles.control}>
        <div css={styles.buttonWrapper}>
          <button css={styles.snapButton}>Snap a photo</button>
          <input type="file" onChange={onUploadFile} css={styles.inputFile} />
        </div>
      </div>
    </div>
  );
}

export default TireSnap;
