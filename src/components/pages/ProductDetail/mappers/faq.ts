import { AccordionItem } from '~/components/global/Accordion/Accordion';
import { FAQProps } from '~/components/modules/PDP/FAQ/FAQ';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteProduct } from '~/data/models/SiteProduct';

export function mapDataToFAQ({
  siteProduct: {
    siteProductLine: { faqList },
  },
  globals,
}: {
  globals: SiteGlobals;
  siteProduct: SiteProduct;
}): FAQProps | null {
  if (!faqList?.length) {
    return null;
  }

  const {
    customerServiceEnabled: isCustomerServiceEnabled,
    customerServiceNumber,
  } = globals;
  const questions: AccordionItem[] = faqList;

  return {
    isCustomerServiceEnabled,
    customerServiceNumber,
    questions,
  };
}
