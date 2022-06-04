import dayjs from 'dayjs';
import { getRandomNumber } from '../utils/utilsfunctions.js';
import { nanoid } from 'nanoid';
import { getDiffDates } from '../utils/diffdates.js';

const cities = [
  { titleCity: 'Amsterdam', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Geneva', description: '', photos: [], isShowPhoto: false },
  { titleCity: 'Chamonix', description: '', photos: [], isShowPhoto: false }
];
const types = [
  { title: 'taxi', img: 'img/icons/taxi.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'bus', img: 'img/icons/bus.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'drive', img: 'img/icons/drive.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'ship', img: 'img/icons/ship.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'check-in', img: 'img/icons/check-in.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'flight', img: 'img/icons/flight.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'restaurant', img: 'img/icons/restaurant.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'sightseeing', img: 'img/icons/sightseeing.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 },
  { title: 'train', img: 'img/icons/train.png', allOffer: [], selectedOffer: [], allPriceOffers: 0 }
];
const offers = [
  { 'text': 'Add luggage', 'id': 'luggage' },
  { 'text': 'Switch to comfort', 'id': 'comfort' },
  { 'text': 'Add meal', 'id': 'meal' },
  { 'text': 'Choose seats', 'id': 'seats' },
  { 'text': 'Travel by train', 'id': 'train' }
];

const generateTime = (date) => {
  const duration = getDiffDates(date.dataBeginEvent, date.dataEndEvent);
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
  const daysGap = getRandomNumber(-7, days);
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
  cities.forEach((city) => {
    const descriptionArray = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
    const countDescription = getRandomNumber(1, descriptionArray.length);
    for (let i = 0; i < countDescription; i++) {
      const elementNumber = getRandomNumber(0, descriptionArray.length - 1);
      const descriptionArrayElement = descriptionArray[elementNumber];
      descriptionArray.splice(elementNumber, 1);
      city.description += descriptionArrayElement;
    }
  });
};

const generateOffers = () => {
  types.forEach((typeRoute) => {
    const offerTitle = offers.slice(0);
    let countOffers = getRandomNumber(0, 5);

    for (let i = 0; i < offers.length; i++) {
      const numberElement = getRandomNumber(0, offerTitle.length - 1);
      const offerTitleElement = offerTitle[numberElement];
      const offer = {
        title: offerTitleElement,
        price: getRandomNumber(10, 100)
      };
      typeRoute.allOffer.push(offer);
      if (countOffers > 0) {
        typeRoute.selectedOffer.push(offer);
        typeRoute.allPriceOffers += offer.price;
        countOffers--;
      }
      offerTitle.splice(numberElement, 1);
    }
  });
};

const generatePhoto = () => {
  cities.forEach((city) => {
    let numberPhoto = 0;
    const countPhotos = getRandomNumber(3, 6);
    for (let i = 0; i < countPhotos; i++) {
      numberPhoto += getRandomNumber(1, 10);
      city.photos.push(`http://picsum.photos/248/152?r=${numberPhoto}`);
    }
  });
};

generateOffers();
generateDescription();
generatePhoto();

const generateEvents = () => {
  const date = generateDate();
  const time = generateTime(date);
  const type = { currentType: types[getRandomNumber(0, 7)], arrayType: types };
  const allPrice = type.currentType.allPriceOffers + getRandomNumber(10, 30);

  return {
    id: nanoid(),
    date,
    type,
    city: {currentCity: cities[getRandomNumber(0, 2)], arrayCity: cities},
    time,
    allPrice,
    favorite: Boolean(getRandomNumber(0, 1)),
  };
};

export { generateEvents, generateTime };
