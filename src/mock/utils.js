const getRandomNumber = (firstNumber, secondNumber) => {
  const maxNum = Math.max(firstNumber, secondNumber);
  const minNum = Math.min(firstNumber, secondNumber);

  return Math.floor(minNum + Math.random() * (maxNum - minNum + 1));
};

const getDiffDates = (dayOne, dayTwo) => {
  const dateDiff = Math.abs(dayOne - dayTwo);
  const days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(dateDiff / (60 * 60 * 1000) - (24 * days));
  const minutes = dateDiff / (60 * 1000) - (days * 24 * 60) - (hours * 60);

  return {'days': days, 'hours': hours, 'minuts': minutes};
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { getRandomNumber, getDiffDates, updateItem };
