'use strict';

var ESC_KEYCODE = 27;
var SCALE_STEP = 25;

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var EFFECTS = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];

var FILTERS = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];

var photoList = document.querySelector('.pictures');
var bigPhotoContainer = document.querySelector('.big-picture');
var photoComments = bigPhotoContainer.querySelector('.social__comments');
var bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');
var buttonUploadPhoto = photoList.querySelector('#upload-file');
var editorPhoto = photoList.querySelector('.img-upload__overlay');
var editorPhotoClose = photoList.querySelector('.img-upload__cancel');
var scaleControlSmaller = editorPhoto.querySelector('.scale__control--smaller');
var scaleControlBigger = editorPhoto.querySelector('.scale__control--bigger');
var scaleControlValue = editorPhoto.querySelector('.scale__control--value');
var photoUploadPreview = editorPhoto.querySelector('.img-upload__preview');
var effectsRadio = editorPhoto.querySelectorAll('.effects__radio');
var effectLevelPin = editorPhoto.querySelector('.effect-level__pin');
var effectLevelValue = editorPhoto.querySelector('.effect-level__value');

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRangeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var scalePhoto = function (step) {
  var scale = parseInt(scaleControlValue.value, 10) / 100 + step / 100;
  photoUploadPreview.style.transform = 'scale(' + scale + ')';
  scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + step) + '%';
};

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    var numberPhoto = i + 1;
    photos[i] = {
      url: 'photos/' + numberPhoto + '.jpg',
      likes: getRangeNumber(15, 199),
      comments: COMMENTS[getRandomNumber(COMMENTS)],
      description: DESCRIPTION[getRandomNumber(DESCRIPTION)]
    };
  }
  return photos;
};

var photoCollection = getPhotos();

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
  for (var j = 0; j < photoCollection.length; j++) {
    fragment.appendChild(renderPhoto(photoCollection[j]));
  }
  return fragment;
};

var getBigPhoto = function (photoContainer, photoElement) {
  for (var i = 0; i < photoCollection.length; i++) {
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

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRangeNumber(1, 6) + '.svg';

  for (var i = 0; i < photoCollection.length; i++) {
    commentElement.querySelector('.social__text').textContent = photoCollection[i].comments;
  }

  return commentElement;
};

photoComments.appendChild(renderComment());

photoList.appendChild(getFragment());

var miniaturePhoto = photoList.querySelectorAll('.picture');

var onMiniaturePhotoClick = function (photo, miniature) {
  miniature.addEventListener('click', function () {
    bigPhotoContainer.classList.remove('hidden');
    bigPhotoContainer.querySelector('.big-picture__img')
        .querySelector('img')
        .src = photo.url;

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        bigPhotoContainer.classList.add('hidden');
      }
    });
  });
};

var findUrlBigPhoto = function () {
  for (var i = 0; i < photoCollection.length; i++) {
    onMiniaturePhotoClick(photoCollection[i], miniaturePhoto[i]);
  }
};

findUrlBigPhoto();

getBigPhoto(bigPhotoContainer, photoCollection);

bigPhotoContainer.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPhotoContainer.querySelector('.comments-loader').classList.add('visually-hidden');

bigPhotoClose.addEventListener('click', function () {
  bigPhotoContainer.classList.add('hidden');
});

buttonUploadPhoto.addEventListener('change', function () {
  editorPhoto.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      editorPhoto.classList.add('hidden');
      // buttonUploadPhoto.value = '';
    }
  });
});

editorPhotoClose.addEventListener('click', function () {
  editorPhoto.classList.add('hidden');
  // buttonUploadPhoto.value = '';
});

scaleControlSmaller.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value) > 25) {
    scalePhoto(-SCALE_STEP);
  }
});

scaleControlBigger.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value) < 100) {
    scalePhoto(SCALE_STEP);
  }
});

var onEffectsRadioClick = function (effectButton, effect, filter) {
  effectButton.addEventListener('click', function () {
    photoUploadPreview.querySelector('img').classList.add('effects__preview--' + effect + '');
    effectLevelPin.addEventListener('mouseup', function () {
      var effectLevel = effectLevelPin.style.left;
      if (filter === 'blur') {
        effectLevel = parseInt(effectLevelPin.style.left, 10) * 3 / 100 + 'px';
      } else if (filter === 'brightness') {
        effectLevel = parseInt(effectLevelPin.style.left, 10) * 3 / 100;
      } else if (filter === 'blur' || 'sepia') {
        effectLevel = parseInt(effectLevelPin.style.left, 10) / 100;
      }
      photoUploadPreview.style.filter = '' + filter + '(' + effectLevel + ')';
      effectLevelValue.value = parseInt(effectLevel, 10);
    });
  });
};

var findEffectPhoto = function () {
  for (var i = 1; i < effectsRadio.length; i++) {
    onEffectsRadioClick(effectsRadio[i], EFFECTS[i - 1], FILTERS[i - 1]);
  }
};

findEffectPhoto();
