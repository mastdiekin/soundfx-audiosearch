var options = {
  b_translator: false,
};

chrome.storage.sync.get(options, update_menus);
chrome.storage.onChanged.addListener(options_changed);

function options_changed(changes, areaName) {
  for(var opt in changes) {
    options[opt] = changes[opt].newValue;
  }
  update_menus(options);
}

function update_menus(results) {
  options = results;
}


// document.addEventListener('DOMContentLoaded', function() {
//   chrome.notifications.create('dhMsg', {

//     type : 'basic',
//     iconUrl: "../img/icon-large.png",
//     title : chrome.i18n.getMessage('alarm_title'),
//     message : chrome.i18n.getMessage('alarm_disclaimer')

//   }, function () {

//     setTimeout(function () {
//       chrome.notifications.clear("dhMsg");
//     }, 3000);
//   });;

// });


document.addEventListener('DOMContentLoaded', init)

function init() {

  var manifest = chrome.runtime.getManifest();
  document.getElementById('version').innerHTML = manifest.version;
  document.getElementById("searchSubmit").onclick = function(e) {
    e.preventDefault();

    var text = document.getElementById('search__input').value;
    var xKey = document.getElementById('searchSelect').value;

    text = text.trim();

    if(text) {
      if(options.b_translator) {

        chrome.storage.sync.get(function(data) {
         var APIkey = data['customapikey'];

          if(APIkey === undefined) {
            var errCode = "error";
            errorYandexHandler(errCode);
          } else {
            console.log('Ошибки нет!\n', data)
            yaTranslator(APIkey);
          }

        });

      } else {
        x = text;
        createSearch();
      }
    }

    function yaTranslator(APIkey) {
      var params = {
        http: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        method: "GET",
        key: APIkey,
        lang: "ru-en",
        format: "plain",
        text: text,
        options: 1
      };

      var url = ""+ params.http + "?key="+ params.key +"&text=" + params.text +"&lang=" + params.lang + "&format=" + params.format + "&options=" + params.options + "";

      const request = fetch(url);

      const jsonStream = request.then(function(response) {
        return response.json();
      })

      jsonStream.then(function(data) {

        if(data.code != 200) {
          var errCode = data.code;
          errorYandexHandler(errCode);
        } else {
          console.log('Ошибок нет!\n', data)
          x = data.text[0];
          // console.log(data, data.text, data.text[0])
          createSearch();
        }

      })

      .catch(function (error) {
        console.log(error);
      });

    }


    //Както автоматизировать можно?
    function createSearch() {
      x = x.toLowerCase();
      switch(xKey) {
        case site_settings.freesound.value:
          return createSearchFreesound(x);
        case site_settings.findsounds.value:
          return createSearchFindsounds(x);
        case site_settings.audiojungle.value:
          return createSearchAudiojungle(x);
        case site_settings.pond5.value:
          return createSearchPond5(x);
        case site_settings.audioblocks.value:
          return createSearchAudioblocks(x);
        case site_settings.productioncrate.value:
          return createSearchProductioncrate(x);
        case site_settings.videvo.value:
          return createSearchVidevo(x);
        case site_settings.freesfx.value:
          return createSearchFreesfx(x);
      }
    }

  }


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
    errorTable.className = 'error before';
    errorTable.innerHTML += `${chrome.i18n.getMessage('error')} ${errCode}. ${chrome.i18n.getMessage('error_message')} ${chrome.i18n.getMessage('error_messagez')}`;
    document.querySelector('.wrapper').before(errorTable);
    setTimeout(function() {
      errorTable.remove();
    }, 5000);
  };

  
  // chrome.storage.sync.set({
  //   test: site_settings
  // })

  // chrome.storage.sync.get(function(items) {
  //   console.log(items);
  // })

  // chrome.storage.sync.remove(["test"]);



  function createSearchFreesound(x) {
    chrome.tabs.create({url: site_settings.freesound.url + encodeURIComponent(x)});
    window.close();
  }

  function createSearchFindsounds(x) {
    chrome.tabs.create({url: site_settings.findsounds.url + encodeURIComponent(x)});
    window.close();
  }

  function createSearchAudiojungle(x) {
    chrome.tabs.create({url: site_settings.audiojungle.url + encodeURIComponent(x)});
    window.close();
  }
  function createSearchPond5(x) {
    chrome.tabs.create({url: site_settings.pond5.url + encodeURIComponent(x) + site_settings.pond5.queryParams});
    window.close();
  }
  function createSearchAudioblocks(x) {
    chrome.tabs.create({url: site_settings.audioblocks.url + encodeURIComponent(x) + site_settings.audioblocks.queryParams});
    window.close();
  }
  function createSearchProductioncrate(x) {
    chrome.tabs.create({url: site_settings.productioncrate.url + encodeURIComponent(x)});
    window.close();
  }
  function createSearchVidevo(x) {
    chrome.tabs.create({url: site_settings.videvo.url + encodeURIComponent(x) + site_settings.videvo.queryParams});
    window.close();
  }
  function createSearchFreesfx(x) {
    chrome.tabs.create({url: site_settings.freesfx.url + encodeURIComponent(x)});
    window.close();
  }
  
  function sitesOptions() {
    let selector = document.getElementById('searchSelect');
    for(key in site_settings) {
      selector.innerHTML += `<option value="${site_settings[key].value}">${site_settings[key].name}</option>`
    }
    favs(document.getElementById('searchSelect').childNodes[0].text);
    document.getElementById('searchSelect').onchange = function() {
      favs(this.options[this.selectedIndex].text);
    }
  }
  
  function clearInput() {
    var b = document.getElementById('search__input'),
    r = document.getElementById('search__reset');
    b.addEventListener('keyup', function(e) {
      r.className = this.value ? 'search__reset' : 'search__reset hidden';
    });
    r.addEventListener('click', function() {
      b.value = '';
      this.className = 'search__reset hidden';
      b.focus();
    });
  };

  function favs(info) {
    if(document.querySelector('.favs')) {
      document.querySelector('.favs').remove();
    };
    var errorTable = document.createElement('div');
    errorTable.className = 'favs';
    errorTable.innerHTML += `
    <a href="http://${info}" target="_blank" title="${info}"><img src="https://s2.googleusercontent.com/s2/favicons?domain=${info}" alt="${info}" style="width: 16px;height: 16px;"></a>
    `;
    // console.log(info);
    document.getElementById('searchForm').before(errorTable);
  }

  // debugg('test');

  function debugg(info) {
    if(document.querySelector('.debug')) {
      document.querySelector('.debug').remove();
    };
    var errorTable = document.createElement('div');
    errorTable.className = 'debug';
    errorTable.innerHTML += `${info}`;
    console.log(info);
    document.querySelector('.wrapper').before(errorTable);
  }

  clearInput();
  sitesOptions();

}

// function remove_all_menus(callback) {
//   chrome.contextMenus.removeAll(callback);
// }