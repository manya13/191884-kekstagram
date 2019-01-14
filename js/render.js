'use strict';

(function () {

  var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var renderPhoto = function (photo, id) {
    var photoElement = photoTemplate.cloneNode(true);
    var pictureImg = photoElement.querySelector('.picture__img');

    pictureImg.src = photo.url;
    pictureImg.setAttribute('id', id);
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var createGallery = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPhoto(data[i], i));
    }
    window.utils.photoList.appendChild(fragment);
  };

  window.render = {
    createGallery: createGallery
  };
})();
