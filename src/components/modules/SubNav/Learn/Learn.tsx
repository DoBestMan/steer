import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { NavContextProps } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import SubNavContentWrapper from '../SubNavContentWrapper';
import { steps } from './Learn.data';
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
        <Icon css={styles.icon} name={ICONS.SMILEY} />
        <p css={[typography.primaryHeadline, styles.title]}>{steps.title}</p>
        <ol css={styles.stepList}>
          {steps.list.map((step, idx) => (
            <li css={styles.step} key={step}>
              <div css={styles.number}>{idx + 1}</div>
              <p css={styles.text}>{step}</p>
            </li>
          ))}
        </ol>
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
          />
          <EmailSupport {...{ isCustomerServiceEnabled }} />
        </span>
      </GridItem>
    </SubNavContentWrapper>
  );
}
export default Learn;
