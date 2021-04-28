import dynamic from 'next/dynamic';
import React, { ReactChild } from 'react';
import { ReactMarkdownProps } from 'react-markdown';

import { styles } from './Markdown.styles';

const MarkdownDynamic = dynamic(() => import('./MarkdownDynamic'));

interface Props extends ReactMarkdownProps {
  children: ReactChild;
  isEditorial?: boolean;
}

function Markdown({ children, isEditorial, ...rest }: Props) {
  return (
    <>
      {isEditorial ? (
        <div css={styles.editorialMarkdownContainer}>
          <MarkdownDynamic {...rest}>{children}</MarkdownDynamic>
        </div>
      ) : (
        <MarkdownDynamic {...rest}>{children}</MarkdownDynamic>
      )}
    </>
  );
}

export default Markdown;
