import { generateEvents } from './mock/point.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripTabsView from './view/trip-tabs-view.js';
import { MenuTabs } from './types.js';
import { countStat, clearStats } from './utils/statistic.js';
import StatisticsView from './view/statistic-view.js';
import { RenderPosition, render, remove } from './render.js';

const EVENTS_COUNT = 15;

const events = Array.from({length: EVENTS_COUNT}, generateEvents);

const mainElement = document.querySelector('.page-main').querySelector('.page-body__container');
const navigationElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const siteMenuComponent = new TripTabsView();
const eventsModel = new PointsModel();
eventsModel.events = events;
const filterModel = new FiltersModel();
render(navigationElement, siteMenuComponent, RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(eventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

let statView = null;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuTabs.EVENTS:
      filterPresenter.init();
      tripPresenter.init();
      remove(statView);
      clearStats();
      break;
    case MenuTabs.STATISTICS:
      countStat(eventsModel.events);
      statView = new StatisticsView();
      render(mainElement, statView, RenderPosition.BEFOREEND);
      filterPresenter.destroy();
      tripPresenter.destroy();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (event) => {
  event.preventDefault();
  const tableTab = document.querySelector('#EVENTS');
  const statTab = document.querySelector('#STATISTICS');
  tableTab.classList.add('trip-tabs__btn--active');
  statTab.classList.remove('trip-tabs__btn--active');
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createEvent();
});
