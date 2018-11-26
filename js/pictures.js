'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var photoList = document.querySelector('.pictures');

var photoComments = document.querySelector('.social__comments');

var bigPhotoContainer = document.querySelector('.big-picture');

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRangeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    photos[i] = {
      url: 'photos/' + getRangeNumber(1, 25) + '.jpg',
      likes: getRangeNumber(15, 199),
      comments: COMMENTS[getRandomNumber(COMMENTS)],
      description: DESCRIPTION[getRandomNumber(DESCRIPTION)]
    };
  }
  return photos;
};

var photoCollection = getPhotos();

var bigPhotoElement = photoCollection[0];

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

  photoContainer.querySelector('.big-picture__img')
      .querySelector('img')
      .src = photoElement.url;

  photoContainer.querySelector('.social__caption')
      .textContent = photoElement.description;

  photoContainer.querySelector('.likes-count')
      .textContent = photoElement.likes;

  photoContainer.querySelector('.comments-count')
      .textContent = photoElement.comments.length;
};

var renderComment = function () {
  var commentElement = bigPhotoContainer.querySelector('.social__comment').cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRangeNumber(1, 6) + '.svg';
  commentElement.querySelector('.social__text').textContent = bigPhotoElement.comments;

  return commentElement;
};

photoComments.appendChild(renderComment());

photoList.appendChild(getFragment());

getBigPhoto(bigPhotoContainer, bigPhotoElement);

bigPhotoContainer.classList.remove('hidden');
bigPhotoContainer.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPhotoContainer.querySelector('.comments-loader').classList.add('visually-hidden');
