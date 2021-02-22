import Button from '~/components/global/Button/Button';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import LiveChatSupport from '~/components/modules/Support/LiveChatSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { NavContextProps } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import SubNavContentWrapper from '../SubNavContentWrapper';
import { learnStepsData } from './Learn.data';
import styles from './Learn.styles';

export interface LearnProps extends Pick<SiteMenu, 'siteMenuLearn'> {
  customerServiceNumber: { display: string; value: string };
  handleClearLink: NavContextProps['handleClearLink'];
  handleCloseSubNav: NavContextProps['handleCloseSubNav'];
  isCustomerServiceEnabled: boolean;
  isMobile: boolean;
  isOpen: boolean;
}

function Learn({
  customerServiceNumber,
  handleClearLink,
  handleCloseSubNav,
  isCustomerServiceEnabled,
  isMobile,
  isOpen,
  siteMenuLearn,
}: LearnProps) {
  return (
    <SubNavContentWrapper
      isMobile={isMobile}
      onBack={handleClearLink}
      onClose={handleCloseSubNav}
      isOpen={isOpen}
      contentLabel={ui('nav.learn.contentLabel')}
    >
      <GridItem css={styles.root}>
        <p css={[typography.primaryHeadline, styles.title]}>
          {learnStepsData.title}
        </p>
        <ol css={styles.stepList}>
          {learnStepsData.list.map((step, idx) => (
            <li css={styles.step} key={step}>
              <div css={styles.number}>{idx + 1}</div>
              <Markdown isEditorial css={styles.text}>
                {step}
              </Markdown>
            </li>
          ))}
        </ol>
        <p>
          <Button css={[styles.learnText, styles.text]} as="a" href="/learn">
            {learnStepsData.learnMore}
          </Button>
        </p>
        <p css={styles.more}>You may also be interested in:</p>
        <ul css={styles.moreLinks}>
          {siteMenuLearn.list.map(({ label, link }) => (
            <li css={styles.link} key={label}>
              <Link theme={THEME.LIGHT} {...link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <SupportHeading
          {...{ isCustomerServiceEnabled }}
          css={styles.supportTitle}
        />
        <span css={styles.support}>
          <PhoneSupport
            {...{ customerServiceNumber, isCustomerServiceEnabled }}
            css={typography.bodyCopyTight}
          />
          <EmailSupport
            {...{ isCustomerServiceEnabled }}
            css={typography.bodyCopyTight}
          />
          <LiveChatSupport />
        </span>
      </GridItem>
    </SubNavContentWrapper>
  );
}
export default Learn;
