import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { data } from './Footer.data';
import styles from './Footer.styles';
import FooterLinkList from './FooterLinkList/FooterLinkList';
import FooterMailingList from './FooterMailingList/FooterMailingList';

export interface Props {
  isCustomerServiceEnabled?: boolean;
}

function Footer(props: Props) {
  const { isCustomerServiceEnabled } = props;

  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return (
    <Grid as="footer" css={styles.container}>
      <GridItem
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="2/6"
        gridColumnXL="2/5"
        css={styles.supportSection}
      >
        <p css={typography.secondaryHeadline}>{supportContent.heading}</p>
      </GridItem>

      <GridItem
        as="ul"
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="6/14"
        gridColumnXL="5/14"
        css={styles.supportSectionButtons}
      >
        <li css={styles.supportButton}>
          <IconCTA
            theme={LINK_THEME.LIGHT}
            icon="phone"
            href={supportContent.sales.action}
          >
            {supportContent.sales.text}
          </IconCTA>
        </li>
        <li css={styles.supportButton}>
          <IconCTA
            theme={LINK_THEME.LIGHT}
            icon="mail"
            href={supportContent.support.action}
          >
            {supportContent.support.text}
          </IconCTA>
        </li>
      </GridItem>

      <GridItem
        gridColumnS="2/3"
        gridColumnM="2/5"
        gridColumnL="2/6"
        gridColumnXL="2/5"
        css={styles.logoSection}
      >
        <BaseLink href="/">
          <Image
            altText={data.logo.altText}
            css={styles.logo}
            srcSet="/static/assets/logo.svg"
          />
        </BaseLink>
      </GridItem>

      <GridItem
        gridColumnS="2/4"
        gridColumnM="2/5"
        gridColumnL="2/6"
        gridColumnXL="5/7"
        css={styles.companyLinksSection}
      >
        <p css={styles.linksHeading}>{data.company.heading}</p>
        <FooterLinkList links={data.company.links} />
      </GridItem>

      <GridItem
        gridColumnS="4/6"
        gridColumnM="5/8"
        gridColumnL="6/10"
        gridColumnXL="7/9"
        css={styles.tiresLinksSection}
      >
        <p css={styles.linksHeading}>{data.tires.heading}</p>
        <FooterLinkList links={data.tires.links} />
      </GridItem>

      <GridItem
        gridColumnS="3/6"
        gridColumnM="5/8"
        gridColumnL="6/14"
        gridColumnXL="9/11"
        css={styles.socialLinksSection}
      >
        <p css={[styles.linksHeading, styles.socialHeading]}>
          {data.social.heading}
        </p>
        <FooterLinkList links={data.social.links} />
      </GridItem>

      <GridItem
        gridColumnM="2/8"
        gridColumnL="10/14"
        gridColumnXL="11/14"
        css={styles.mailingListSection}
      >
        <FooterMailingList />
      </GridItem>

      <GridItem css={styles.copyrightSection}>
        <span css={styles.text}>{data.copyright.text}</span>
      </GridItem>
    </Grid>
  );
}

export default Footer;
