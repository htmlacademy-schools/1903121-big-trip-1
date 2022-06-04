import TripTabsView from '../view/trip-tabs-view';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './data-presenter.js';
import { EventType, UpdateType, FilterType } from '../types.js';
import { filter } from '../utils/filter.js';
import { generateEvents } from '../mock/point.js';
import { SortType, sortEventDate, sortEventTime, sortEventPrice } from '../utils/sorting.js';
import { RenderPosition, render, remove } from '../render.js';

export default class TripPresenter {
  #tripContainer = null;
  #menuContainer = null;
  #eventPresenters = new Map();
  #eventNewPresenter = null;
  #sortType = SortType.DAY.text;
  #eventsModel = null;
  #filterModel = null;
  #menuComponent = new TripTabsView();
  #sortComponent = null;
  #listEventComponent = new EventsListView();
  #eventEmptyComponent = null;
  #filterType = FilterType.EVERYTHING;

  constructor(tripContainer, menuContainer, eventsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#menuContainer = menuContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventNewPresenter = new EventNewPresenter(this.#listEventComponent, this.#handleViewAction);
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    render(this.#menuContainer, this.#menuComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  createEvent = () => {
    const event = generateEvents();
    event.city.currentCity.isShowPhoto = true;
    const createEventData = {...event, isCreateEvent : true};
    this.#handleModeChange();
    this.#eventNewPresenter.init(createEventData);
  }

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.resetView());
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#sortType) {
      case SortType.DAY.text:
        return filteredEvents.sort(sortEventDate);
      case SortType.TIME.text:
        return filteredEvents.sort(sortEventTime);
      case SortType.PRICE.text:
        return filteredEvents.sort(sortEventPrice);
    }

    return filteredEvents;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case EventType.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case EventType.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case EventType.DELETE_EVENT:
        this.#eventsModel.deleteEvents(updateType, update);
        break;
    }
  }

  #changeSortType = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }

    this.#sortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortType);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#changeSortType);
  }

  #renderListEvent = () => {
    render(this.#tripContainer, this.#listEventComponent, RenderPosition.BEFOREEND);
  }

  #renderEvent = (tripEvent) => {
    const eventPresenter = new EventPresenter(this.#listEventComponent, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(tripEvent);
    this.#eventPresenters.set(tripEvent.id, eventPresenter);
  }

  #renderEvents = (events) => {
    events.forEach((tripEvent) => this.#renderEvent(tripEvent));
  }

  #renderNoEvents = () => {
    this.#eventEmptyComponent = new EmptyListView(this.#filterType);
    render(this.#tripContainer, this.#eventEmptyComponent, RenderPosition.BEFOREEND);
    this.#listEventComponent.element.remove();
    this.#sortComponent.element.remove();
  }

  #renderBoard = () => {
    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }
    const events = this.events.slice();
    this.#renderSort();
    this.#renderListEvent();
    this.#renderEvents(events);
    this.#changeSortType(this.#sortType);
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#eventEmptyComponent);

    if (this.#eventEmptyComponent) {
      remove(this.#eventEmptyComponent);
    }

    if (resetSortType) {
      this.#sortType = SortType.DAY.text;
    }
  }
}