import {renderTemplate, RenderPosition} from './render.js';
import {createMenuTemplate} from './view/site-menu-view.js';
import {createFiltersTemplate} from './view/filters-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createEditFormTemplate} from './view/edit-form-view.js';
import {createEventsListTemplate} from './view/event-list-view.js';
import {createTripInfoTemplate} from './view/trip-info-view.js';

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripMainElement, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripNavigationElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersElement, createFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEventsListElement, createEditFormTemplate(), RenderPosition.BEFOREEND);
