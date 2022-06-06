import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripTabsView from './view/trip-tabs-view.js';
import { MenuTabs } from './types.js';
import { countStat, clearStats } from './utils/statistic.js';
import StatisticsView from './view/statistic-view.js';
import { RenderPosition, render, remove } from './render.js';
import  RestApi  from './rest-api.js';

const mainElement = document.querySelector('.page-main').querySelector('.page-body__container');
const navigationElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const buttonAddNewPoint = document.querySelector('.trip-main__event-add-btn');
const tripEventsContainer = document.querySelector('.trip-events');

const tripTabsComponent = new TripTabsView();
const Authorization = 'Basic bo1w597in298efa';
const endPoint = 'https://16.ecmascript.pages.academy/big-trip';
buttonAddNewPoint.disabled = true;
const eventsModel = new PointsModel(new RestApi(endPoint, Authorization));
const filterModel = new FiltersModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);
tripPresenter.init();

let statView = null;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuTabs.EVENTS:
      tripEventsContainer.classList.add('trip-events');
      filterPresenter.destroy();
      tripPresenter.destroy();
      filterPresenter.init(eventsModel.events);
      tripPresenter.init();
      remove(statView);
      statView = null;
      clearStats();
      break;
    case MenuTabs.STATISTICS:
      tripEventsContainer.classList.remove('trip-events');
      countStat(eventsModel.events);
      statView = new StatisticsView();
      render(mainElement, statView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.renderInfoTrip();
      break;
  }
};

eventsModel.init().finally(() => {
  filterPresenter.init(eventsModel.events);
  render(navigationElement, tripTabsComponent, RenderPosition.BEFOREEND);
  buttonAddNewPoint.disabled = false;
  tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);
});

buttonAddNewPoint.addEventListener('click', (event) => {
  event.preventDefault();
  event.target.disabled = true;
  tripEventsContainer.classList.add('trip-events');
  const tableTab = document.querySelector('#EVENTS');
  const statTab = document.querySelector('#STATISTICS');
  tableTab.classList.add('trip-tabs__btn--active');
  statTab.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init(eventsModel.events);
  tripPresenter.destroy();
  if(statView) {
    remove(statView);
  }
  clearStats();
  tripPresenter.createEvent();
  tripPresenter.init();
});
