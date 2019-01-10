'use strict';

(function () {

  var MAX_COMMENT = 5;

  var bigPhotoContainer = document.querySelector('.big-picture');
  var photoComments = bigPhotoContainer.querySelector('.social__comments');
  var commentUploadButton = bigPhotoContainer.querySelector('.social__comments-loader');
  var bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');
  var openComments = bigPhotoContainer.querySelector('.comments-open');

  var renderComment = function (comments) {
    var commentElement = bigPhotoContainer.querySelector('.social__comment').cloneNode(true);

    commentElement.querySelector('.social__text').textContent = comments.message;
    commentElement.querySelector('.social__picture').src = comments.avatar;

    return commentElement;
  };

  var getComment = function (photo, count) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var comment = renderComment(photo.comments[i]);
      fragment.appendChild(comment);
    }
    photoComments.innerHTML = '';
    photoComments.appendChild(fragment);

    if (photo.comments.length <= 5) {
      commentUploadButton.classList.add('visually-hidden');
    } else {
      commentUploadButton.classList.remove('visually-hidden');
    }
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

  var openBigPhoto = function (evt, arr) {
    if (evt.target.className === 'picture__img') {
      evt.preventDefault();
      bigPhotoContainer.classList.remove('hidden');

      var pictureId = evt.target.getAttribute('id');
      var takeNumber = arr[pictureId].comments.length > MAX_COMMENT ? MAX_COMMENT : arr[pictureId].comments.length;

      openComments.textContent = takeNumber;
      getBigPhoto(arr[pictureId]);
      getComment(arr[pictureId], takeNumber);

      commentUploadButton.addEventListener('click', function () {
        var hiddenComments = arr[pictureId].comments.length - takeNumber;
        if (hiddenComments > MAX_COMMENT) {
          takeNumber += MAX_COMMENT;
          getComment(arr[pictureId], takeNumber);
          openComments.textContent = takeNumber;
        } else {
          getComment(arr[pictureId], arr[pictureId].comments.length);
          openComments.textContent = arr[pictureId].comments.length;
          commentUploadButton.classList.add('visually-hidden');
        }
      });
    }

    bigPhotoClose.addEventListener('click', function () {
      bigPhotoContainer.classList.add('hidden');
    });
  };

  window.utils.photoList.addEventListener('click', function (evt) {
    openBigPhoto(evt, window.photoCollection);
    var onBigPhotoContainerEscPress = window.utils.closeEsc(bigPhotoContainer);
    document.addEventListener('keydown', onBigPhotoContainerEscPress);
  });

  window.picture = {
    openBigPhoto: openBigPhoto
  };
})();
