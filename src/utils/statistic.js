import { eventType } from '../types.js';

export const money = {
  [eventType.TAXI]: 0,
  [eventType.BUS]: 0,
  [eventType.DRIVE]: 0,
  [eventType.FLIGHT]: 0,
  [eventType.TRAIN]: 0,
  [eventType.SHIP]: 0,
  [eventType.RESTAURANT]: 0,
  [eventType.SIGHTSEEING]: 0,
  [eventType.CHECKIN]: 0,
};

export const duration = {
  [eventType.TAXI]: 0,
  [eventType.BUS]: 0,
  [eventType.DRIVE]: 0,
  [eventType.FLIGHT]: 0,
  [eventType.TRAIN]: 0,
  [eventType.SHIP]: 0,
  [eventType.RESTAURANT]: 0,
  [eventType.SIGHTSEEING]: 0,
  [eventType.CHECKIN]: 0,
};

export const count = {
  [eventType.TAXI]: 0,
  [eventType.BUS]: 0,
  [eventType.DRIVE]: 0,
  [eventType.FLIGHT]: 0,
  [eventType.TRAIN]: 0,
  [eventType.SHIP]: 0,
  [eventType.RESTAURANT]: 0,
  [eventType.SIGHTSEEING]: 0,
  [eventType.CHECKIN]: 0,
};

export const countStat = (events) => {
  events.forEach((event) => {
    money[event.type.currentType.title] += Number(event.basePrice);
    duration[event.type.currentType.title] += event.time.arrayDurationFormat.unix;
    count[event.type.currentType.title] += 1;
  });
};

export const clearStats = () => {
  const eventTypeValue =  Object.values(eventType);
  eventTypeValue.forEach((eventValue) => {
    money[eventValue] = 0;
    duration[eventValue] = 0;
    count[eventValue] = 0;
  });
};
