import { AccordionItem } from '~/components/global/Accordion/Accordion';
import { SiteModuleProductLineFAQsItem } from '~/data/models/SiteModuleProductLineFAQsItem';

export function transformFaqItem(mainEntity: SiteModuleProductLineFAQsItem[]) {
  const accordionItems: AccordionItem[] = [];
  let content = '';
  let label = '';
  let id = '';
  mainEntity.forEach((item: SiteModuleProductLineFAQsItem, index) => {
    id = `${index}`;
    content = `${item?.acceptedAnswer?.text}\n\n`;
    label = `${item.name}\n\n`;
    accordionItems.push({
      id,
      content,
      label,
    });
  });

  return accordionItems;
}
