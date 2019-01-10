'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var photoList = document.querySelector('.pictures');
  var editorPhoto = photoList.querySelector('.img-upload__overlay');
  var bigPhotoContainer = document.querySelector('.big-picture');

  var getRandomNumber = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRangeNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var closeEsc = function (parameter) {
    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup(parameter);
      }
    };

    var closePopup = function (elem) {
      if (elem === editorPhoto || elem === bigPhotoContainer) {
        elem.classList.add('hidden');
      } else {
        elem.message.className = 'hidden';
      }
      document.removeEventListener('keydown', onEscPress);
    };
    return onEscPress;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRangeNumber: getRangeNumber,
    closeEsc: closeEsc,
    photoList: photoList,
    editorPhoto: editorPhoto,
    debounce: debounce
  };
})();
