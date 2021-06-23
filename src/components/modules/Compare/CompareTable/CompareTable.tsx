import { ANIMATION, NUMBER_OF_TIRES } from '../Compare.constants';
import styles from './CompareTable.styles';
import {
  BaseProps,
  ColumnHeaderProps,
  CompareTableProps,
  TableProps,
} from './CompareTable.types';
import { mapTypeToContent } from './CompareTable.util';
import SingleAccordion from './SingleAccordion/SingleAccordion';

function Table({ children, caption, customStyle }: TableProps) {
  return (
    <div css={[styles.table, customStyle]} aria-label={caption} role="table">
      {children}
    </div>
  );
}

function Row({ children, customStyle }: BaseProps) {
  return (
    <div css={[styles.trow, customStyle]} role="row">
      {children}
    </div>
  );
}

function Thead({ children, customStyle }: BaseProps) {
  return (
    <div css={styles.thead} role="columnheader">
      <div css={[styles.xSticky, customStyle]}>{children}</div>
    </div>
  );
}

function TCell({ children, customStyle, ...rest }: BaseProps) {
  return (
    <div css={[styles.tcell, customStyle]} role="cell" {...rest}>
      <div css={styles.tcellContent}>{children}</div>
    </div>
  );
}

function ColumnHeader({
  description,
  label,
  hasScrollbar,
  headerStyle,
}: ColumnHeaderProps) {
  return (
    <Thead customStyle={headerStyle}>
      {description ? (
        <SingleAccordion
          id={label}
          description={description}
          label={label}
          customStyle={hasScrollbar ? styles.singleAccordion : undefined}
        />
      ) : (
        <div css={hasScrollbar && styles.singleAccordion}>{label}</div>
      )}
    </Thead>
  );
}

function CompareTable({
  columns,
  data,
  caption,
  removingProductIndex,
  hasScrollbar,
  customRootStyle,
  hasAddTire,
  headerStyle,
}: CompareTableProps) {
  return (
    <div css={[styles.root, customRootStyle]}>
      <Table caption={caption}>
        {columns.map(({ label, description, type }, index) => (
          <Row key={label}>
            <ColumnHeader
              description={description}
              label={label}
              hasScrollbar={!!hasScrollbar}
              headerStyle={headerStyle}
            />
            <div css={styles.cellsWrapper}>
              {data[index].map((cell, index) => (
                <TCell
                  key={index}
                  customStyle={
                    index === removingProductIndex
                      ? ANIMATION.removing
                      : undefined
                  }
                >
                  {mapTypeToContent[type](cell)}
                </TCell>
              ))}
              {hasAddTire && data[index].length < NUMBER_OF_TIRES.MAX && (
                <TCell customStyle={styles.borderNone} aria-hidden />
              )}
            </div>
          </Row>
        ))}
      </Table>
    </div>
  );
}

export default CompareTable;
