import dynamic from 'next/dynamic';
import { ReactChild } from 'react';

const MarkdownDynamic = dynamic(() => import('./MarkdownDynamic'));

interface Props {
  children: ReactChild;
}

// This markdown component allows only a subset of markdown and html tags
// to be passed to it while it unwraps the children of the remainder ignored nodes.
function Markdown(props: Props) {
  return <MarkdownDynamic>{props.children}</MarkdownDynamic>;
}

export default Markdown;
