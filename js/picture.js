'use strict';

(function () {

  var bigPhotoContainer = document.querySelector('.big-picture');
  var photoComments = bigPhotoContainer.querySelector('.social__comments');
  var bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');

  var renderComment = function (comments) {
    var commentElement = bigPhotoContainer.querySelector('.social__comment').cloneNode(true);

    commentElement.querySelector('.social__text').textContent = comments.message;
    commentElement.querySelector('.social__picture').src = comments.avatar;

    return commentElement;
  };

  var getComment = function (photo) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.utils.getRangeNumber(1, 5); i++) {
      var comment = renderComment(photo.comments[i]);
      fragment.appendChild(comment);
    }
    photoComments.innerHTML = '';
    photoComments.appendChild(fragment);
  };

  var getBigPhoto = function (photoElement) {
    bigPhotoContainer.querySelector('.social__caption')
        .textContent = photoElement.description;

    bigPhotoContainer.querySelector('.likes-count')
        .textContent = photoElement.likes;

    bigPhotoContainer.querySelector('.comments-count')
        .textContent = photoElement.comments.length;

    bigPhotoContainer.querySelector('.big-picture__img')
        .querySelector('img')
        .src = photoElement.url;
  };

  window.utils.photoList.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      evt.preventDefault();
      var pictureId = evt.target.getAttribute('id');

      bigPhotoContainer.classList.remove('hidden');
      getBigPhoto(window.photoCollection[pictureId]);
      getComment(window.photoCollection[pictureId]);
    }

    document.addEventListener('keydown', function (downEvt) {
      if (downEvt.keyCode === window.utils.ESC_KEYCODE) {
        bigPhotoContainer.classList.add('hidden');
      }
    });
  });

  bigPhotoContainer.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhotoContainer.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPhotoClose.addEventListener('click', function () {
    bigPhotoContainer.classList.add('hidden');
  });
})();
