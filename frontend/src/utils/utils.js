export const popupSelectors = {
  popupPreviewSelector: ".popup_preview",
  popupUserInfoFormSelector: ".popup_edit-form",
  popupUserAvatarFormSelector: ".popup_edit-avatar-form",
  popupAddCardFormSelector: ".popup_add-form",
  popupConfirmSelector: ".popup_confirm"
};

export const buttonSelectors = {
  profileEditButton: document.querySelector(".profile__edit-button"),
  editAvatarButton: document.querySelector(".profile__avatar-button"),
  addPhotoButton: document.querySelector(".profile__add-button"),
  submitProfileButton: document.querySelector(".popup__form-button_save"),
  addAvatarButton: document.querySelector(".popup__form-button_save-avatar"),
  addCardButton: document.querySelector(".popup__form-button_add"),
  confirmButton: document.querySelector(".popup__form-button_confirm")
};

export const formSelectors = {
  editForm: document.querySelector(".popup__form_edit"),
  avatarForm: document.querySelector(".popup__form_edit-avatar"),
  addForm: document.querySelector(".popup__form_add")
};

export const inputSelectors = {
  formNameInput: document.querySelector(".popup__form-input_name"),
  formAboutInput: document.querySelector(".popup__form-input_about"),
  formAvatarInput: document.querySelector(".popup__form-input_avatar")
};

export const profileElementsSelectors = {
  profileName: ".profile__name",
  profileAbout: ".profile__about",
  profileAvatar: ".profile__avatar"
};

export const cardsContainer = document.querySelector('.elements');

export const cardConfig = {
  cardTemplate: "#cards"
};

export const formConfig = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input-error_active"
};
