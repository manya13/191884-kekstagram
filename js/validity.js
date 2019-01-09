'use strict';

(function () {

  var textHashtags = window.utils.editorPhoto.querySelector('.text__hashtags');
  var textDescription = window.utils.editorPhoto.querySelector('.text__description');

  var onEditorPhotoEscPress = window.utils.closeEsc(window.utils.editorPhoto);

  var checkHashtag = function () {
    var errorMessage = '';

    if (textHashtags.value !== '') {
      var hashtags = textHashtags.value.toLowerCase().split(' ');

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

  textHashtags.addEventListener('input', checkHashtag);

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEditorPhotoEscPress.onEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onEditorPhotoEscPress.onEscPress);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEditorPhotoEscPress.onEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onEditorPhotoEscPress.onEscPress);
  });

  window.validity = {
    checkHashtag: checkHashtag,
    onEditorPhotoEscPress: onEditorPhotoEscPress
  };
})();
