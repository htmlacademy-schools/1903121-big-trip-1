import {renderTemplate, RenderPosition} from './render.js';
import {createSiteMenuTemplate} from './view/site-menu-view';
import {createFilterTemplate} from './view/filter-view';
import {createSortTemplate} from './view/sort-view';
import {createPointTemplate} from './view/point-view';
import {createOfferTemplate} from './view/offer-form-view';
import {createTripInfoTemplate} from './view/trip-info-view';
import {generatePoint} from './mock/data';

const POINT_COUNT = 15;
const points = Array.from({length: POINT_COUNT}, generatePoint);

const tripBody = document.querySelector('.page-body');
const headElement = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const tripEventsElement = tripBody.querySelector('.trip-events');

renderTemplate(headElement, createTripInfoTemplate(points[0]), RenderPosition.AFTERBEGIN);
renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filtersElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createOfferTemplate(points[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  renderTemplate(tripEventsElement, createPointTemplate(points[i]), RenderPosition.BEFOREEND);
}
