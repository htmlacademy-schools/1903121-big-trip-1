import AbstractObservable from '../utils/abstract-observable.js';
import { generateAllOffers, generateCities, adapt, createDataNewEvent } from '../utils/adapter.js';
import { UpdateType } from '../types.js';

export default class PointsModel extends AbstractObservable {
  #events = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const offers = await this.#apiService.offers;
      generateAllOffers(offers);
      const cities = await this.#apiService.cities;
      generateCities(cities);
      const events = await this.#apiService.events;
      this.#events = events.map((event) => adapt(event));
      createDataNewEvent();
    } catch (error) {
      this.#events = [];
      createDataNewEvent();
      throw new Error('Can\'t init event');
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#apiService.addEvent(update);
      const newEvent = adapt(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(error) {
      throw new Error('Can\'t add event');
    }
  }

  updateEvent = async(updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#apiService.updateEvent(update);
      const updatedEvent = adapt(response);

      this.#events = [
        ...this.#events.slice(0, index),
        update,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  deleteEvents = async(updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#apiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(error) {
      throw new Error('Can\'t delete event');
    }
  }
}
