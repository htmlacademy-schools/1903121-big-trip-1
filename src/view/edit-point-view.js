import dayjs from 'dayjs';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { generateTime } from '../mock/point.js';

const buttonAddNewPoint = document.querySelector('.trip-main__event-add-btn');

const createPhoto = (photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`;
const createContainer = (photo) => (
  `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${photo}
  </div>
</div>`
);
const createEditOffer = (offer, isCheckedOffer) => {
  const { title, price } = offer;
  const id = title.split(' ').join('-').toLowerCase();

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" value="${id}" ${isCheckedOffer ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

const createEditPointTemplate = (event) => {
  const {
    date,
    type,
    city,
    basePrice,
  } = event;

  let offersView = '';
  let photoTemplate = '';
  let beginDate = '';
  let endDate = '';
  let allCitiesTemplate = '';

  type.arrayType.forEach((arrayTypeElement) => {
    if (arrayTypeElement.title === type.currentType.title) {
      type.currentType = { ...arrayTypeElement, selectedOffers: type.currentType.selectedOffers ? type.currentType.selectedOffers : [] };
    }
  });

  type.currentType.allOffer.forEach((offer) => {
    let isCheckedOffer = false;
    type.currentType.selectedOffers.forEach((selectedOffer) => {
      if (selectedOffer.id === offer.id) {
        isCheckedOffer = true;
      }
    });
    const offerCurrent = createEditOffer(offer, isCheckedOffer);
    offersView += offerCurrent;
  });

  city.arrayCity.forEach((arrayCityElement) => {
    if (arrayCityElement.name === city.currentCity.name) {
      if (city.currentCity.isShowPhoto) {
        city.currentCity = arrayCityElement;
        city.currentCity.isShowPhoto = true;
      }
      else {
        city.currentCity = arrayCityElement;
      }
    }
  });

  if (city.arrayCity) {
    city.arrayCity.forEach((cityName) => {
      allCitiesTemplate += `<option value="${cityName.name}"></option>`;
    });
  }

  if (city.currentCity.isShowPhoto) {
    city.currentCity.photos.forEach((photo) => {
      const onePhotoTemplate = createPhoto(photo);
      photoTemplate += onePhotoTemplate;
    });
    photoTemplate = createContainer(photoTemplate);
  }

  beginDate = dayjs(date.dataBeginEvent).format('YY/MM/DD HH:mm');
  endDate = dayjs(date.dataEndEvent).format('YY/MM/DD HH:mm');

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${type.currentType.img}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type.currentType.title === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type.currentType.title === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type.currentType.title === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type.currentType.title === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type.currentType.title === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type.currentType.title === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type.currentType.title === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type.currentType.title === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>
              <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type.currentType.title === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type.currentType.title}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city.currentCity.name}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${allCitiesTemplate}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${beginDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${!event.isCreateEvent ? basePrice : 0}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${!event.isCreateEvent ? 'Delete' : 'Cancel' }</button>
        ${!event.isCreateEvent ? `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>` : ''}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${offersView}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${city.currentCity.description}</p>
          ${photoTemplate}
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointView extends SmartView {
  #editPoint = null;
  #date = null;

  constructor(editPoint) {
    super();
    this._data = { ...editPoint };
    this.#setInnerHandlers();
    this.#setBeginDate();
    this.#setEndDate();
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHadler(this._callback.formSubmit);
    this.setClickRollupHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setBeginDate();
    this.#setEndDate();
  }

  get template() {
    return createEditPointTemplate(this._data);
  }

  reset = (task) => {
    this.updateData(
      task,
    );
  }

  removeElement = () => {
    super.removeElement();
    this.#date.destroy();
    this.#date = null;
  }

  #setBeginDate = () => {
    const currentDate = this._data.date ? this._data.date.dataBeginEvent : '';
    this.#date = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: currentDate,
        onChange: this.#beginDateChangeHandler,
      },
    );
  }

  #setEndDate = () => {
    const currentDate = this._data.date ? this._data.date.dataEndEvent : '';
    this.#date = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: currentDate,
        onChange: this.#endDateChangeHandler,
      },
    );
  }

  #beginDateChangeHandler = ([userDate]) => {
    this.updateData({
      date: { dataBeginEvent: userDate, dataEndEvent: this._data.date.dataEndEvent },
    });
    this._data.time =  generateTime({dataBeginEvent: userDate, dataEndEvent: this._data.date.dataEndEvent});
  }

  #endDateChangeHandler = ([userDate]) => {
    this.updateData({
      date: { dataBeginEvent: this._data.date.dataBeginEvent, dataEndEvent: userDate },
    });
    this._data.time = generateTime({ dataBeginEvent: this._data.date.dataBeginEvent, dataEndEvent: userDate });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityChangeHandler);
  }

  #cityChangeHandler = (evt) => {
    this.updateData({ city: { currentCity: { name: evt.target.value, isShowPhoto: true }, arrayCity: this._data.city.arrayCity } });
  }

  #typeChangeHandler = (evt) => {
    this.updateData({ type: { currentType: { title: evt.target.value }, arrayType: this._data.type.arrayType } });
  }

  setClickRollupHandler = (callback) => {
    this._callback.click = callback;
    if(!this._data.isCreateEvent) {
      this._data.city.currentCity.isShowPhoto = false;
    }
    const rollupButtonTemplate = this.element.querySelector('.event__rollup-btn');
    if (rollupButtonTemplate) {
      rollupButtonTemplate.addEventListener('click', this.#clickHandler);
    }
  }

  setFormSubmitHadler = (callback) => {
    this._callback.formSubmit = callback;
    if(!this._data.isCreateEvent) {
      this._data.city.currentCity.isShowPhoto = false;
    }
    this.element.querySelector('.event').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    buttonAddNewPoint.disabled = false;
    this._callback.click();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    buttonAddNewPoint.disabled = false;
    const priceValue = this.element.querySelector('#event-price-1').value;
    this._data.basePrice = Number(priceValue);
    this._data.isCreateEvent = false;
    const offersTemplate = document.querySelectorAll('.event__offer-checkbox');
    const filteredOffersCheked = Array.from(offersTemplate).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value.split('-').join(' '));
    const filteredOffersData = Array.from(this._data.type.currentType.allOffer)
      .filter((offer) =>
        filteredOffersCheked
          .some((filteredOfferCheked) => filteredOfferCheked === offer.title.toLowerCase()));
    this._data.type.currentType.selectedOffers = filteredOffersData;
    this._callback.formSubmit(this._data);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    buttonAddNewPoint.disabled = false;
    this._callback.deleteClick(this._data);
  }
}
