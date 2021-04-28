import React from 'react';

import Accordion, {
  AccordionItem,
} from '~/components/global/Accordion/Accordion';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { LINK_THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import EmailSupport from '../../Support/EmailSupport';
import PhoneSupport from '../../Support/PhoneSupport';
import SupportHeading from '../../Support/SupportHeading';
import styles from './FAQ.styles';

export interface FAQProps {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled?: boolean;
  questions?: AccordionItem[];
}

const ITEMS_TO_SHOW = 4;

function FAQ({
  customerServiceNumber,
  questions,
  isCustomerServiceEnabled,
}: FAQProps) {
  return (
    <>
      {questions?.length && (
        <Grid>
          <GridItem
            as="h2"
            gridColumn="start/end"
            gridColumnL="3/8"
            css={styles.title}
          >
            {ui('pdp.faq.title')}
          </GridItem>
          <GridItem
            gridColumn="start/end"
            gridColumnL="8/13"
            css={styles.questionsContainer}
          >
            <Accordion
              id="faq"
              items={questions}
              itemsToShow={ITEMS_TO_SHOW}
              itemsToShowLabel={ui('pdp.faq.showAllLabel')}
            />
          </GridItem>
        </Grid>
      )}
      <Grid css={styles.supportContainer}>
        <GridItem
          gridColumn="start/end"
          gridColumnL="8/13"
          css={styles.questionsContainer}
        >
          <SupportHeading
            isCustomerServiceEnabled={isCustomerServiceEnabled}
            css={styles.supportTitle}
          />
          <div css={styles.supportOptions}>
            <div css={styles.supportItem}>
              <PhoneSupport
                customerServiceNumber={customerServiceNumber}
                theme={LINK_THEME.DARK_HIGHLIGHTED}
                isCustomerServiceEnabled={isCustomerServiceEnabled}
              />
            </div>
            <div css={styles.supportItem}>
              <EmailSupport
                theme={LINK_THEME.DARK_HIGHLIGHTED}
                isCustomerServiceEnabled={isCustomerServiceEnabled}
                css={styles.supportItem}
              />
            </div>
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

export default FAQ;
