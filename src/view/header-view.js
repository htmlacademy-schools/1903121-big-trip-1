import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';
import {sortEventDate} from '../utils/sorting.js';

const createHeaderEvents = (events) => {
  let totalPrice = null;
  let title = '';
  events.sort(sortEventDate);
  const cities = events.map((event)=> event.city.currentCity.name);
  events.forEach((event)=> {totalPrice += Number(event.basePrice);});
  const beginDate = dayjs(events[0].date.dataBeginEvent).format('MMM D');
  const endDate = dayjs(events[events.length-1].date.dataEndEvent).format('DD');

  if (cities.length < 4) {
    cities.forEach((city, index) => {
      if (index === cities.length - 1) {
        title += `${city}`;
      }
      else {
        title += `${city} &mdash; `;
      }
    });
  }
  else if (cities.length > 3) {
    title = `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>
    <p class="trip-info__dates">${beginDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};

export default class HeaderView extends AbstractView {
  #events = null;

  constructor(events) {
    super();
    this.#events = events;
  }

  get template() {
    return createHeaderEvents(this.#events);
  }
}
