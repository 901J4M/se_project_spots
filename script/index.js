const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const cardModalButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editformElement = editModal.querySelector(".modal__form");
const editProfileModal = document.querySelector("#edit-modal");
const editModalcloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModel = document.querySelector("#preview-modal");
const previewModelImageEl = previewModel.querySelector(".modal__image");
const previewModelCaptionEl = previewModel.querySelector(".modal__caption");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function openModel(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeModalOnOverlay);
  document.addEventListener("keydown", closeModalOnEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeModalOnOverlay);
  document.removeEventListener("keydown", closeModalOnEsc);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardNameEl.textContent = data.name;

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardImageEl.addEventListener("click", () => {
    openModel(previewModel);
    previewModelImageEl.src = data.link;
    previewModelImageEl.alt = data.name;
    previewModelCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
  disableButton(editFormSubmitButton, validationConfig);
  evt.target.reset();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(cardModal);
  disableButton(editFormSubmitButton, validationConfig);
  evt.target.reset();
}

const editInputList = Array.from(
  editformElement.querySelectorAll(".modal__input")
);
profileEditButton.addEventListener("click", () => {
  editModalDescriptionInput.value = profileDescription.textContent;
  editModalNameInput.value = profileName.textContent;
  resetValidation(editformElement, editInputList, validationConfig); // define inputList
  openModel(editModal);
});
editModalcloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

const previewCloseButton = previewModel.querySelector(".modal__close-button");
previewCloseButton.addEventListener("click", () => {
  closeModal(previewModel);
});

const cardInputList = Array.from(cardForm.querySelectorAll(".modal__input"));
cardModalButton.addEventListener("click", () => {
  openModel(cardModal);
  resetValidation(cardForm, cardInputList, validationConfig);
});
cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

editformElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item, i, arr) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

function closeModalOnEsc(evt) {
  console.log(evt);
  if (evt.key === "Escape") {
    // Check if the pressed key is "Escape"
    const modal = document.querySelector(".modal_opened"); // Select the currently open modal
    console.log(modal);
    closeModal(modal); // Call a function to close the modal
  }
}

document.addEventListener("keydown", closeModalOnEsc);

document.removeEventListener("keydown", closeModalOnEsc);

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    // Check if the clicked element is the modal itself (overlay)
    closeModal(evt.target); // Close the modal
  }
}
