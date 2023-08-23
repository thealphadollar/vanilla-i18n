# CSV to Language JSON

The script generates language JSON files from CSV or a Google Sheets worksheet.

For reference, please check `example.csv` and generated language JSON files in `vanilla-i18n`.

## How to use Python script

`csv_to_vanilla_i18n.py` is a "single-dependency" **Python3** script. It only requires the installation of requests, `pip3 install requests`.

NOTE: Python3 should be installed to use the script, follow the instructions [here](https://realpython.com/installing-python/) to install it.

To run the script, `python3 csv_to_vanilla_i18n.py [parameters]`.

For parameters in the above line, you have several options:

* You can specify the sheet ID and worksheet name of a Google Sheets worksheet, in that order, separated by a space. Eg. `python3 csv_to_vanilla_i18n.py 1KfPLetq4VUvEApiGtWEUuQUhAYCrocyLmyiHV2cl_ks Sheet1`

* You can specify only the sheet ID and let the worksheet name default to ‘Sheet1’. Eg. `python3 csv_to_vanilla_i18n.py 1KfPLetq4VUvEApiGtWEUuQUhAYCrocyLmyiHV2cl_ks`

* You can specify only the path to a local language CSV file. Be sure to include the .csv extension. Eg. `python3 csv_to_vanilla_i18n.py /path/to/csv`

* You can omit the parameters completely. Then you will be prompted for the name of a local language CSV file. Be sure to include the .csv extension. Eg. `python3 csv_to_vanilla_i18n.py`

* In case the CSV (this option is not available when using Google Sheets, as they only allow "," in CSV exports) has text that includes ",", specify any of the "|/:;-" as delimiters as the last parameter. For example, `python3 csv_to_vanilla_i18n.py /path/to/csv "|"` or `python3 csv_to_vanilla_i18n.py ":"`

## How to use NodeJS script

`csv_to_json.js` was built with Javascript and NodeJS's built-in modules.

NOTE: NodeJS should be installed to use the script, download it from [here](https://nodejs.org/).

To run the script, `node csv_to_json.js`. After running the script enter `PATH_TO_LANGUAGE_CSV`

## How to use Browser script

If you only want to convert your CSV file into Vanilla-i18n file format you should check [our web here](https://thealphadollar.me/vanilla-i18n/). 

The Browser runnable version are in `browser/csv_to_vanilla_i18n.browser.js`, you can use the min version too. To implement this script in your web you will need to import [`JSZip`](https://github.com/Stuk/jszip), [`JQuey`](https://jquery.com/download/) and [`jquery-csv`](https://github.com/evanplaice/jquery-csv). So your head tag should be like this:

```html
<script src="js/jquery.min.js"></script>
<script src="js/jquery.csv.min.js"></script>
<script src="js/jszip.min.js"></script>
<script src="js/csv_to_vanilla_i18n.browser.min.js"></script> <!-- This needs to be after the other ones. -->
```

The usage of this script is very easy:

```javascript
const csvParser = new csv2vi18n(csv_text_plain, { separator: "," });

csvParser.getLanguages(); // Get an Array with languages name.
csvParser.getLanguageObject("français");  // Get the language Object in vanilla-i18n format.
csvParser.downloadLanguageJson("English");  // Download the language JSON in vanilla-i18n file format.
csvParser.downloadZip();  // Download ZIP with all languages in vanilla-i18n file format.

/*  
File structure of zip file:

  vanilla-i18n
  ├── English.json
  ├── français.json
  └── हिन्दी.json
*/
```

## After running the script

The script generates the language JSON files with the filename `LANGUAGE.json`, where "LANGUAGE" is the language that the file represents from the CSV, in directory `vanilla-i18n` in the same folder.

Copy the language files to the desired directory in your website's root folder, recommended is `assets/vanilla-i18n`.
