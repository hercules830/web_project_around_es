import { enableValidation, resetValidation } from "./validate.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const btnAbrirModalEditar = document.querySelector(".profile__edit-button");
const modalEditar = document.querySelector("#edit-popup");
const botonCerrarModalEditar = modalEditar.querySelector(".popup__close");
const nombrePerfil = document.querySelector(".profile__title");
const descripcionPerfil = document.querySelector(".profile__description");
const campoNombre = modalEditar.querySelector(".popup__input_type_name");
const campoDescripcion = modalEditar.querySelector(
  ".popup__input_type_description"
);
const formEditar = modalEditar.querySelector(".popup__form");

const cardsTemplate = document.querySelector("#cards__template").content;
const cardsList = document.querySelector(".cards__list");
const profileAddBtn = document.querySelector(".profile__add-button");

const newCardPopup = document.querySelector("#new-card-popup");
const btnCerrarModalCard = newCardPopup.querySelector(".popup__close");
const formCrearCard = newCardPopup.querySelector("#new-card-form");
const popupInputCardName = newCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const popupInputCardUrl = newCardPopup.querySelector(".popup__input_type_url");

const popupImage = document.querySelector("#image-popup");
const btnClosePopupImage = popupImage.querySelector(".popup__close");
const imgInPopup = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function fillProfileForm() {
  campoNombre.value = nombrePerfil.textContent;
  campoDescripcion.value = descripcionPerfil.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(formEditar, validationConfig);
  openModal(modalEditar);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nombrePerfil.textContent = campoNombre.value;
  descripcionPerfil.textContent = campoDescripcion.value;
  closeModal(modalEditar);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardTitle = popupInputCardName.value;
  const newCardImage = popupInputCardUrl.value;
  const newCard = getCardElement(newCardTitle, newCardImage);
  cardsList.prepend(newCard);
  closeModal(newCardPopup);
}

function handleDeleteCard(event) {
  const btnDelete = event.target;
  const cardDelete = btnDelete.closest(".card");
  cardDelete.remove();
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  const btnCardLike = cardElement.querySelector(".card__like-button");
  btnCardLike.addEventListener("click", function () {
    btnCardLike.classList.toggle("card__like-button_is-active");
  });

  const btnDeleteCard = cardElement.querySelector(".card__delete-button");
  btnDeleteCard.addEventListener("click", handleDeleteCard);

  const imgCard = cardElement.querySelector(".card__image");
  imgCard.addEventListener("click", function () {
    popupCaption.textContent = cardTitle.textContent;
    imgInPopup.src = link;
    imgInPopup.alt = name;
    openModal(popupImage);
  });

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  return cardElement;
}

function renderCard(name, link, cardsList) {
  const newCard = getCardElement(name, link);
  cardsList.append(newCard);
}

btnAbrirModalEditar.addEventListener("click", handleOpenEditModal);

botonCerrarModalEditar.addEventListener("click", function () {
  closeModal(modalEditar);
});

formEditar.addEventListener("submit", handleProfileFormSubmit);

profileAddBtn.addEventListener("click", function () {
  formCrearCard.reset();
  resetValidation(formCrearCard, validationConfig);
  openModal(newCardPopup);
});

btnCerrarModalCard.addEventListener("click", function () {
  closeModal(newCardPopup);
});

formCrearCard.addEventListener("submit", handleCardFormSubmit);

btnClosePopupImage.addEventListener("click", function () {
  closeModal(popupImage);
});

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
  });
});

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

enableValidation(validationConfig);
