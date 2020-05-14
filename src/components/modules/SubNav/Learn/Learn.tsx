import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { NavContextProps } from '~/context/Nav.context';
import { SiteMenu } from '~/data/models/SiteMenu';
import { LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import SubNavContentWrapper from '../SubNavContentWrapper';
import { steps } from './Learn.data';
import styles from './Learn.styles';

export interface LearnProps extends Pick<SiteMenu, 'siteMenuLearn'> {
  handleClearLink: NavContextProps['handleClearLink'];
  handleCloseSubNav: NavContextProps['handleCloseSubNav'];
  isCustomerServiceEnabled: boolean;
  isMobile: boolean;
}

function Learn({
  isCustomerServiceEnabled,
  isMobile,
  siteMenuLearn,
  handleClearLink,
  handleCloseSubNav,
}: LearnProps) {
  return (
    <SubNavContentWrapper
      isMobile={isMobile}
      onBack={handleClearLink}
      onClose={handleCloseSubNav}
      isOpen
      contentLabel="Learn more"
    >
      <GridItem css={styles.root}>
        <Icon css={styles.icon} name={ICONS.SMILEY} />
        <h1 css={[typography.primaryHeadline, styles.title]}>{steps.title}</h1>
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
              <Link theme={LINK_THEME.LIGHT} {...link}>
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
          <PhoneSupport {...{ isCustomerServiceEnabled }} />
          <EmailSupport {...{ isCustomerServiceEnabled }} />
        </span>
      </GridItem>
    </SubNavContentWrapper>
  );
}
export default Learn;
