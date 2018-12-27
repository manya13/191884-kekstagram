'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var photoList = document.querySelector('.pictures');
  var editorPhoto = photoList.querySelector('.img-upload__overlay');
  var buttonUploadPhoto = photoList.querySelector('#upload-file');

  var getRandomNumber = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRangeNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var closeEsc = function (elem) {
    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    };

    var closePopup = function () {
      if (elem === editorPhoto) {
        elem.classList.add('hidden');
        buttonUploadPhoto.value = '';
      } else {
        elem.message.className = 'hidden';
      }

      document.removeEventListener('keydown', onEscPress);
    };
    return closePopup;
  };


  window.utils = {
    getRandomNumber: getRandomNumber,
    getRangeNumber: getRangeNumber,
    closeEsc: closeEsc,
    photoList: photoList,
    editorPhoto: editorPhoto,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
