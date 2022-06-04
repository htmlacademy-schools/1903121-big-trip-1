import dayjs from 'dayjs';

const getDiffDates = (day1, day2) => {
  const dateDiff = Math.abs(dayjs(day1).diff(dayjs(day2)));
  const days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(dateDiff / (60 * 60 * 1000) - (24 * days));
  const minutes = dateDiff / (60 * 1000) - (days * 24 * 60) - (hours * 60);

  return { 'days': days, 'hours': hours, 'minuts': minutes, 'unix': dateDiff };
};

const getFormatDates = (unixTime) => {
  const days = Math.floor(unixTime / (24 * 60 * 60 * 1000));

  const hours = Math.floor(unixTime / (60 * 60 * 1000) - (24 * days));

  const minuts =Math.floor( unixTime / (60 * 1000) - (days * 24 * 60) - (hours * 60));

  let durationFormat = '';
  if (days !== 0) {
    durationFormat += `${(`0${days}`).slice(-2)}D ${(`0${hours}`).slice(-2)}H ${(`0${minuts}`).slice(-2)}M`;
  }
  else if (hours !== 0) {
    durationFormat += `${(`0${hours}`).slice(-2)}H ${(`0${minuts}`).slice(-2)}M`;
  }
  else {
    durationFormat += `${(`0${minuts}`).slice(-2)}M`;
  }

  return durationFormat;
};

const isDatesEqual = (date1, date2) => (date1 === null && date2 === null) || dayjs(date1).isSame(date2, 'D');

export { getDiffDates, isDatesEqual, getFormatDates };
