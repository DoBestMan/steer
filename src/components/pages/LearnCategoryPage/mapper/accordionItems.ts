import { AccordionItem } from '~/components/global/Accordion/Accordion';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';

export function convertQuickLinkToAccordionItem(
  links: SiteLinkWithLabel[],
  label: string,
) {
  const accordionItems: AccordionItem[] = [];
  let content = '';

  links.forEach((link, index) => {
    content += `${index + 1}. [${link.label}](${link.link?.href})\n\n`;
  });

  accordionItems.push({
    content,
    label,
  });

  return accordionItems;
}
