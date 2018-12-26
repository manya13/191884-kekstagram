'use strict';

(function () {

  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var ESC_KEYCODE = 27;

  var getRandomNumber = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRangeNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.universal = {
    getRandomNumber: getRandomNumber,
    getRangeNumber: getRangeNumber,
    SCALE_STEP: SCALE_STEP,
    SCALE_MIN: SCALE_MIN,
    SCALE_MAX: SCALE_MAX,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
