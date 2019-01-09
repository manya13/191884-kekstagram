'use strict';

(function () {

  var effectLevelPin = window.utils.editorPhoto.querySelector('.effect-level__pin');
  var effectLevelLine = window.utils.editorPhoto.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');


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
