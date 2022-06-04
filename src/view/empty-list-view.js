import AbstractView from './abstract-view.js';
import {FilterType} from '../types.js';

const EventsTextTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no events future',
  [FilterType.PAST]: 'There are no events past'
};

const createEmptyListTemplate = (filterType) => {
  const eventsEmptyText = EventsTextTextType[filterType];
  return `<p class="trip-events__msg">${eventsEmptyText}</p>`;
};

export default class EmptyListView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createEmptyListTemplate(this._data);
  }
}
