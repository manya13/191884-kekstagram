'use strict';

(function () {

  var photoList = document.querySelector('.pictures');

  var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var getFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.photoCollection.length; j++) {
      fragment.appendChild(renderPhoto(window.data.photoCollection[j]));
    }
    return fragment;
  };

  photoList.appendChild(getFragment());
})();
