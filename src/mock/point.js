import dayjs from 'dayjs';
import { getRandomNumber } from '../utils/utilsfunctions.js';
import { nanoid } from 'nanoid';
import { getDiffDates } from '../utils/diffdates.js';

let totalPrice = 0;
const cities = ['Amsterdam', 'Geneva', 'Chamonix'];
const types = [{ title: 'Taxi', img: 'img/icons/taxi.png' },
  { title: 'Bus', img: 'img/icons/bus.png' },
  { title: 'Drive', img: 'img/icons/drive.png' },
  { title: 'Check-in', img: 'img/icons/check-in.png' },
  { title: 'Flight', img: 'img/icons/flight.png' },
  { title: 'Restaurant', img: 'img/icons/restaurant.png' },
  { title: 'Sightseeing', img: 'img/icons/sightseeing.png' },
  { title: 'Train', img: 'img/icons/train.png' }
];

const generateTime = (date) => {
  const beginDate = new Date('', dayjs(date.dataBeginEvent).format('M'), dayjs(date.dataBeginEvent).format('D'), dayjs(date.dataBeginEvent).format('H'), dayjs(date.dataBeginEvent).format('m'));
  const endDate = new Date('', dayjs(date.dataEndEvent).format('M'), dayjs(date.dataEndEvent).format('D'), dayjs(date.dataEndEvent).format('H'), dayjs(date.dataEndEvent).format('m'));
  const duration = getDiffDates(beginDate, endDate);
  let durationFormat = '';

  if (duration.days !== 0) {
    durationFormat += `${(`0${duration.days}`).slice(-2)}D ${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else if (duration.hours !== 0) {
    durationFormat += `${(`0${duration.hours}`).slice(-2)}H ${(`0${duration.minuts}`).slice(-2)}M`;
  }
  else {
    durationFormat += `${(`0${duration.minuts}`).slice(-2)}M`;
  }

  return {
    'startTime': `${dayjs(date.dataBeginEvent).format('HH')}:${dayjs(date.dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs(date.dataEndEvent).format('HH')}:${dayjs(date.dataEndEvent).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};

const generateDate = () => {
  const days = 7;
  const daysGap = getRandomNumber(0, days);
  const daysAddGap = daysGap + getRandomNumber(0, 2);
  const firstHoursAdd = getRandomNumber(1, 6);
  const lastHoursAdd = getRandomNumber(firstHoursAdd, firstHoursAdd + 10);
  const firstMinutesAdd = getRandomNumber(0, 59);
  const lastMinutesAdd = getRandomNumber(firstMinutesAdd, firstMinutesAdd + 59);

  return {
    'dataBeginEvent': dayjs().add(daysGap, 'day').add(firstHoursAdd, 'hour').add(firstMinutesAdd, 'minute').toDate(),
    'dataEndEvent': dayjs().add(daysAddGap, 'day').add(lastHoursAdd, 'hour').add(lastMinutesAdd, 'minute').toDate()
  };
};

const generateDescription = () => {
  const descriptions = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
  const descriptionsLength = getRandomNumber(1, descriptions.length);
  let description = '';

  for (let i = 0; i < descriptionsLength; i++) {
    const elementNumber = getRandomNumber(0, descriptions.length - 1);
    const descriptionArrayElement = descriptions[elementNumber];
    descriptions.splice(elementNumber, 1);
    description += descriptionArrayElement;
  }

  return description;
};

const generateOffers = () => {
  const offers = [{ 'text': 'Add luggage', 'id': 'luggage' }, { 'text': 'Switch to comfort', 'id': 'comfort' }, { 'text': 'Add meal', 'id': 'meal' }, { 'text': 'Choose seats', 'id': 'seats' }, { 'text': 'Travel by train', 'id': 'train' }];
  const offersCount = getRandomNumber(0, 5);
  const offersList = [];

  for (let i = 0; i < offersCount; i++) {
    const numberElement = getRandomNumber(0, offers.length - 1);
    const offerTitleArray = offers[numberElement];
    offers.splice(numberElement, 1);

    const offer = {
      title: offerTitleArray,
      price: getRandomNumber(10, 100)
    };
    totalPrice += offer.price;
    offersList.push(offer);
  }

  return offersList;
};

const generatePhoto = () => {
  const photos = [];
  let photoNum = 0;
  const photosCount = getRandomNumber(3, 6);

  for (let i = 0; i < photosCount; i++) {
    photoNum += getRandomNumber(1, 10);
    photos.push(`http://picsum.photos/248/152?r=${photoNum}`);
  }

  return photos;
};

const generateEvents = () => {
  const date = generateDate();
  const time = generateTime(date);
  const offers = generateOffers();
  const price = totalPrice + getRandomNumber(10, 30);
  const type = types[getRandomNumber(0, 7)];
  totalPrice = 0;

  return {
    id: nanoid(),
    date,
    type,
    city: cities[getRandomNumber(0, 2)],
    time,
    offers,
    description: generateDescription(),
    allPrice: price,
    favorite: Boolean(getRandomNumber(0, 1)),
    photos: generatePhoto()
  };
};

export { generateEvents };
