import { generateEvents } from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const EVENTS_COUNT = 15;

const events = Array.from({length: EVENTS_COUNT}, generateEvents);

const navigationElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const eventsModel = new PointsModel();
eventsModel.events = events;
const filterModel = new FiltersModel();
const tripPresenter = new TripPresenter(tripEvents, navigationElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (event) => {
  event.preventDefault();
  tripPresenter.createEvent();
});
