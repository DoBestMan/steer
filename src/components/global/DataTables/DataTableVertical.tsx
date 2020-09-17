import { ReactNode } from 'react';

import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import { SiteLink } from '~/data/models/SiteLink';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { Breakpoint, BREAKPOINT_SIZES, THEME } from '~/lib/constants';

import { styles } from './DataTables.styles';

export interface DataTableColumnProps {
  columnL?: Array<HeaderColumnProps>;
  columnM?: Array<HeaderColumnProps>;
  columnS: Array<HeaderColumnProps>;
  columnXL?: Array<HeaderColumnProps>;
}
export interface HeaderColumnProps {
  isFixed?: boolean;
  label: string;
  link?: SiteLink;
  width: number;
}
export interface DataTableRows {
  dataRow: Array<SiteLinkWithLabel>;
}
export interface DataTableProps {
  caption: string;
  columns: DataTableColumnProps;
  data: Array<DataTableRows>;
  height?: number;
  isFirstColumnFixed?: boolean;
  width?: number;
}
interface TableProps {
  caption: string;
  children: ReactNode;
}
interface RowProps {
  children: ReactNode;
}
interface ColumnProps {
  children: ReactNode;
  header?: boolean;
  isFixed?: boolean;
  link?: SiteLink;
  role: string;
  width: number;
}
function Table({ children, caption }: TableProps) {
  return (
    <div css={styles.tableWrapper} role="table" aria-label={caption}>
      {children}
    </div>
  );
}

function Row({ children }: RowProps) {
  return (
    <div css={[styles.tableRow]} role="row">
      <div css={styles.tableRowWrapper}>{children}</div>
    </div>
  );
}

function Column({
  width,
  children,
  header,
  isFixed = false,
  role,
}: ColumnProps) {
  return (
    <div
      role={role}
      css={[
        styles.column,
        { width },
        header && styles.tableRowHeaderColumn,
        isFixed && styles.fixedCol,
      ]}
    >
      {children}
    </div>
  );
}
function getColumnDataForBreakpoint(
  columns: DataTableColumnProps,
  bk: Breakpoint,
): Array<HeaderColumnProps> {
  switch (bk) {
    case BREAKPOINT_SIZES.S:
      return columns.columnS;
    case BREAKPOINT_SIZES.M:
      return columns.columnM ? columns.columnM : columns.columnS;
    case BREAKPOINT_SIZES.L:
      return columns.columnL
        ? columns.columnL
        : columns.columnM
        ? columns.columnM
        : columns.columnS;
    case BREAKPOINT_SIZES.XL:
      return columns.columnXL
        ? columns.columnXL
        : columns.columnL
        ? columns.columnL
        : columns.columnM
        ? columns.columnM
        : columns.columnS;
    default:
      return columns.columnS;
  }
}
function DataTableVertical({
  columns,
  data,
  isFirstColumnFixed,
  caption,
}: DataTableProps) {
  const { bk } = useBreakpoints();
  const columnsDataForCurrentBreakpoint = getColumnDataForBreakpoint(
    columns,
    bk,
  );
  return (
    <div>
      <Table caption={caption}>
        <Row>
          {columnsDataForCurrentBreakpoint.map((column, index) => (
            <Column
              width={column.width}
              header
              key={index}
              isFixed={index === 0 && isFirstColumnFixed}
              role={'columnheader'}
            >
              {column.label}
            </Column>
          ))}
        </Row>
        {data.map((row, index) => {
          return (
            <Row key={index}>
              {row.dataRow.map((value, index) => {
                return (
                  <Column
                    width={columnsDataForCurrentBreakpoint[index].width}
                    key={index}
                    isFixed={index === 0 && isFirstColumnFixed}
                    role={'cell'}
                  >
                    {value.link ? (
                      <Link
                        href={value.link.href}
                        css={styles.link}
                        theme={THEME.LIGHT}
                      >
                        <Markdown isEditorial>{value.label}</Markdown>
                      </Link>
                    ) : (
                      <Markdown isEditorial>{value.label}</Markdown>
                    )}
                  </Column>
                );
              })}
            </Row>
          );
        })}
      </Table>
    </div>
  );
}

export default DataTableVertical;
