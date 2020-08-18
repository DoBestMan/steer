import { AccordionItem } from '~/components/global/Accordion/Accordion';
import { SiteBrandDetailsGroups } from '~/data/models/SiteBrandDetails';

export function convertGroupsToAccordionItems(list: SiteBrandDetailsGroups[]) {
  const newList: AccordionItem[] = [];

  list.forEach((item) => {
    const { title } = item;
    const accordionItem: AccordionItem = {
      label: title,
    };
    let content = '';

    item.sections.forEach((section) => {
      if (section.title) {
        content += `** ${section.title}**\n\n`;
      }

      section.links.forEach((link) => {
        content += ` [${link.label}](${link.link?.href})\n\n`;
      });
    });

    accordionItem.content = content;
    newList.push(accordionItem);
  });

  return newList;
}
