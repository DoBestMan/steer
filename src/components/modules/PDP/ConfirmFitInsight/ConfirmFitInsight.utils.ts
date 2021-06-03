import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { apiGetVehicleCatalogProducts } from '~/lib/api/get-vehicle-catalog-products';
import { apiGetVehicleSummary } from '~/lib/api/get-vehicle-summary';
import { BREAKPOINT_SIZES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

export const confirmFitDecisionModal = 'confirmFitDecisionModal';
export const vehicleSelectorModal = 'vehicleSelectorModal';

export enum ConfirmFitType {
  DEFAULT = 'default',
  DOESNTFIT = 'doesntFit',
  FIT = 'fits',
}

export const VEHICLE_CONTAINER_DURATION = {
  M: 4000,
  S: 3000,
  XL: 5000,
};

export function getClearAnimationTime(bk: string) {
  switch (bk) {
    case BREAKPOINT_SIZES.S:
      return VEHICLE_CONTAINER_DURATION.S - 1000;
    case BREAKPOINT_SIZES.M:
      return VEHICLE_CONTAINER_DURATION.M - 1000;
    case BREAKPOINT_SIZES.XL:
      return VEHICLE_CONTAINER_DURATION.XL - 1000;
    default:
      return VEHICLE_CONTAINER_DURATION.S - 1000;
  }
}

export const createNewPDPURL = (
  vehicle: VehicleMetadata,
  currentURL: string,
) => {
  const {
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehicleOem,
    vehicleTrim,
  } = vehicle;

  const paramArray = [
    {
      name: 'vehicleMake',
      value: vehicleMake ? makeParamsURLFriendly(vehicleMake) : '',
    },
    {
      name: 'vehicleModel',
      value: vehicleModel ? makeParamsURLFriendly(vehicleModel) : '',
    },
    {
      name: 'vehicleYear',
      value: vehicleYear ? makeParamsURLFriendly(vehicleYear) : '',
    },
    {
      name: 'oem',
      value: vehicleOem ? makeParamsURLFriendly(vehicleOem) : '',
    },
    {
      name: 'vehicleTrim',
      value: vehicleTrim ? makeParamsURLFriendly(vehicleTrim) : '',
    },
  ];

  const isPaidOrNormalURL = currentURL.indexOf('#');
  const urlSeperator = isPaidOrNormalURL !== -1 ? '#' : '?';
  const [url, query] = currentURL.split(urlSeperator);

  const queryParams = new URLSearchParams(query);

  queryParams.delete('oem');

  paramArray.forEach((item) => {
    if (queryParams.get(item.name)) {
      if (item.value) {
        queryParams.set(item.name, item.value);
      } else {
        queryParams.delete(item.name);
      }
    } else if (item.value) {
      queryParams.append(item.name, item.value);
    }
  });

  const newURL = [url, queryParams.toString()].join(urlSeperator);
  return newURL;
};

export const getVehicleData = async (vehicle: VehicleMetadata) => {
  const { vehicleMake, vehicleModel, vehicleYear, vehicleTrim } = vehicle;
  const response = await apiGetVehicleSummary({
    make: makeParamsURLFriendly(vehicleMake),
    model: makeParamsURLFriendly(vehicleModel),
    year: makeParamsURLFriendly(vehicleYear),
    trim: vehicleTrim ? makeParamsURLFriendly(vehicleTrim) : '',
  });
  if (
    response &&
    response.isSuccess &&
    (
      response?.data?.siteCatalogSummary?.siteCatalogSummaryPrompt?.ctaList ||
      []
    ).length > 0
  ) {
    return response.data.siteCatalogSummary;
  } else {
    return null;
  }
};

export const getVehicleCatalogData = async (vehicle: VehicleMetadata) => {
  const { vehicleMake, vehicleModel, vehicleYear, vehicleTrim } = vehicle;
  const response = await apiGetVehicleCatalogProducts({
    make: makeParamsURLFriendly(vehicleMake),
    model: makeParamsURLFriendly(vehicleModel),
    year: makeParamsURLFriendly(vehicleYear),
    trim: vehicleTrim ? makeParamsURLFriendly(vehicleTrim) : '',
  });
  return response && response.isSuccess && !response.data ? true : false;
};

export const makeParamsURLFriendly = (param: string) => {
  return param.replace(/&/g, ' ').replace(/\s+/g, '-').toLocaleLowerCase();
};

export const checkDecisionModalLabel = (label: string) => {
  const stringCheck = ui('pdp.insights.confirmFitChangeSize');
  return label.toLocaleLowerCase().includes(stringCheck.toLocaleLowerCase());
};
