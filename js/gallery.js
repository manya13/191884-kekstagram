'use strict';

(function () {

  var galleryFilters = document.querySelector('.img-filters');

  var successHandler = function (photos) {
    window.render.createGallery(photos);
    galleryFilters.classList.remove('img-filters--inactive');
    window.photoCollection = photos;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('loading-error');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.gallery = {
    errorHandler: errorHandler,
  };
})();
