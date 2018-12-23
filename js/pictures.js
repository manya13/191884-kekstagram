'use strict';

var ESC_KEYCODE = 27;
var SCALE_STEP = 25;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
var PIN_CENTER = 9;

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var photoList = document.querySelector('.pictures');
var bigPhotoContainer = document.querySelector('.big-picture');
var photoComments = bigPhotoContainer.querySelector('.social__comments');
var bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');
var buttonUploadPhoto = photoList.querySelector('#upload-file');
var editorPhoto = photoList.querySelector('.img-upload__overlay');
var editorEffect = editorPhoto.querySelector('.effects');
var editorPhotoClose = photoList.querySelector('.img-upload__cancel');
var scaleControlSmaller = editorPhoto.querySelector('.scale__control--smaller');
var scaleControlBigger = editorPhoto.querySelector('.scale__control--bigger');
var scaleControlValue = editorPhoto.querySelector('.scale__control--value');
var photoUploadPreview = editorPhoto.querySelector('.img-upload__preview');
var photoUploadPreviewImg = photoUploadPreview.querySelector('img');
var effectSlider = editorPhoto.querySelector('.img-upload__effect-level');
var imgUploadSubmit = editorPhoto.querySelector('.img-upload__submit');
var effectLevelPin = editorPhoto.querySelector('.effect-level__pin');
var effectLevelValue = editorPhoto.querySelector('.effect-level__value');
var effectLevelLine = editorPhoto.querySelector('.effect-level__line');
var textHashtags = editorPhoto.querySelector('.text__hashtags');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  editorPhoto.classList.add('hidden');
  buttonUploadPhoto.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

buttonUploadPhoto.addEventListener('change', function () {
  editorPhoto.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
});

editorPhotoClose.addEventListener('click', function () {
  closePopup();
});

scaleControlSmaller.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value, 10) > SCALE_MIN) {
    scalePhoto(-SCALE_STEP);
  }
});

scaleControlBigger.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value, 10) < SCALE_MAX) {
    scalePhoto(SCALE_STEP);
  }
});

effectSlider.classList.add('hidden');

var addPhotoEffect = function (effect) {
  var nameEffect = effect.replace('effect-', '');
  photoUploadPreviewImg.className = 'effects__preview--' + nameEffect;
  if (effect !== 'effect-none') {
    effectSlider.classList.remove('hidden');
  } else {
    effectSlider.classList.add('hidden');
  }
  photoUploadPreviewImg.style.filter = '';
  effectLevelPin.style.left = parseInt(window.getComputedStyle(effectLevelLine).width, 10) - PIN_CENTER + 'px';
  effectLevelDepth.style.width = effectLevelPin.style.left;
};

var changeFilter = function (filter) {
  var pinPosition = parseInt(window.getComputedStyle(effectLevelPin).left, 10);
  var blockWidth = parseInt(window.getComputedStyle(effectLevelLine).width, 10) - PIN_CENTER;
  var proportionValue = (pinPosition / blockWidth).toFixed(2);
  var nameFilter = filter.replace('effects__preview--', '');

  switch (nameFilter) {
    case 'chrome':
      photoUploadPreviewImg.style.filter = 'grayscale(' + proportionValue + ')';
      break;
    case 'sepia':
      photoUploadPreviewImg.style.filter = 'sepia(' + proportionValue + ')';
      break;
    case 'marvin':
      photoUploadPreviewImg.style.filter = 'invert(' + (proportionValue * 100 + '%') + ')';
      break;
    case 'phobos':
      photoUploadPreviewImg.style.filter = 'blur(' + (proportionValue * 3 + 'px') + ')';
      break;
    case 'heat':
      photoUploadPreviewImg.style.filter = 'brightness(' + (proportionValue * 2 + 1) + ')';
      break;
  }
  effectLevelValue.value = parseFloat(photoUploadPreviewImg.style.filter.match(/(\d[\d\.]*)/));
};

editorEffect.addEventListener('click', function (evt) {
  if (evt.target.getAttribute('name', 'effect')) {
    var radioId = evt.target.id;

    addPhotoEffect(radioId);
  }
}, true);

effectLevelPin.addEventListener('mousedown', function () {
  var nameFilter = photoUploadPreviewImg.className;

  changeFilter(nameFilter);

  var onMouseMove = function () {
    changeFilter(nameFilter);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// проверка хэштегов
var checkHashtag = function () {
  var hashtags = textHashtags.value.toLowerCase().split(' ');
  var errorMessage = '';

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags.length > 5) {
      errorMessage = 'Хэштег должен начинаться с символа #';
    } else if (hashtags[i][0] !== '#') {
      errorMessage = 'Хэштег должен начинаться с символа #';
    } else if ((/^#$/).test(hashtags[i])) {
      errorMessage = 'Хэштег не может состоять только из одного символа #';
    } else if (hashtags[i].indexOf('#', 1) !== -1) {
      errorMessage = 'Добавьте пробел перед хэштегом';
    } else if (hashtags[i].length > 20) {
      errorMessage = 'Длина хэштега не должна превышать 20 символов';
    } else if (hashtags.indexOf(hashtags[i], i + 1) !== -1) {
      errorMessage = 'Хэштеги не должны повторяться';
    }
  }

  return textHashtags.setCustomValidity(errorMessage);
};

imgUploadSubmit.addEventListener('click', function () {
  checkHashtag();
});

textHashtags.addEventListener('input', function () {
  checkHashtag();
});

textHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

textHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// перемещение слайдера

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    var currentPinCoordinates = effectLevelPin.offsetLeft - shift.x;
    var blockWidth = parseInt(window.getComputedStyle(effectLevelLine).width, 10);
    var maxPinPosition = blockWidth - PIN_CENTER;

    switch (true) {
      case currentPinCoordinates <= PIN_CENTER:
        effectLevelPin.style.left = PIN_CENTER + 'px';
        break;
      case currentPinCoordinates >= maxPinPosition:
        effectLevelPin.style.left = maxPinPosition + 'px';
        break;
      case PIN_CENTER <= currentPinCoordinates <= maxPinPosition:
        effectLevelPin.style.left = currentPinCoordinates + 'px';
        break;
    }

    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
