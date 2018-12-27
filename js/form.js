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
  //var effectLevelValue = window.utils.editorPhoto.querySelector('.effect-level__value');
  var effectLevelLine = window.utils.editorPhoto.querySelector('.effect-level__line');
  var textHashtags = window.utils.editorPhoto.querySelector('.text__hashtags');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

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

  var successMessage = getMessage('success');
  var errorMessage = getMessage('error');

  var closeEscSuccesMessage = window.utils.closeEsc(successMessage);
  var closeEscErrorMessage = window.utils.closeEsc(errorMessage);

  var closeMessage = function (message, func) {
    message.button[0].addEventListener('click', function () {
      func();
      if (message === errorMessage) {
        window.utils.editorPhoto.classList.remove('hidden');
      }
    });

    document.addEventListener('keydown', func);
    document.addEventListener('click', function () {
      func();
    });
  };

  buttonUploadPhoto.addEventListener('change', function () {
    window.utils.editorPhoto.classList.remove('hidden');
    effectSlider.classList.add('hidden');
    photoUploadPreviewImg.style.filter = '';
    effectLevelPin.style.left = parseInt(window.getComputedStyle(effectLevelLine).width, 10) + 'px';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    photoUploadPreviewImg.className = '';
    textHashtags.style.outline = 'none';

    document.addEventListener('keydown', window.validity.closeEscEditorPhoto);
  });

  editorPhotoClose.addEventListener('click', function () {
    window.validity.closeEscEditorPhoto();
  });

  // применение эффектов

  var addPhotoEffect = function (effect) {
    var nameEffect = effect.replace('effect-', '');
    photoUploadPreviewImg.className = 'effects__preview--' + nameEffect;
    if (effect !== 'effect-none') {
      effectSlider.classList.remove('hidden');
    } else {
      effectSlider.classList.add('hidden');
    }
    photoUploadPreviewImg.style.filter = '';
    effectLevelPin.style.left = parseInt(window.getComputedStyle(effectLevelLine).width, 10) + 'px';
    effectLevelDepth.style.width = effectLevelPin.style.left;
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
    // effectLevelValue.value = parseFloat(photoUploadPreviewImg.style.filter.match(/(\d[\d\.]*)/)); не пойму, почему не работает?
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
    window.utils.editorPhoto.classList.add('hidden');
    photoUploadForm.reset();
    buttonUploadPhoto.value = '';

    successMessage.message.className = 'success';

    closeMessage(successMessage, closeEscSuccesMessage);
  };

  var errorHandler = function () {
    window.utils.editorPhoto.classList.add('hidden');
    errorMessage.message.className = 'error';

    errorMessage.button[1].addEventListener('click', function () {
      closeEscErrorMessage();
      photoUploadForm.reset();
      buttonUploadPhoto.value = '';
    });

    closeMessage(errorMessage, closeEscErrorMessage);
  };

  photoUploadForm.addEventListener('submit', function (evt) {
    window.validity.checkHashtag();
    window.backend.save(new FormData(photoUploadForm), successHandler, errorHandler);
    evt.preventDefault();
  });
})();
