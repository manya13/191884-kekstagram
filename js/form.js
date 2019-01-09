'use strict';

(function () {

  var photoUploadForm = window.utils.photoList.querySelector('.img-upload__form');
  var buttonUploadPhoto = window.utils.photoList.querySelector('#upload-file');
  var editorEffect = window.utils.editorPhoto.querySelector('.effects');
  var editorPhotoClose = window.utils.photoList.querySelector('.img-upload__cancel');
  var photoUploadPreview = window.utils.editorPhoto.querySelector('.img-upload__preview');
  var photoUploadPreviewImg = photoUploadPreview.querySelector('img');
  var effectSlider = window.utils.editorPhoto.querySelector('.img-upload__effect-level');
  var effectLevelPin = window.utils.editorPhoto.querySelector('.effect-level__pin');
  var effectLevelLine = window.utils.editorPhoto.querySelector('.effect-level__line');
  var textHashtags = window.utils.editorPhoto.querySelector('.text__hashtags');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var effectLevelValue = window.utils.editorPhoto.querySelector('.effect-level__value');

  var getMessage = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType)
        .content
        .querySelector('.' + messageType);
    var message = messageTemplate.cloneNode(true);
    var button = message.querySelectorAll('.' + messageType + '__button');
    message.className = 'hidden';
    document.querySelector('main').appendChild(message);
    return {
      message: message,
      button: button
    };
  };

  var resetFilter = function () {
    photoUploadPreviewImg.style.filter = '';
    effectLevelPin.style.left = parseInt(window.getComputedStyle(effectLevelLine).width, 10) + 'px';
    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  var successMessage = getMessage('success');
  var errorMessage = getMessage('error');

  var onSuccesMessageEscPress = window.utils.closeEsc(successMessage);
  var onErrorMessageEscPress = window.utils.closeEsc(errorMessage);

  var openMessage = function (message, messageClass, cb) {
    window.utils.editorPhoto.classList.add('hidden');
    message.message.className = messageClass;
    buttonUploadPhoto.value = '';

    message.button.forEach(function (item) {
      item.addEventListener('click', cb.closePopup);
    });
    document.addEventListener('keydown', cb.onEscPress);
    document.addEventListener('click', cb.closePopup);
  };

  buttonUploadPhoto.addEventListener('change', function () {
    window.utils.editorPhoto.classList.remove('hidden');
    effectSlider.classList.add('hidden');
    photoUploadPreviewImg.className = '';
    textHashtags.style.outline = 'none';
    photoUploadPreview.style.transform = '';
    resetFilter();

    document.addEventListener('keydown', window.validity.onEditorPhotoEscPress.onEscPress);
  });

  editorPhotoClose.addEventListener('click', window.validity.onEditorPhotoEscPress.closePopup);

  // применение эффектов

  var addPhotoEffect = function (effect) {
    var nameEffect = effect.replace('effect-', '');
    photoUploadPreviewImg.className = 'effects__preview--' + nameEffect;
    if (effect !== 'effect-none') {
      effectSlider.classList.remove('hidden');
    } else {
      effectSlider.classList.add('hidden');
    }
    resetFilter();
  };

  // изменение уровня насыщенности эффекта

  var changeFilter = function (filter) {
    var pinPosition = parseInt(window.getComputedStyle(effectLevelPin).left, 10);
    var blockWidth = parseInt(window.getComputedStyle(effectLevelLine).width, 10);
    var proportionValue = (pinPosition / blockWidth).toFixed(2);
    var nameFilter = filter.replace('effects__preview--', '');

    switch (nameFilter) {
      case 'chrome':
        photoUploadPreviewImg.style.filter = 'grayscale(' + proportionValue + ')';
        break;
      case 'sepia':
        photoUploadPreviewImg.style.filter = 'sepia(' + proportionValue + ')';
        break;
      case 'marvin':
        photoUploadPreviewImg.style.filter = 'invert(' + (proportionValue * 100 + '%') + ')';
        break;
      case 'phobos':
        photoUploadPreviewImg.style.filter = 'blur(' + (proportionValue * 3 + 'px') + ')';
        break;
      case 'heat':
        photoUploadPreviewImg.style.filter = 'brightness(' + (proportionValue * 2 + 1) + ')';
        break;
    }

    effectLevelValue.setAttribute('value', parseFloat(photoUploadPreviewImg.style.filter.match(/(\d[\d\.]*)/)));
  };

  editorEffect.addEventListener('click', function (evt) {
    if (evt.target.getAttribute('name', 'effect')) {
      var radioId = evt.target.id;
      addPhotoEffect(radioId);
    }
  }, true);

  effectLevelPin.addEventListener('mousedown', function () {
    var nameFilter = photoUploadPreviewImg.className;
    changeFilter(nameFilter);

    var onMouseMove = function () {
      changeFilter(nameFilter);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var successHandler = function () {
    openMessage(successMessage, 'success', onSuccesMessageEscPress);
  };

  var errorHandler = function () {
    openMessage(errorMessage, 'error', onErrorMessageEscPress);
  };

  photoUploadForm.addEventListener('submit', function (evt) {
    window.validity.checkHashtag();
    window.backend.save(new FormData(photoUploadForm), successHandler, errorHandler);
    evt.preventDefault();
    photoUploadForm.reset();
  });
})();
