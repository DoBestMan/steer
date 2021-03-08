import { FS_EVENT_PROPERTIES } from '~/data/models/FullStoryEvents';

import { isBrowser } from '../utils/browser';

export const setFSCustomEvent = (
  eventName: string,
  data: FS_EVENT_PROPERTIES,
) => {
  if (isBrowser() && window.FS) {
    console.info('FS EventName: ', eventName);
    console.info('FS Data: ', data);
    window.FS.event(eventName, data);
  }
};
