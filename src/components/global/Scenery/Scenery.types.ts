export enum Sceneries {
  'scenery--rural' = 'scenery--rural',
  'scenery--suburban' = 'scenery--suburban',
  'scenery--urban' = 'scenery--urban',
}

export function instanceOfSceneries(sceneryID: string): sceneryID is Sceneries {
  return sceneryID in Sceneries;
}
