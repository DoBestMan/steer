export interface LOCATION_POPUP {
  Allow: boolean;
  'Dont Allow': boolean;
}
export interface SEARCH_ENTRY {
  isSearchOpen: boolean;
}
export interface SIMPLESNAP {
  allow?: boolean;
  apiResponse?: Record<string, string>;
  dontAllow?: boolean;
  dontAllowErrorMessage?: string;
  takePhoto?: boolean;
  closeTireSnapModal?: boolean;
  helpLinkClick?: boolean;
  retakePhoto?: boolean;
  tireResultsSuccess?: boolean;
  searchAnotherWay?: boolean;
  searchByBoardClick?: boolean;
}
export interface SEARCH_BY_BOARD {
  searchItem: string;
}
export type FS_EVENT_PROPERTIES =
  | LOCATION_POPUP
  | SIMPLESNAP
  | SEARCH_BY_BOARD
  | SEARCH_ENTRY;
