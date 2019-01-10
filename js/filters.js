'use strict';

(function () {

  var imgFiltersButton = document.querySelectorAll('.img-filters__button');

  var updatePhoto = function (evt) {
    var picture = document.querySelectorAll('.picture');
    picture.forEach(function (item) {
      item.remove();
    });

    var newPhotoCollection = [];

    if (evt.target.id === 'filter-popular') {
      newPhotoCollection = window.photoCollection;
    } else if (evt.target.id === 'filter-new') {
      newPhotoCollection = window.photoCollection.slice(window.utils.getRangeNumber(0, 15)).slice(0, 10);
    } else if (evt.target.id === 'filter-discussed') {
      newPhotoCollection = window.photoCollection.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }

    window.render.createGallery(newPhotoCollection);

    window.utils.photoList.addEventListener('click', function (evnt) {
      window.picture.openBigPhoto(evnt, newPhotoCollection);
    });

    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  };

  var debounceFilters = window.utils.debounce(updatePhoto);

  imgFiltersButton.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      debounceFilters(evt);
    });
  });
})();
