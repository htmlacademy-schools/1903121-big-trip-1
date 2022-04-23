const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePointType = () => {
  const pointTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
  return pointTypes[getRandomIntInclusive(0, pointTypes.length - 1)];
};

const generateDestinationCity = () => {
  const cities = ['Moscow', 'London', 'Washington', 'Paris', 'Berlin', 'Rome', 'Tokyo'];
  return cities[getRandomIntInclusive(0, cities.length - 1)];
};

const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < getRandomIntInclusive(0, 5); i++) {
    offers.push({id: i, title: 'Title', price: getRandomIntInclusive(50, 500)});
  }
};

const generateDescription = () => {
  const description = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'];
  return description.slice(0, getRandomIntInclusive(1, 5));
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i <= 4; i++) {
    pictures.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return pictures;
};

export const generatePoint = () => {
  const pointType = generatePointType();
  return {
    pointType,
    price: getRandomIntInclusive(5, 500),
    destination: generateDestinationCity(),
    offer: {
      type: pointType,
      offers: generateOffers(),
    },
    destinationInfo: {
      description: generateDescription(),
      pictures: generatePictures()
    }
  };
};
