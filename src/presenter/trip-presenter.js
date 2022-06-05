import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './data-presenter.js';
import { EventType, UpdateType, FilterType } from '../types.js';
import { filter } from '../utils/filter.js';
import { SortType, sortEventDate, sortEventTime, sortEventPrice } from '../utils/sorting.js';
import { RenderPosition, render, remove } from '../render.js';
import { clearStats } from '../utils/statistic.js';
import { dataNewEvent } from '../utils/adapter.js';
import LoadingView from '../view/loading-view.js';
import HeaderView from '../view/header-view.js';

const tripMainContainer = document.querySelector('.trip-main');

export default class TripPresenter {
  #tripContainer = null;
  #eventPresenters = new Map();
  #eventNewPresenter = null;
  #sortType = SortType.DAY.text;
  #eventsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #listEventComponent = new EventsListView();
  #eventEmptyComponent = null;
  #filterType = FilterType.EVERYTHING;
  #loadingComponent = new LoadingView();
  #infoTrip = null;
  #isLoading = true;

  constructor(tripContainer, eventsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventNewPresenter = new EventNewPresenter(this.#listEventComponent, this.#handleViewAction);
  }

  init = () => {
    this.#renderBoard();
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createEvent = () => {
    this.#handleModeChange();
    this.#sortType = SortType.DAY.text;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    clearStats();
    dataNewEvent.type.currentType.selectedOffers = [];
    dataNewEvent.city.currentCity.isShowPhoto = true;
    this.#eventNewPresenter.init(dataNewEvent);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

  destroy = () => {
    this.#clearBoard({ resetSortType: true});
    remove(this.#listEventComponent);
    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
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
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    const events = this.events.slice();
    this.#renderSort();
    this.#renderListEvent();
    this.renderInfoTrip();
    this.#renderEvents(events);
    this.#changeSortType(this.#sortType);
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#eventEmptyComponent);
    remove(this.#loadingComponent);
    remove(this.#infoTrip);

    if (this.#eventEmptyComponent) {
      remove(this.#eventEmptyComponent);
    }

    if (resetSortType) {
      this.#sortType = SortType.DAY.text;
    }
  }

  renderInfoTrip = () => {
    if(this.events.length > 0 ) {
      this.#infoTrip = new HeaderView(this.events);
      render(tripMainContainer,this.#infoTrip , RenderPosition.AFTERBEGIN);
    }
  }

  #renderLoading = () => {
    render(this.#tripContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }
}
