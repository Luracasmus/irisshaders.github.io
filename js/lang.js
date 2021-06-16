var fileindex = ["index.html", "about.html", "download.html"];
var traductions = ["en", "en_US", "fr"];
var fallbacklang;
var lang;

//Loading the lang
var langData;
function initLang(page) {
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", navigator.language.replace("-", "_"));
  }
  lang = localStorage.getItem("lang");
  if (!traductions.includes(lang)) {
    lang = lang.split("_")[0];
    if (!traductions.includes(lang)) {
      lang = "en";
    }
  }

  fetch("./locales/en.json")
    .then((response) => response.json())
    .then((data) => {
      fallbacklang = data.data;
      fetch("./locales/" + lang + ".json")
        .then((response) => response.json())
        .then((data) => {
          langData = data.data;
          for (var [key, value] of Object.entries(fallbacklang[page])) {
            if (langData[window[key]]) {
              value = langData[window[key]];
            }
            var el = document.querySelector(`[langfield="${key}"]`);
            if (el) {
              document
                .querySelectorAll(`[langfield="${key}"]`)
                .forEach((element) => (element.innerHTML = value));
            }
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
