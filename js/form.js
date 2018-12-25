'use strict';

(function () {


  var photoList = document.querySelector('.pictures');
  var buttonUploadPhoto = photoList.querySelector('#upload-file');
  var editorPhoto = photoList.querySelector('.img-upload__overlay');
  var editorEffect = editorPhoto.querySelector('.effects');
  var editorPhotoClose = photoList.querySelector('.img-upload__cancel');
  var scaleControlSmaller = editorPhoto.querySelector('.scale__control--smaller');
  var scaleControlBigger = editorPhoto.querySelector('.scale__control--bigger');
  var scaleControlValue = editorPhoto.querySelector('.scale__control--value');
  var photoUploadPreview = editorPhoto.querySelector('.img-upload__preview');
  var photoUploadPreviewImg = photoUploadPreview.querySelector('img');
  var effectSlider = editorPhoto.querySelector('.img-upload__effect-level');
  var imgUploadSubmit = editorPhoto.querySelector('.img-upload__submit');
  var effectLevelPin = editorPhoto.querySelector('.effect-level__pin');
  var effectLevelValue = editorPhoto.querySelector('.effect-level__value');
  var effectLevelLine = editorPhoto.querySelector('.effect-level__line');
  var textHashtags = editorPhoto.querySelector('.text__hashtags');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var pinCenter = parseInt(window.getComputedStyle(effectLevelPin).width, 10) / 2;

  var scalePhoto = function (step) {
    var scale = parseInt(scaleControlValue.value, 10) / 100 + step / 100;
    photoUploadPreview.style.transform = 'scale(' + scale + ')';
    scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + step) + '%';
  };

  // открытие и закрытие формы

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.universal.ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    editorPhoto.classList.add('hidden');
    buttonUploadPhoto.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  buttonUploadPhoto.addEventListener('change', function () {
    editorPhoto.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  });

  editorPhotoClose.addEventListener('click', function () {
    closePopup();
  });

  // изменение размера загружаемой фотографии

  scaleControlSmaller.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) > window.universal.SCALE_MIN) {
      scalePhoto(-window.universal.SCALE_STEP);
    }
  });

  scaleControlBigger.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) < window.universal.SCALE_MAX) {
      scalePhoto(window.universal.SCALE_STEP);
    }
  });

  // применение эффектов

  effectSlider.classList.add('hidden');

  var addPhotoEffect = function (effect) {
    var nameEffect = effect.replace('effect-', '');
    photoUploadPreviewImg.className = 'effects__preview--' + nameEffect;
    if (effect !== 'effect-none') {
      effectSlider.classList.remove('hidden');
    } else {
      effectSlider.classList.add('hidden');
    }
    photoUploadPreviewImg.style.filter = '';
    effectLevelPin.style.left = parseInt(window.getComputedStyle(effectLevelLine).width, 10) - pinCenter + 'px';
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
    effectLevelValue.value = parseFloat(photoUploadPreviewImg.style.filter.match(/(\d[\d\.]*)/));
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

  // проверка хэштегов

  var checkHashtag = function () {
    var hashtags = textHashtags.value.toLowerCase().split(' ');
    var errorMessage = '';

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags.length > 5) {
        errorMessage = 'Хэштег должен начинаться с символа #';
      } else if (hashtags[i][0] !== '#') {
        errorMessage = 'Хэштег должен начинаться с символа #';
      } else if ((/^#$/).test(hashtags[i])) {
        errorMessage = 'Хэштег не может состоять только из одного символа #';
      } else if (hashtags[i].indexOf('#', 1) !== -1) {
        errorMessage = 'Добавьте пробел перед хэштегом';
      } else if (hashtags[i].length > 20) {
        errorMessage = 'Длина хэштега не должна превышать 20 символов';
      } else if (hashtags.indexOf(hashtags[i], i + 1) !== -1) {
        errorMessage = 'Хэштеги не должны повторяться';
      }
    }

    return textHashtags.setCustomValidity(errorMessage);
  };

  imgUploadSubmit.addEventListener('click', function () {
    checkHashtag();
  });

  textHashtags.addEventListener('input', function () {
    checkHashtag();
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  // перемещение слайдера

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var currentPinCoordinates = effectLevelPin.offsetLeft - shift.x;
      var blockWidth = parseInt(window.getComputedStyle(effectLevelLine).width, 10);

      switch (true) {
        case currentPinCoordinates <= 0:
          effectLevelPin.style.left = 0;
          break;
        case currentPinCoordinates >= blockWidth:
          effectLevelPin.style.left = blockWidth + 'px';
          break;
        case currentPinCoordinates >= 0 && currentPinCoordinates <= blockWidth:
          effectLevelPin.style.left = currentPinCoordinates + 'px';
          break;
      }

      effectLevelDepth.style.width = effectLevelPin.style.left;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
