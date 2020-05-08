import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import EmailSupport from '~/components/global/Support/EmailSupport';
import PhoneSupport from '~/components/global/Support/PhoneSupport';
import SupportHeading from '~/components/global/Support/SupportHeading';
import { useNavContext } from '~/context/Nav.context';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import SubNavContentWrapper from '../SubNavContentWrapper';
import { steps } from './Learn.data';
import styles from './Learn.styles';

interface Props {
  isCustomerServiceEnabled: boolean;
  siteMenuLearn: SiteMenuLearn;
}

function Learn({ isCustomerServiceEnabled, siteMenuLearn }: Props) {
  const { handleClearLink, handleCloseSubNav } = useNavContext();
  return (
    <SubNavContentWrapper
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