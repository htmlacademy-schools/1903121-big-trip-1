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

const siteMenuComponent = new TripTabsView();
const AUTHORIZATION = 'Basic gjgtrhgrughei313';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';
buttonAddNewPoint.disabled = true;
const eventsModel = new PointsModel(new RestApi(END_POINT, AUTHORIZATION));
const filterModel = new FiltersModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

let statView = null;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuTabs.EVENTS:
      filterPresenter.destroy();
      tripPresenter.destroy();
      filterPresenter.init();
      tripPresenter.init();
      remove(statView);
      statView = null;
      clearStats();
      break;
    case MenuTabs.STATISTICS:
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
  render(navigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
  buttonAddNewPoint.disabled = false;
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

buttonAddNewPoint.addEventListener('click', (event) => {
  event.preventDefault();
  event.target.disabled = true;
  const tableTab = document.querySelector('#EVENTS');
  const statTab = document.querySelector('#STATISTICS');
  tableTab.classList.add('trip-tabs__btn--active');
  statTab.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  if(statView) {
    remove(statView);
  }
  clearStats();
  tripPresenter.createEvent();
  tripPresenter.init();
});
