import { ReactNode } from 'react';

import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import { SiteLink } from '~/data/models/SiteLink';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { THEME } from '~/lib/constants';

import { styles } from './DataTables.styles';

export interface HeaderColumnProps {
  isFixed?: boolean;
  label: string;
  link?: SiteLink;
  width: number;
}
export interface DataTableProps {
  caption: string;
  columns: Array<HeaderColumnProps>;
  data: Array<Record<string, SiteLinkWithLabel>>;
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

function DataTableVertical({
  columns,
  data,
  isFirstColumnFixed,
  caption,
}: DataTableProps) {
  return (
    <div>
      <Table caption={caption}>
        <Row>
          {columns.map((column, index) => (
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
              {Object.keys(row).map((key, index) => {
                const value = row[key];
                return (
                  <Column
                    width={columns[index].width}
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
                        <Markdown>{value.label}</Markdown>
                      </Link>
                    ) : (
                      <Markdown>{value.label}</Markdown>
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
