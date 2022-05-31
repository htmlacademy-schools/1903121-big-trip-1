import EventItemView from '../view/event-item-view.js';
import EditPointView from '../view/edit-point-view.js';
import EditOfferView from '../view/edit-offer-view.js';
import EventOfferView from '../view/event-offer-view.js';
import { RenderPosition, render, replace , remove } from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #eventEditComponent = null;
  #tripEvent = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventItemView(this.#tripEvent);
    this.#eventEditComponent = new EditPointView(this.#tripEvent);
    this.#eventComponent.setClickRollupHandler(this.#replaceEventToEditPoint);
    this.#eventEditComponent.setClickRollupHandler(this.#replaceEditPointToEvent);
    this.#eventEditComponent.setFormSubmitHadler(this.#replaceEditPointToEvent);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventListContainer, this.#eventComponent, RenderPosition.BEFOREEND);
      this.#renderOffers();
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
      this.#renderOffers();
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToEvent();
    }
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #removeOfferElements = () => {
    const offersElement = this.#eventEditComponent.element.querySelectorAll('.event__offer-selector');
    offersElement.forEach((offer) =>  offer.remove());
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditPointToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  #replaceEventToEditPoint = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    const availableOffers = this.#eventEditComponent.element.querySelector('.event__available-offers');
    this.#tripEvent.offers.forEach((offer) =>  render(availableOffers, new EditOfferView(offer), RenderPosition.BEFOREEND));
    this.#changeMode();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceEditPointToEvent = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #renderOffers = () => {
    const selectedOffers = this.#eventComponent.element.querySelector('.event__selected-offers');
    this.#tripEvent.offers.forEach((offer) =>  render(selectedOffers, new EventOfferView(offer), RenderPosition.BEFOREEND));
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#tripEvent, favorite: !this.#tripEvent.favorite});
  }
}
