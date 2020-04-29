import LocationContainer from './LocationContainer';

export default {
  component: LocationContainer,
  title: 'Location',
};

const currentLocation = {
  cityName: 'Brooklyn',
  stateAbbr: 'NY',
  zip: '11201',
};

export function Location() {
  return <LocationContainer currentLocation={currentLocation} />;
}
