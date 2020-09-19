<h1 align="center">Welcome to vanilla-i18n 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/vanilla-i18n" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/vanilla-i18n.svg">
  </a>
  <a href="https://github.com/thealphadollar/vanilla-i18n/blob/master/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/thealphadollar/vanilla-i18n/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/thealphadollar_" target="_blank">
    <img alt="Twitter: thealphadollar_" src="https://img.shields.io/twitter/follow/thealphadollar_.svg?style=social" />
  </a>
  <a href="https://github.com/thealphadollar?tab=followers" target="_blank">
    <img alt="Github: thealphadollar" src="https://img.shields.io/github/followers/thealphadollar.svg?style=social&label=Follow&maxAge=2592000" />
  </a>
</p>

> A super lightweight JS script to provide internationalization to your website using translations from JSON files.

### 🏠 [Homepage](https://github.com/thealphadollar/vanilla-i18n)

## Motivation

This library aims to solve the problem of providing internationalization (translations) to a part or entirety of your website, to certain paragraphs, to words, or to any another granular level desired. There are five simple steps to achieving this: 

1. create a CSV file of translations
2. convert CSV to `vanilla-i18n` language JSONs
3. import the script
4. enclose text (to be translated) in `i18n` tags
5. provide language selection

Voila! Your visitors can now see the content you have translated without any large overhead, delay, or using sophisticated libraries on your side.

> It's plain vanilla ~js~ i18n!

## How To Use

The script is simple to add to your website, and following are the details of each of the required steps.

NOTE: The script does NOT provide translations by itself; the developer is expected to manually (or otherwise) write translations for each of the text for each desired language.

### Create CSV File of Translations

`vanilla-i18n` requires you to have a key and corresponding language mappings of the key. An example CSV is below,

```csv
vanilla-i18n-key,English,हिन्दी,français
language,Language,भाषा,भाषा,Langue
form.name,Name,नाम,Nom
```

Salient features are:

- first row must provide languages following the key entry
- first column must be the key for replacement 
- nested keys are supported, and nesting is depicted by "."
- same key cannot exist in unnested form, for eg. in above CSV, a key `form` should not exist

NOTE: These keys are used later to perform replacement in the HTML, and should be same as the `select` options for choosing language.

### Convert CSV to `vanilla-i18n` Language JSONs

With the provided python script (more details in `csv_to_vanilla-i18n`), convert the CSV to languages JSONs. The filename is based on the first row of the CSV. For eg. for the above CSV, the generated JSON are `English.json`, `हिन्दी.json`, and `français.json`.

Provide these language JSON files in your hosting server, default is inside directory `assets/vanilla-i18n` in the root folder of your website.

### Import The Script

Import the JS in all the HTML pages where the translation is required by including the below snippet right after `<head>` tag.


```javascript
<script src="https://raw.githubusercontent.com/thealphadollar/vanilla-i18n/master/src/vanilla-i18n.min.js"></script>
<script>
  const languages = [
    "English",
    "हिन्दी",
    "français"
  ];
  new vanilla_i18n (
    languages,
    opts = {
      path: "assets/vanilla-i18n",
      debug: false,
      i18n_attr_name: "vanilla-i18n",
      toggler_id: "vanilla-i18n-toggler",
      default_language: languages[0],
    }
  ).run();
</script>
```

The `vanilla-i18n` objects takes the following arguments:

1. `languages`: List of languages same as in the first row of language CSV or the names of the language JSON files without `.json` extension. The above snipper includes list of languages as per the example CSV.
2. `opts`: These are optional arguments:
  1. `path`: Path to the language files relative to the root of the website folder. Default: `assets/vanilla-i18n`.
  2. `debug`: Shows debug information in browser console. Default: `false`.
  3. `i18n_attr_name`: Name of the data attribute storing the key to be used for translation of the enclosed text (more in next section). Default: `vanilla-i18n`.
  4. `toggler_id`: ID of the `select` element for choosing language. Default: `vanilla-i18n-toggler`.
  5. `default_language`: Default language from the languages specified in the `languages` list. Default: `languages[0]`

### Enclose Text In `i18n` tags

Any text, word, paragraph, sentence, etc. that needs to be translated is to be enclosed as follows.

```html
<i18n vanilla-i18n="form.name">Name</i18n>
```

The attribute `vanilla-i18n` points to the key to be matched in the language JSON for replacement.

NOTE: The example above encloses only a word; however, any text (sentence, paragraph, div, span, etc) can be enclosed if proper replacement is provided in each language.

### Provide Language Selection

Provide users language selection via `select` input tag. An example of the same, corresponding to above CSV, is,

```html
<select id="vanilla-i18n-toggler">
  <option>English</option>
  <option>हिन्दी</option>
  <option>français</option>
</select>
```

Following key points should be checked for proper functioning of the script:

- The `id` of the select should be set as `toggler_id` provided in `opts` for `vanilla_i18n` in the `Import The Script` step above.
- if you have an existing language toggler, set it's `id` as the provided `toggler_id`.
- The value of options should be same as the CSV language heading or the language JSON filenames without `.json` extension.

## Author

👤 **Shivam Kumar Jha**

* Website: [thealphadollar.me](https://thealphadollar.me)
* Twitter: [@thealphadollar\_](https://twitter.com/thealphadollar\_)
* Github: [@thealphadollar](https://github.com/thealphadollar)
* LinkedIn: [@thealphadollar](https://linkedin.com/in/thealphadollar)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/thealphadollar/vanilla-i18n/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc). You can also take a look at the [contributing guide](https://github.com/thealphadollar/vanilla-i18n#contributing).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [thealphadollar](https://github.com/thealphadollar).<br />
This project is [MIT](https://github.com/thealphadollar/vanilla-i18n/blob/master/LICENSE) licensed.

The script is inspired from [Building a super small and simple i18n script in JavaScript](https://codeburst.io/translating-your-website-in-pure-javascript-98b9fa4ce427) by [
Andreas Remdt](https://github.com/andreasremdt).

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_