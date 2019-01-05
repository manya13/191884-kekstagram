'use strict';

(function () {

  var textHashtags = window.utils.editorPhoto.querySelector('.text__hashtags');
  var textDescription = window.utils.editorPhoto.querySelector('.text__description');

  var closeEscEditorPhoto = window.utils.closeEsc(window.utils.editorPhoto);

  var checkHashtag = function () {
    if (textHashtags.value !== '') {
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

      if (errorMessage !== '') {
        textHashtags.style.outline = '3px solid red';
      } else {
        textHashtags.style.outline = 'none';
      }
    }
    return textHashtags.setCustomValidity(errorMessage);
  };

  textHashtags.addEventListener('input', function () {
    checkHashtag();
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', closeEscEditorPhoto);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', closeEscEditorPhoto);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', closeEscEditorPhoto);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', closeEscEditorPhoto);
  });

  window.validity = {
    checkHashtag: checkHashtag,
    closeEscEditorPhoto: closeEscEditorPhoto
  };
})();