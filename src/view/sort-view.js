import AbstractView from './abstract-view.js';
import {SortType} from '../utils/sorting.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortType.DAY.text}" ${currentSortType === SortType.DAY.text ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.TIME.text}" ${currentSortType === SortType.TIME.text ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE.text}" ${currentSortType === SortType.PRICE.text ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>
  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.querySelectorAll('.trip-sort__input').forEach((elementSort) => elementSort.addEventListener('click', this.#sortTypeChangeHandler));
  }

  #sortTypeChangeHandler = (event) => {
    if(event.target.checked === true){
      this._callback.sortTypeChange(event.target.dataset.sortType);
    }
  }
}

