'use strict';

(function () {

  var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var renderPhoto = function (photo, id) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__img').setAttribute('id', id);

    return photoElement;
  };

  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i], i));
    }
    window.utils.photoList.appendChild(fragment);
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
