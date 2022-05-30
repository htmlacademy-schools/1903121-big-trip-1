import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/data';

import HeaderInfoView from './view/header-info-view';
import TripTabsView from './view/trip-tabs-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import PointView from './view/point-view';
import OfferFormView from './view/offer-form-view';
import PointListView from './view/point-list-view';
import NoPointListView from './view/no-point-list-view';

const POINT_COUNT = 5;
const points = Array.from({length: POINT_COUNT}, generatePoint);

const tripBody = document.querySelector('.page-body');
const headElement = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const tripEventsElement = tripBody.querySelector('.trip-events');

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new OfferFormView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeydowm = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeydowm);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeydowm);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeydowm);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const pointListComponent = new PointListView();
render(tripEventsElement, pointListComponent, RenderPosition.BEFOREEND);

render(siteMenuElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(filtersElement, new FilterView(), RenderPosition.BEFOREEND);

if (points.length === 0) {
  render(pointListComponent, new NoPointListView(), RenderPosition.BEFOREEND);
} else {
  render(headElement, new HeaderInfoView(points[0]).element, RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortView(), RenderPosition.AFTERBEGIN);

  points.forEach((point) => {
    renderPoint(pointListComponent.element, point);
  });
}
