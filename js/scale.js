'use strict';

(function () {

  var SCALE_STEP = 25;
  var SCALE_MAX = 100;

  var scaleControlSmaller = window.utils.editorPhoto.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.utils.editorPhoto.querySelector('.scale__control--bigger');
  var scaleControlValue = window.utils.editorPhoto.querySelector('.scale__control--value');
  var photoUploadPreview = window.utils.editorPhoto.querySelector('.img-upload__preview');

  var scalePhoto = function (step) {
    var scale = parseInt(scaleControlValue.value, 10) / 100 + step / 100;
    photoUploadPreview.style.transform = 'scale(' + scale + ')';
    scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + step) + '%';
  };

  scaleControlSmaller.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) > SCALE_STEP) {
      scalePhoto(-SCALE_STEP);
    }
  });

  scaleControlBigger.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) < SCALE_MAX) {
      scalePhoto(SCALE_STEP);
    }
  });
})();
