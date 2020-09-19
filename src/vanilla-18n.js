"use strict"

const MSG_LEVELS = ["DEBUG", "INFO", "WARN", "ERROR"];
const DEFAULT_i18n_DATA_ATTR  = "vanilla-i18n";
const DEFAULT_i18n_DIR = "assets/vanilla-i18n";
const DEFAULT_LANG_TOGGLER_ID = "vanilla-i18n-toggler";

class vanilla_i18n {
    constructor(languages, opts) {
        this._languages = languages;
        this._path = this._sanitizePath(opts.path || DEFAULT_i18n_DIR);
        this._debug = opts.debug || false;
        this._i18nDataAttr = opts.i18n_attr_name || DEFAULT_i18n_DATA_ATTR;
        this._localStorageKey = this._generateKeyFromHost();
        this._togglerID = opts.toggler_id || DEFAULT_LANG_TOGGLER_ID;
        if (!opts.default_language) {
            opts.default_language = this._languages[0];
        }
        if (!this._getLanguage() && opts.default_language) {
            this._setSavedLanguage(opts.default_language);
        }
        document.addEventListener("DOMContentLoaded", () => { 
            this._attachOnChangeToi18nToggler(this._togglerID)
        });
    }

    async run() {
        const lang = this._getLanguage();
        if (lang && !this._languages.includes(lang)) {
            this._printMsg(`unsupported ${lang} language found in local storage, supported languages are ${this._languages}`, MSG_LEVELS[3]);
            return;
        } else if (!lang) {
            this._printMsg(`no set language found, default language will be used`, MSG_LEVELS[2]);
            return;
        } else {
            document.addEventListener("DOMContentLoaded", () => { 
                this._setTogglerValue(lang, this._togglerID);
            });
        }

        const langTranslations = await this._loadLangFile(lang);
        if (!langTranslations) {
            this._printMsg(`failed to load translation file for ${lang}`, MSG_LEVELS[3]);
            return;
        }

        const elemsForTranslation = this._getElementsForTranslation();
        if (!elemsForTranslation) {
            this._printMsg(`no element found for translating`, MSG_LEVELS[2]);
            return;
        }
        
        this._translate(elemsForTranslation, langTranslations);
        
        this._printMsg(`translation to ${lang} finished for ${elemsForTranslation.length} elements`, MSG_LEVELS[0]);
    }

    _runOnChange(selectedLang) {
        if (!this._languages.includes(selectedLang)) {
            this._printMsg(`${selectedLang} is not supported, supported languages are ${this._languages}`, MSG_LEVELS[3]);
            return;
        }

        const curLang = this._getLanguage();
        if (selectedLang != curLang) {
            this._printMsg(`switching to ${selectedLang} from ${curLang}`, MSG_LEVELS[1]);
            this._setSavedLanguage(selectedLang);
            this.run();
        } else {
            this._printMsg(`selected language is same as current language`, MSG_LEVELS[0]);
        }
    }

    _attachOnChangeToi18nToggler(toggler_id) {
        const langToggler = document.getElementById(toggler_id);
        if (langToggler) {
            langToggler.addEventListener('change', (event) => {
                this._runOnChange(event.target.value);
            });
        } else {
            this._printMsg(`no language toggler found with id "${toggler_id}" for attaching onChange event`, MSG_LEVELS[2]);
        }
    }

    _setTogglerValue(lang, toggler_id) {
        const langToggler = document.getElementById(toggler_id);
        if (langToggler) {
            langToggler.value = lang;
            langToggler.dispatchEvent(new Event('change'));
        } else {
            this._printMsg(`no language toggler found with id "${toggler_id}" for setting value`, MSG_LEVELS[2]);
        }
    }

    // translate all the elements with set i18n data attribute
    _translate(elements, translation=undefined) {
        if (!translation) return;

        elements.forEach((element) => {
            var keys = element.getAttribute(this._i18nDataAttr).split(".");
            var text = keys.reduce((obj, i) => obj[i], translation);
            if (text) {
                element.innerHTML = text;
            }
        });
    }

    _getElementsForTranslation() {
        return document.querySelectorAll("["+this._i18nDataAttr+"]");
    }

    // load language file from the server
    async _loadLangFile(lang=undefined) {
        if (!lang) return;
        const pathToLangFile = `/${this._path}/${lang}.json`;
        try {
            var res = await fetch(pathToLangFile);
            return res.json();
        } catch {(error) => {
            this._printMsg(error.message, MSG_LEVELS[0]);
            return ;
        }}
    }
    
    _getLanguage() {
        var lang = this._getSavedLanguage();
        if (!lang) {
            this._printMsg("no saved language found, default language will load", MSG_LEVELS[0]);
        }
        return lang;
    }

    // get language from local storage
    _getSavedLanguage() {
        return window.localStorage.getItem(this._localStorageKey);
    }

    // set language to local storage
    _setSavedLanguage(lang) {
        if (!lang) return;
        window.localStorage.setItem(this._localStorageKey, lang);
    }
    
    // generate key for storing language in local storage
    _generateKeyFromHost() {
        return window.location.host + "-vanilla-i18n";
    }

    _sanitizePath(path) {
        path = path.trim();
        if (path[0] === '/') {
            path = path.slice(1, path.length);
        }
        if (path[path.length-1] === '/') {
            path = path.slice(0,-1);
        }
        return path;
    }

    // print messages to console
    _printMsg(msg, level) {
        if (!(level === MSG_LEVELS[0]) || this._debug) {
            console.info("vanilla-i18n | " + level + ":" + msg);
        }
    }
}
