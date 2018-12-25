'use strict';

(function () {

  window.ESC_KEYCODE = 27;

  var photoList = document.querySelector('.pictures');
  var bigPhotoContainer = document.querySelector('.big-picture');
  var photoComments = bigPhotoContainer.querySelector('.social__comments');
  var bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');
  var buttonUploadPhoto = photoList.querySelector('#upload-file');
  var miniaturePhoto = photoList.querySelectorAll('.picture');


  var getBigPhoto = function (photoContainer, photoElement) {
    for (var i = 0; i < window.data.photoCollection.length; i++) {
      photoContainer.querySelector('.social__caption')
          .textContent = photoElement[i].description;

      photoContainer.querySelector('.likes-count')
          .textContent = photoElement[i].likes;

      photoContainer.querySelector('.comments-count')
          .textContent = photoElement[i].comments.length;
    }
  };

  var renderComment = function () {
    var commentElement = bigPhotoContainer.querySelector('.social__comment').cloneNode(true);

    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.data.getRangeNumber(1, 6) + '.svg';

    for (var i = 0; i < window.data.photoCollection.length; i++) {
      commentElement.querySelector('.social__text').textContent = window.data.photoCollection[i].comments;
    }

    return commentElement;
  };

  photoComments.appendChild(renderComment());

  var showBigPhoto = function (photo, miniature) {
    miniature.addEventListener('click', function (evt) {
      evt.preventDefault();
      bigPhotoContainer.classList.remove('hidden');
      bigPhotoContainer.querySelector('.big-picture__img')
          .querySelector('img')
          .src = photo.url;

      document.addEventListener('keydown', function (downEvt) {
        if (downEvt.keyCode === ESC_KEYCODE) {
          bigPhotoContainer.classList.add('hidden');
        }
      });
    });
  };

  var findUrlBigPhoto = function () {
    for (var i = 0; i < window.data.photoCollection.length; i++) {
      showBigPhoto(window.data.photoCollection[i], miniaturePhoto[i]);
    }
  };

  findUrlBigPhoto();

  getBigPhoto(bigPhotoContainer, window.data.photoCollection);

  bigPhotoContainer.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhotoContainer.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPhotoClose.addEventListener('click', function () {
    bigPhotoContainer.classList.add('hidden');
  });
})();
