import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { SiteProduct } from '~/data/models/SiteProduct';

export function mapDataToRoadHazard({
  siteProduct: { siteProductLineSizeDetail, siteProductLineRearSizeDetail },
  quantity,
}: {
  quantity: { front: number; rear?: number };
  siteProduct: SiteProduct;
}): ProductInfoProps['roadHazard'] | null {
  if (!siteProductLineSizeDetail?.roadHazard) {
    return null;
  }

  if (!siteProductLineRearSizeDetail) {
    return {
      durationLabel: siteProductLineSizeDetail.roadHazard.durationLabel,
      price: (
        quantity.front *
        parseInt(siteProductLineSizeDetail.roadHazard.pricePerTireInCents)
      ).toString(),
    };
  }

  const sameDurationLabel =
    siteProductLineSizeDetail.roadHazard.durationLabel ===
    siteProductLineRearSizeDetail.roadHazard?.durationLabel;

  if (!sameDurationLabel || !siteProductLineRearSizeDetail.roadHazard) {
    return null;
  }

  const frontPrice =
    (quantity.front || 0) *
    parseInt(siteProductLineSizeDetail.roadHazard.pricePerTireInCents);
  const rearPrice =
    (quantity.rear || 0) *
    parseInt(siteProductLineRearSizeDetail.roadHazard.pricePerTireInCents);

  return {
    durationLabel: siteProductLineSizeDetail.roadHazard.durationLabel,
    price: (frontPrice + rearPrice).toString(),
  };
}
