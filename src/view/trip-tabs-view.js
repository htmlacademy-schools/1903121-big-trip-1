import AbstractView from './abstract-view.js';
import {MenuTabs} from '../types';

const createTripTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuTabs.EVENTS}" data-value="${MenuTabs.EVENTS}">Table</a>
  <a class="trip-tabs__btn" href="#" id="${MenuTabs.STATISTICS}"  data-value="${MenuTabs.STATISTICS}">Stats</a>
</nav>`
);

export default class TripTabsView extends AbstractView {
  get template() {
    return createTripTabsTemplate();
  }

  setMenuClickHandler = (callback) => {
    const tabs = document.querySelector('.trip-controls__trip-tabs');
    this._callback.menuClick = callback;
    tabs.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    const currentLink = document.querySelector(`#${evt.target.dataset.value}`);
    const prevLink = document.querySelector('.trip-tabs__btn--active');
    if (prevLink !== currentLink) {
      currentLink.classList.add('trip-tabs__btn--active');
      prevLink.classList.remove('trip-tabs__btn--active');
      this._callback.menuClick(evt.target.dataset.value);
    }
  }
}

