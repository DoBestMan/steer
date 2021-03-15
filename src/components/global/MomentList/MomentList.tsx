import { CSSStylesProp, RATINGS_DISPLAY, THEME } from '~/lib/constants';

import styles, { dStyles, tStyles } from './MomentList.styles';

export interface MomentListItem {
  concise?: string;
  label: string;
  value: string;
}

interface Props {
  customContainerStyles?: CSSStylesProp;
  data: Array<MomentListItem>;
  display?: RATINGS_DISPLAY;
  theme?: THEME.DARK | THEME.LIGHT;
}

export function MomentList({
  customContainerStyles,
  data,
  theme = THEME.DARK,
  display = RATINGS_DISPLAY.DEFAULT,
}: Props) {
  return (
    <ul
      css={[styles.container, tStyles[theme].container, customContainerStyles]}
    >
      {data
        .filter(({ value }) => !!value)
        .map(({ label, value, concise }) => (
          <li css={[styles.item, dStyles[display].item]} key={label}>
            {concise && <span css={dStyles[display].concise}>{concise}</span>}
            <span css={dStyles[display].label}>{label}</span>
            <span css={[dStyles[display].value, tStyles[theme].value]}>
              {value}
            </span>
          </li>
        ))}
    </ul>
  );
}

export default MomentList;
