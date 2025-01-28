const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
  errorMsgEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(inputEl);
  console.log(errorMsgEl);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
  errorMsgEl.classList.remove(config.errorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  console.log(config.inputSelector);
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, config);
  } else {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    //remove the disabled attribute from the button
  }
};

const disableButton = (buttonElement, config) => {
  console.log(config);
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
  //add a modifier class to the button to make it greyed out
  // dont forget the css
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });
};

//TODO: use the setting function to pass the config object

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  console.log(config);
  const formlist = document.querySelectorAll(config.formSelector);
  formlist.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

const editFormSubmitButton = editformElement.querySelector(
  ".modal__submit-button"
);
enableValidation(validationConfig);
