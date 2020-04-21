import { stringSlashString } from '~/lib/constants/utils/regex';

interface Props {
  gridColumn: string;
  gridColumnL?: string;
  gridColumnM?: string;
  gridColumnS?: string;
  gridColumnXL?: string;
}

export function validateColSpan(props: Props) {
  const colSpans = [
    props.gridColumn,
    props.gridColumnS,
    props.gridColumnM,
    props.gridColumnL,
    props.gridColumnXL,
  ].filter((colSpan) => !!colSpan);

  colSpans.forEach((colSpan) => {
    const isValid = colSpan && stringSlashString.test(colSpan);

    if (!isValid) {
      // eslint-disable-next-line no-console
      console.info(
        `<GridItem /> : "${colSpan}" is not a valid value. Expected format: string/string`,
      );
    }
  });
}
