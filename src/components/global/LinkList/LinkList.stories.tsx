import LinkList from './LinkList';
import linkList from './LinkList.mock';

export default {
  component: LinkList,
  title: 'Global/LinkList',
};

export function TypicalLinkList() {
  return <LinkList {...linkList} />;
}
