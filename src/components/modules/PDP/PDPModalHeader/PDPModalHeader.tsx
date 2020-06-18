import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Markdown from '~/components/global/Markdown/Markdown';
import { CSSStyles } from '~/lib/constants';

import styles from './PDPModalHeader.styles';

interface Props {
  copy: string;
  customCopyStyles?: CSSStyles;
  icon?: IconType;
  subtitle: string;
  title: string;
}

function PDPModalHeader({
  copy,
  customCopyStyles,
  icon,
  subtitle,
  title,
}: Props) {
  return (
    <div css={styles.container}>
      {icon && <Icon name={icon} css={styles.icon} />}
      <h2 css={styles.title}>{title}</h2>

      <h3 css={styles.subtitle}>
        <Markdown renderers={{ paragraph: 'span' }}>{subtitle}</Markdown>
      </h3>
      <div css={[styles.copy, customCopyStyles]}>
        <Markdown>{copy}</Markdown>
      </div>
    </div>
  );
}

export default PDPModalHeader;
