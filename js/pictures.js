'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRangeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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

var photoList = document.querySelector('.pictures');

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < photoCollection.length; j++) {
    fragment.appendChild(renderPhoto(photoCollection[j]));
  }
  return fragment;
};

photoList.appendChild(getFragment());

document.querySelector('.big-picture').classList.remove('hidden');

var bigPhoto = photoCollection[0];

document.querySelector('.big-picture__img')
    .querySelector('img')
    .src = bigPhoto.url;

document.querySelector('.social__caption')
    .textContent = bigPhoto.description;

document.querySelector('.likes-count')
    .textContent = bigPhoto.likes;

document.querySelector('.comments-count')
    .textContent = bigPhoto.comments.length;

var renderComment = function () {
  var commentElement = document.querySelector('.social__comment').cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRangeNumber(1, 6) + '.svg';
  commentElement.querySelector('.social__text').textContent = bigPhoto.comments;

  return commentElement;
};

document.querySelector('.social__comments')
    .appendChild(renderComment());

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
