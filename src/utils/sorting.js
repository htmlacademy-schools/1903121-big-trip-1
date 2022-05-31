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
  const timeDiff = time1 - time2;
  return timeDiff;
};

const sortEventPrice = (task1, task2) => task1.allPrice - task2.allPrice;

export {sortEventDate, sortEventTime, sortEventPrice, SortType};
