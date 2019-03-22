function errorYandexHandler(errCode) {
  chrome.notifications.create('dhMsg', {
    type : 'basic',
    iconUrl: "../img/icon-small.png",
    title : chrome.i18n.getMessage('error'),
    message : `${chrome.i18n.getMessage('error')} ${errCode}. ${chrome.i18n.getMessage('error_message')} ${chrome.i18n.getMessage('error_messagez')}`

  }, function () {

    setTimeout(function () {
      chrome.notifications.clear("dhMsg");
    }, 5000);
  });

  console.log(errCode);
  if(document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  var errorTable = document.createElement('div');
  errorTable.className = 'error';
  errorTable.innerHTML += `${chrome.i18n.getMessage('error')} ${errCode}. ${chrome.i18n.getMessage('error_message')}`;
  document.getElementById('saveTable').appendChild(errorTable);
  setTimeout(function() {
    errorTable.remove();
  }, 5000);
};

//Очищаем хранилище хрома (api ключа)
function cleared() {
  chrome.storage.sync.remove(["customapikey"]);
  saved_message();
}

  

document.getElementById('reset').onclick = function() {
  chrome.storage.sync.clear();
  document.getElementById('yat__reset').className = 'yat__reset hidden';
  restore_options();
  saved_message();
}

//Очищаем инпут (api ключа)
function clearInput() {
  var b = document.getElementById('customapikey'),
  r = document.getElementById('yat__reset');
  b.addEventListener('keyup', function(e) {
    r.className = this.value ? 'yat__reset' : 'yat__reset hidden';
  });
  r.addEventListener('click', function() {
    b.value = '';
    this.className = 'yat__reset hidden';
    // b.focus();
    save_options();
  });
};
clearInput();

function save_options() {

  var customapikey = document.getElementById('customapikey').value;

  if(customapikey === '') {
    // errCode = "введенных данных";
    // errorYandexHandler(errCode);
    return cleared();
  }

  var params = {
    method: "GET",
    key: customapikey,
    text: 'test'
  };

  var url = "https://translate.yandex.net/api/v1.5/tr.json/detect?key="+ params.key +"&text=" + params.text +"";
  const request = fetch(url);
  const jnStream = request.then(function(response) {
    return response.json();
  })
  jnStream.then(function(data) {
    if(data.code != 200) {
      var errCode = data.code;
      errorYandexHandler(errCode);
    } else {
      console.log('Ошибок нет!')
      if (customapikey !== '') {
        chrome.storage.sync.set({ 
          customapikey: customapikey 
        }, function() {
          saved_message();
        });
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

function save_options_checkboxes() {

  chrome.storage.sync.set({
    b_translator: document.getElementById('b_translator').checked,
  });

  saved_message();

}

function saved_message() {
  var status = document.getElementById('statusSaved');
  status.style.visibility = 'visible';
  setTimeout(function() {
    status.style.visibility = 'hidden';
  }, 750);
}

function restore_options() {
  var manifest = chrome.runtime.getManifest();
  document.getElementById('version').innerHTML = manifest.version;

  chrome.storage.sync.get(['customapikey'], function(data) {
    // console.log(data['customapikey']);
    var b = document.getElementById('customapikey'),
        r = document.getElementById('yat__reset');


    if(data['customapikey'] !== undefined) {
      b.value += data['customapikey'];
    } else {
      b.value = '';
    }

    if(b.value) {
      r.className = 'yat__reset';
    }
  });

  chrome.storage.sync.get({
    b_translator: false,
  }, function(items) {
    document.getElementById('b_translator').checked = items.b_translator;
  });
}

document.addEventListener('DOMContentLoaded', restore_options, initOptions);
var options = document.querySelectorAll('input[type="checkbox"]');
for (var i = 0; i < options.length; i++) {
  options[i].addEventListener('click', save_options_checkboxes);
}


function initOptions() {
  document.getElementById('save').onclick = function(e) {
    e.preventDefault();
  }
  document.getElementById('save').addEventListener('click', save_options, save_options_checkboxes);
}

if (
  document.location.protocol != 'http:' &&
  document.location.protocol != 'https:'
  ) {
  document.addEventListener('DOMContentLoaded', initOptions);
}
