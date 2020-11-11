import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Notification from './Notification';
import NotificationList from './NotificationList';
import { NotificationsData } from './NotificationsData.data';

export default {
  component: Notification,
  title: 'Global/Notification',
};

const styles: StylesMap = {
  paddingBottom: {
    paddingBottom: SPACING.SIZE_20,
    backgroundColor: COLORS.GLOBAL.BLACK,
  },
  root: [
    typography.bodyCopy,
    {
      textAlign: 'center',
      backgroundColor: COLORS.GLOBAL.BLACK,
    },
  ],
};

function Container({ children }: { children: React.ReactChild }) {
  return (
    <Grid>
      <GridItem gridColumn="1/15" css={styles.root}>
        {children}
      </GridItem>
    </Grid>
  );
}

// Auto dismiss off is just for testing purposes
// There should be no actual use cases with auto dismiss disabled
export function NotificationItem() {
  return (
    <Container>
      <Notification
        subtext="Up to 50% off thousands of tires, while stocks last."
        icon={{
          svgId: ICONS.TAG,
          type: ICON_IMAGE_TYPE.ICON,
        }}
        id="10001"
        title="Black Friday sale"
        type="Sale"
        suppressFromHomePage={false}
        startDateTime="2020-11-10T08:00:00Z"
        endDateTime="2020-11-26T23:59:59Z"
      />
    </Container>
  );
}

export function NotificationListing() {
  return (
    <>
      <Container>
        <NotificationList notificationData={NotificationsData} />
      </Container>
    </>
  );
}
