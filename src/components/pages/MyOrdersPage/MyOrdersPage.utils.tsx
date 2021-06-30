import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ShippingCarriers } from '~/data/models/ShippingCarriers';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { formatWithYear } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';

export const minWidthForMultipleDisplay = 750;

export function getStatusParams(status: string) {
  if (
    status.toLocaleLowerCase() === ui('account.newOrder').toLocaleLowerCase()
  ) {
    return { color: true, icon: ICONS.CHEVRON_RIGHT };
  } else {
    return { color: false, icon: ICONS.SHIPPING_TRUCK_OUTLINE };
  }
}

export function createTMORedirectURL(orderID: string, shippingZip: string) {
  const basePath = ROUTE_MAP[ROUTES.ORDER_TRACKING_RESULT];
  const queryParams = new URLSearchParams();
  queryParams.append('orderId', orderID);
  queryParams.append('zip', shippingZip);
  queryParams.append('fromMyOrder', '1');
  return [basePath, queryParams.toString()].join('?');
}

export function createOrderHeaderDetails(created: Date, total: string) {
  if (created && total) {
    const displayArray = [
      {
        title: ui('account.purchasedDate'),
        description: formatWithYear(String(created).replace(/-/g, '/')),
      },
      { title: ui('account.amount'), description: `$${total}` },
    ];
    return displayArray;
  }
  return null;
}

export function createShippingLabel(
  shippingCarriers: Array<ShippingCarriers> | null,
) {
  if (shippingCarriers && shippingCarriers.length > 0) {
    const title = ui('account.shipping');

    const carrierNames = shippingCarriers.map((item) => {
      return item.carrierName;
    });

    if (carrierNames.length > 1) {
      // when we have more than 1 shipping carriers we check how many unique carriers are present
      const uniqueCarrierNames = carrierNames.filter(function (item, pos) {
        return carrierNames.indexOf(item) == pos;
      });

      // if more than one shipping carrier we join them and display
      if (uniqueCarrierNames.length > 1) {
        const description = ui('account.shippingDescription', {
          carrier: uniqueCarrierNames.join(', '),
        });
        return [title, description];
      } else {
        // if only one shipping carrier but multiple deliveries we display with text "multiple deliveries"
        const description = ui('account.shippingDescription', {
          carrier: carrierNames[0],
        });
        return [title, description];
      }

      //  if only carrier and only one delivery we display just the carrier name
    } else if (carrierNames.length === 1) {
      const description = carrierNames[0];
      return [title, description];
    }
    // if neither of the above conditions match/empty array for api we dont display shipping
    return [null, null];
  }
  return [null, null];
}
