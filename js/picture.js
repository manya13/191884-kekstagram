'use strict';

(function () {

  var MAX_COMMENT = 5;

  var bigPhotoContainer = document.querySelector('.big-picture');
  var photoComments = bigPhotoContainer.querySelector('.social__comments');
  var commentUploadButton = bigPhotoContainer.querySelector('.social__comments-loader');
  var bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');
  var openComments = bigPhotoContainer.querySelector('.comments-open');
  var imgFiltersButton = document.querySelectorAll('.img-filters__button');

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

    bigPhotoContainer.querySelector('.big-picture__img img').src = photoElement.url;
  };

  var createBigPhotoItems = function (photo) {
    var takeNumber = photo.comments.length > MAX_COMMENT ? MAX_COMMENT : photo.comments.length;
    openComments.textContent = takeNumber;

    getBigPhoto(photo);
    getComment(photo, takeNumber);

    commentUploadButton.addEventListener('click', function () {
      var hiddenComments = photo.comments.length - takeNumber;
      if (hiddenComments > MAX_COMMENT) {
        takeNumber += MAX_COMMENT;
        getComment(photo, takeNumber);
        openComments.textContent = takeNumber;
      } else {
        getComment(photo, photo.comments.length);
        openComments.textContent = photo.comments.length;
        commentUploadButton.classList.add('visually-hidden');
      }
    });
  };

  var createBigPhoto = function (evt, arr) {
    var pictureId;
    if (evt.target.className === 'picture__img') {
      pictureId = evt.target.getAttribute('id');
      createBigPhotoItems(arr[pictureId]);
      bigPhotoContainer.classList.remove('hidden');

      bigPhotoClose.addEventListener('click', function () {
        bigPhotoContainer.classList.add('hidden');
      });

    } else if (evt.target.className === 'picture') {
      evt.preventDefault();
      pictureId = evt.target.children[0].getAttribute('id');
      createBigPhotoItems(arr[pictureId]);
      bigPhotoContainer.classList.remove('hidden');

      bigPhotoClose.addEventListener('click', function () {
        bigPhotoContainer.classList.add('hidden');
      });
    }
  };

  var openBigPhoto = function (evt, photos) {
    createBigPhoto(evt, photos);
    var onBigPhotoContainerEscPress = window.utils.closeEsc(bigPhotoContainer);
    document.addEventListener('keydown', onBigPhotoContainerEscPress);
  };

  window.utils.photoList.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img' || evt.target.className === 'picture') {
      if (imgFiltersButton[0].className === 'img-filters__button  img-filters__button--active') {
        openBigPhoto(evt, window.photoCollection);
      } else {
        openBigPhoto(evt, window.newPhotoCollection);
      }
    }
  });
})();
