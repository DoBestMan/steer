import { CarInput } from '~/components/modules/Account/Account.types';

export const createCarDescription = ({
  make,
  model,
  option,
  year,
}: CarInput) => {
  const mappingArray = [make, model, option, year];
  let carDescription = '';
  mappingArray.map((item) => {
    if (item && item !== 'unknown') {
      carDescription = `${carDescription} ${item}`;
    }
  });
  return carDescription;
};
