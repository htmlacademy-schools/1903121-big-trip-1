import EditPoint from '../view/edit-point-view.js';
import { nanoid } from 'nanoid';
import { EventType, UpdateType } from '../types.js';
import { RenderPosition, render, remove } from '../render.js';

export default class DataPresenter {
  #listContainer = null;
  #changeData = null;
  #editComponent = null;
  #tripEvent = null;

  constructor(listContainer, changeData) {
    this.#listContainer = listContainer;
    this.#changeData = changeData;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;

    if (this.#editComponent !== null) {
      return;
    }
    this.#editComponent = new EditPoint(this.#tripEvent);
    this.#editComponent.setClickRollupHandler(this.#handleDeleteClick);
    this.#editComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#editComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#listContainer, this.#editComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy = () => {
    if (this.#editComponent === null) {
      return;
    }
    remove(this.#editComponent);
    this.#editComponent = null;
    const eventAddButton = document.querySelector('.trip-main__event-add-btn');
    eventAddButton.disabled = false;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  setSaving = () => {
    this.#editComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#editComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editComponent.shake(resetFormState);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (event) => {
    this.#changeData(
      EventType.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  }
}
