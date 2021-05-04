import { useRouter } from 'next/router';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import LiveChatSupport from '~/components/modules/Support/LiveChatSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { footerLinksData } from './Footer.data';
import styles from './Footer.styles';
import FooterLinkList from './FooterLinkList/FooterLinkList';
import FooterMailingList from './FooterMailingList/FooterMailingList';
import FooterPromotions from './FooterPromotions/FooterPromotions';

export interface Props {
  customerServiceNumber: { display: string; value: string };
  displayLiveChat?: boolean;
  isCustomerServiceEnabled?: boolean;
  showPromotions?: boolean;
}

function Footer({
  customerServiceNumber,
  isCustomerServiceEnabled,
  showPromotions = true,
}: Props) {
  const { isMobile } = useBreakpoints();
  const router = useRouter();
  const displayLiveChat =
    !!router.pathname.match(ROUTE_MAP[ROUTES.CUSTOMER_SUPPORT]) ||
    !!router.pathname.match(ROUTE_MAP[ROUTES.ORDER_TRACKING]);

  return (
    <Grid as="footer" css={styles.container}>
      <GridItem
        css={styles.promotions}
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="2/14"
        isGrid
      >
        {showPromotions && <FooterPromotions />}
      </GridItem>
      <GridItem
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="2/4"
        gridColumnXL="2/5"
        css={[typography.secondaryHeadline, styles.supportSection]}
      >
        <SupportHeading
          isCustomerServiceEnabled={isCustomerServiceEnabled}
          isInFooter
        />
      </GridItem>

      <GridItem
        as="ul"
        gridColumnS="2/6"
        gridColumnM="2/8"
        gridColumnL="4/13"
        gridColumnXL="5/14"
        isGrid
        css={styles.supportSectionButtons}
      >
        <GridItem
          gridColumnM="1/4"
          gridColumnL="1/5"
          gridColumnXL="1/4"
          as="li"
          css={styles.supportButton}
        >
          <PhoneSupport
            customerServiceNumber={customerServiceNumber}
            isCustomerServiceEnabled={isCustomerServiceEnabled}
          />
        </GridItem>
        <GridItem
          gridColumnM="4/7"
          gridColumnL="5/9"
          gridColumnXL="4/7"
          as="li"
          css={styles.supportButton}
        >
          <EmailSupport isCustomerServiceEnabled={isCustomerServiceEnabled} />
        </GridItem>
        {displayLiveChat && (
          <GridItem
            gridColumnM="7/12"
            gridColumnL="9/14"
            gridColumnXL="7/10"
            as="li"
            css={styles.supportButton}
          >
            <LiveChatSupport />
          </GridItem>
        )}
      </GridItem>

      <GridItem
        gridColumnS="2/3"
        gridColumnM="2/5"
        gridColumnL="2/5"
        css={styles.logoSection}
      >
        <BaseLink css={styles.logoLink} href="/">
          <Image
            altText={ui('logo.alt')}
            css={styles.logo}
            src="/static/assets/logo.svg"
          />
        </BaseLink>
        <BaseLink css={styles.logoLink} href="/">
          <Image
            altText={ui('tagline.alt')}
            css={styles.logoTagline}
            src="/static/assets/logo-tagline.svg"
          />
        </BaseLink>
      </GridItem>

      <GridItem
        gridColumnS="2/4"
        gridColumnM="2/4"
        gridColumnL="2/6"
        gridColumnXL="5/7"
        css={styles.companyLinksSection}
      >
        <p css={styles.linksHeading}>{ui('footer.company')}</p>
        <FooterLinkList links={footerLinksData.company.links} />
      </GridItem>

      <GridItem
        gridColumnS="4/6"
        gridColumnM="4/6"
        gridColumnL="6/10"
        gridColumnXL="7/9"
        css={styles.customerSupportSection}
      >
        <p css={styles.linksHeading}>{ui('footer.customerSupport')}</p>
        <FooterLinkList links={footerLinksData.customerSupport.links} />
      </GridItem>

      <GridItem
        gridColumnS="2/4"
        gridColumnM="6/8"
        gridColumnL="10/14"
        gridColumnXL="9/11"
        css={styles.tiresLinksSection}
      >
        <p css={styles.linksHeading}>{ui('footer.tires')}</p>
        <FooterLinkList links={footerLinksData.tires.links} />
      </GridItem>
      {isMobile && (
        <GridItem gridColumn="4/6" css={styles.simpleSnapSection}>
          <FooterLinkList links={footerLinksData.simpleSnapLink.links} />
        </GridItem>
      )}
      <GridItem
        gridColumnS="3/6"
        gridColumnM="5/8"
        gridColumnL="6/14"
        gridColumnXL="5/14"
        css={styles.socialLinksSection}
      >
        <FooterLinkList links={footerLinksData.social.links} />
      </GridItem>

      <GridItem
        gridColumnM="2/8"
        gridColumnL="2/14"
        gridColumnXL="11/14"
        css={styles.mailingListSection}
      >
        <FooterMailingList />
      </GridItem>

      <GridItem gridColumnXL="2/5" css={styles.copyrightSection}>
        <span css={styles.text}>{footerLinksData.copyright.text}</span>
      </GridItem>
    </Grid>
  );
}

export default Footer;
