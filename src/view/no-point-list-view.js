import AbstractView from './abstract-view.js';

const createNoPointListTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPointListView extends AbstractView{
  get template() {
    return createNoPointListTemplate();
  }
}

