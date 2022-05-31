import { generateEvents } from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';

const EVENTS_COUNT = 5;

const events = Array.from({length: EVENTS_COUNT}, generateEvents);

const navigationElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripEvents, navigationElement, filtersElement);

tripPresenter.init(events);
