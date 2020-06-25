import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';

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
}: Omit<
  ContentModalProps,
  'isCustomerServiceEnabled' | 'customerServiceNumber'
>) {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();

  return (
    <ContentModal
      customerServiceNumber={customerServiceNumber}
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
