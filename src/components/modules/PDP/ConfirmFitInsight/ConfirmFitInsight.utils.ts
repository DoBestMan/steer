import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { apiGetVehicleCatalogProducts } from '~/lib/api/get-vehicle-catalog-products';
import { apiGetVehicleSummary } from '~/lib/api/get-vehicle-summary';
import { BREAKPOINT_SIZES } from '~/lib/constants';

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

  let URL = currentURL;
  let queryWithoutVehicle = '';
  const positionOfVehicleQuery = currentURL.indexOf('vehicleMake');

  // to remove extra OEM params if they exist prior to vehicle params
  const doesQueryContainOEM = currentURL.indexOf('oem=');
  if (
    doesQueryContainOEM !== -1 &&
    positionOfVehicleQuery !== -1 &&
    doesQueryContainOEM < positionOfVehicleQuery
  ) {
    URL = URL.substring(0, positionOfVehicleQuery);
    const noOfOemQueries = (URL.match(/oem/g) || []).length;
    for (let i = 0; i < noOfOemQueries; i++) {
      let OEMString = URL.substring(doesQueryContainOEM, URL.length);
      const doeslinkContainParamsAfterOEM = OEMString.indexOf('&');
      if (doeslinkContainParamsAfterOEM !== -1) {
        OEMString = OEMString.substring(0, doeslinkContainParamsAfterOEM + 1);
      }
      URL = URL.replace(OEMString, '');
    }
    queryWithoutVehicle = URL;
  }

  const vehicleQuery =
    (vehicleMake ? `vehicleMake=${makeParamsURLFriendly(vehicleMake)}` : '') +
    (vehicleModel
      ? `&vehicleModel=${makeParamsURLFriendly(vehicleModel)}`
      : '') +
    (vehicleYear ? `&vehicleYear=${makeParamsURLFriendly(vehicleYear)}` : '') +
    (vehicleOem ? `&oem=${makeParamsURLFriendly(vehicleOem)}` : '') +
    (vehicleTrim ? `&vehicleTrim=${makeParamsURLFriendly(vehicleTrim)}` : '');

  if (positionOfVehicleQuery === -1) {
    return URL + `&${vehicleQuery}`;
  } else {
    queryWithoutVehicle = !queryWithoutVehicle
      ? URL.substring(0, positionOfVehicleQuery)
      : queryWithoutVehicle;

    return queryWithoutVehicle + vehicleQuery;
  }
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
  return param.replace(/\s+/g, '-').toLocaleLowerCase();
};

export const checkDecisionModalLabel = (label: string) => {
  const stringCheck = 'Change to the Size recommended';
  return label.toLocaleLowerCase().includes(stringCheck.toLocaleLowerCase());
};
