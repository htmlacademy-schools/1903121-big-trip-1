import {createElement} from '../render.js';

const createPointListTemplate = () => '<div class="board__points"></div>';

export default class PointListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
