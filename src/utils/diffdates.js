import dayjs from 'dayjs';

const getDiffDates = (day1, day2) => {
  const dateDiff = Math.abs(dayjs(day1).diff(dayjs(day2)));
  const days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(dateDiff / (60 * 60 * 1000) - (24 * days));
  const minutes = dateDiff / (60 * 1000) - (days * 24 * 60) - (hours * 60);

  return { 'days': days, 'hours': hours, 'minuts': minutes, 'unix': dateDiff };
};

const isDatesEqual = (date1, date2) => (date1 === null && date2 === null) || dayjs(date1).isSame(date2, 'D');

export { getDiffDates, isDatesEqual };
