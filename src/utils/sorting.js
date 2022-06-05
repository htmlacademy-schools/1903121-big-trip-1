import dayjs from 'dayjs';

const SortType = {
  DAY: {text: 'day', checked: true},
  TIME: {text: 'time', checked: false},
  PRICE: {text: 'price', checked: false},
};

const sortEventDate = (task1, task2) => dayjs(task1.date.dataBeginEvent).diff(dayjs(task2.date.dataBeginEvent));

const sortEventTime = (task1, task2) => {
  const time1 = dayjs(task1.date.dataEndEvent).diff(dayjs(task1.date.dataBeginEvent));
  const time2 = dayjs(task2.date.dataEndEvent).diff(dayjs(task2.date.dataBeginEvent));
  const timeDiff = time2 - time1;
  return timeDiff;
};

const sortEventPrice = (task1, task2) => task2.basePrice - task1.basePrice;
const sortStats = (task1, task2) => task2[1] - task1[1];

export { sortEventDate, sortEventTime, sortEventPrice, sortStats, SortType };
