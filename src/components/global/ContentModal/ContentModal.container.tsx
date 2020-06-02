// import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

import ContentModal, { Props as ContentModalProps } from './ContentModal';

function ContentModalContainer({
  content,
  image,
  isOpen,
  link,
  onClose,
  showSupportSection = true,
  subtitle,
  title,
}: ContentModalProps) {
  // TODO use customerServiceEnabled from useSiteGlobals when we
  // integrate this component with the PDP
  // const { customerServiceEnabled } = useSiteGlobalsContext();
  const customerServiceEnabled = true;

  return (
    <ContentModal
      content={content}
      image={image}
      isOpen={isOpen}
      link={link}
      onClose={onClose}
      showSupportSection={showSupportSection}
      subtitle={subtitle}
      title={title}
      isCustomerServiceEnabled={customerServiceEnabled}
    />
  );
}

export default ContentModalContainer;
