export const isClient = () => typeof window !== 'undefined';

export const createNewEvent = (eventName: string) => {
  let event;
  if (typeof Event === 'function') {
    event = new Event(eventName);
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  return event;
};
