'use strict';

(function () {

  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var getPhotos = function () {
    var photos = [];
    for (var i = 0; i < 25; i++) {
      var numberPhoto = i + 1;
      photos[i] = {
        url: 'photos/' + numberPhoto + '.jpg',
        likes: window.universal.getRangeNumber(15, 199),
        comments: COMMENTS[window.universal.getRandomNumber(COMMENTS)],
        description: DESCRIPTION[window.universal.getRandomNumber(DESCRIPTION)]
      };
    }
    return photos;
  };

  var photoCollection = getPhotos();

  window.data = {
    photoCollection: photoCollection
  };
})();
