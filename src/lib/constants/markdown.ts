import { NodeType } from 'react-markdown';

export const MARKDOWN_PRIMITIVES: NodeType[] = [
  'root',
  'text',
  'break',
  'paragraph',
  'strong',
  'emphasis',
  'link',
  'list',
  'listItem',
];

export const MARKDOWN_PRIMITIVES_WITH_HTML: NodeType[] = [
  'root',
  'text',
  'break',
  'paragraph',
  'strong',
  'emphasis',
  'link',
  'list',
  'listItem',
  'html',
];
