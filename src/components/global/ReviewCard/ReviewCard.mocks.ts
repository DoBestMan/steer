const momentList = [
  {
    label: 'Would you buy again',
    value: 'Yes',
  },
  {
    label: 'Average miles driven by year',
    value: '40,000',
  },
  {
    label: 'Driving habit',
    value: 'Cautious, City',
  },
];

const ratings = [
  {
    label: 'Overall',
    rating: 4.8,
  },
  {
    label: 'Dry',
    rating: 5,
  },
  {
    label: 'Wet',
    rating: 5,
  },
  {
    label: 'Winter',
    rating: 2.7,
  },
  {
    label: 'Comfort',
    rating: 4.8,
  },
  {
    label: 'Noise',
    rating: 3.5,
  },
  {
    label: 'Treadwear',
    rating: 3.7,
  },
];

export const mockReviews = [
  {
    body:
      'Excellent tire and great smooth ride and handling ability. Great tires, handle excellent, 90 mile commute each way highway and nyc streets. <br/><br/>This is our 4th maybe 5th set of tires with different vehicle. I drive mostly highway and mountain roads talking about the famous "Dragon Tail" road up in the Smokie Mountains where I live. Last tires were 54k on it we didn\'t have to replace them but winter was upon us. The other ones still riding on them 48k on them. I believe reasonable price and good quality. Will buy these tires again.',
    car: 'Toyota Corolla 2012',
    date: 'Feb 21, 2020',
    id: '1',
    isVerified: true,
    location: 'Brooklyn, NY',
    momentList,
    ratings,
    ratingStars: 5,
    title: 'John',
  },

  {
    body:
      'Installed four tires on my Civic. Ride comfort is fantastic, noise level is low, handling is excellent. Cannot comment on tread life nor winter/snow.',
    date: 'Feb 2, 2020',
    id: '2',
    isVerified: true,
    location: 'Philadelphia, PA',
    momentList,
    ratings,
    ratingStars: 5,
    title: 'Hugh',
  },
  {
    body: 'Excellent tire and great smooth ride and handling ability.',
    date: 'Jan 12, 2020',
    id: '3',
    location: 'San Francisco, CA',
    momentList,
    ratings,
    ratingStars: 5,
    title: 'Victor',
  },
];
