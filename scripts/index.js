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

initialCards.forEach((card) => {
  console.log(card.name);
});

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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

btnAbrirModalEditar.addEventListener("click", handleOpenEditModal);

botonCerrarModalEditar.addEventListener("click", function () {
  closeModal(modalEditar);
});

function fillProfileForm() {
  campoNombre.value = nombrePerfil.textContent;
  campoDescripcion.value = descripcionPerfil.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modalEditar);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nombrePerfil.textContent = campoNombre.value;
  descripcionPerfil.textContent = campoDescripcion.value;

  closeModal(modalEditar);
}

formEditar.addEventListener("submit", handleProfileFormSubmit);
