'use strict';

(function () {

  var URL_FORM = 'https://js.dump.academy/kekstagram';
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';

  var dataLoading = function (success, error, xhr) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        success(xhr.response);
      } else {
        error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  // отправка данных на сервер

  var save = function (data, onLoad, onError) {
    var xhrForm = new XMLHttpRequest();

    dataLoading(onLoad, onError, xhrForm);

    xhrForm.open('POST', URL_FORM);
    xhrForm.send(data);
  };

  // загрузка данных

  var load = function (onLoad, onError) {
    var xhrData = new XMLHttpRequest();

    dataLoading(onLoad, onError, xhrData);

    xhrData.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhrData.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrData.timeout + 'мс');
    });

    xhrData.timeout = 10000;

    xhrData.open('GET', URL_DATA);
    xhrData.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
