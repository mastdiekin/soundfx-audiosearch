var localeVars = {
  ver                                : chrome.i18n.getMessage('version'),
  search__input                      : chrome.i18n.getMessage('search_input'),
  translatorText                     : chrome.i18n.getMessage('translator_text'),
  headerTitle                        : chrome.i18n.getMessage('header_title'),
  yandexInput                        : chrome.i18n.getMessage('yandex_key_input'),
  statusSaved                        : chrome.i18n.getMessage('status_saved'),
  yandexEnter                        : chrome.i18n.getMessage('enter'),
  yandexEnterText                    : chrome.i18n.getMessage('enter_message'),
  saveBtn                            : chrome.i18n.getMessage('save_button'),
  resetBtn                           : chrome.i18n.getMessage('reset_button'),
  manual                             : chrome.i18n.getMessage('manual'),
};

$('#version__text') .text(localeVars.ver);
$('#search__input') .attr('placeholder', localeVars.search__input);
$('#translatorText') .text(localeVars.translatorText);
$('#translatorText') .text(localeVars.translatorText);
$('#headerTitle') .text(localeVars.headerTitle);
$('#customapikey') .attr('placeholder', localeVars.yandexInput);
$('#statusSaved') .text(localeVars.statusSaved);
$('#yandexEnter') .text(localeVars.yandexEnter);
$('#yandexEnterText') .text(localeVars.yandexEnterText);
$('#save') .text(localeVars.saveBtn);
$('#reset') .text(localeVars.resetBtn);
$('#manual') .text(localeVars.manual);