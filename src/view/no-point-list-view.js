import {createElement} from '../render.js';

const createNoPointListTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPointListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
