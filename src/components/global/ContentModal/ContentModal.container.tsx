import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import ContentModal, { Props as ContentModalProps } from './ContentModal';

interface Props {
  props: ContentModalProps;
}

function ContentModalContainer({ props }: Props) {
  const { customerServiceEnabled } = useSiteGlobalsContext();

  return (
    <ContentModal
      {...props}
      isCustomerServiceEnabled={customerServiceEnabled}
    />
  );
}

export default ContentModalContainer;
