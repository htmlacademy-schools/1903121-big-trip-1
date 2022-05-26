import {createElement} from '../render.js';

const createHeaderInfoTemplate = (point) => {
  const {destination} = point;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destination} &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;
};

export default class HeaderInfoView {
  #element = null;
  #point = null;

  constructor (point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createHeaderInfoTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
