import { ReactChild } from 'react';

import ReactMarkdown from 'react-markdown';

interface Props {
  children: ReactChild;
}

const isBreakTab = (string?: string): boolean =>
  string === '<br>' || string === '<br />';

// This allows us to circumvent a bug where markdown line breaks aren't always
// recognized https://github.com/rexxars/react-markdown/issues/270. Our workaround
// is to allow HTML(see`allowedTypes`) and filtering out anything that isn't a line break.
const allowOnlyHTMLBreaks = (
  node: ReactMarkdown.MarkdownAbstractSyntaxTree,
): boolean => (node.type === 'html' && !isBreakTab(node.value) ? false : true);

const allowedTypes: ReactMarkdown.NodeType[] = [
  'text',
  'html',
  'strong',
  'break',
];

// This markdown component allows only a subset of markdown and html tags
// to be passed to it while it unwraps the children of the remainder ignored nodes.
function Markdown(props: Props) {
  return (
    <ReactMarkdown
      allowedTypes={allowedTypes}
      allowNode={allowOnlyHTMLBreaks}
      escapeHtml={false}
      unwrapDisallowed
    >
      {props.children}
    </ReactMarkdown>
  );
}

export default Markdown;
