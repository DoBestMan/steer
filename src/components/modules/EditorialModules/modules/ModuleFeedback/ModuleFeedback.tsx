import Feedback from '~/components/global/Feedback/Feedback';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';

function ModuleFeedback() {
  return (
    <div css={styles.spacingTopS60XL80} data-component="module-feedback">
      <Feedback />
    </div>
  );
}

export default ModuleFeedback;
