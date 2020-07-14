export enum Weathers {
  'weather--raining' = 'weather--raining',
  'weather--snowing' = 'weather--snowing',
  'weather--storming' = 'weather--storming',
}

export function instanceOfWeathers(weatherID: string): weatherID is Weathers {
  return weatherID in Weathers;
}
