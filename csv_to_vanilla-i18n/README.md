# CSV to Language JSONs

The script generates language JSON files from CSV or from a Google Sheets worksheet.

For reference, please check `example.csv` and generated language JSON files in `vanilla-i18n`.

## How to use Python script

`csv_to_vanilla_i18n.py` is a "no-dependency" **Python3** script.

NOTE: Python3 should be installed to use the script, follow instructions [here](https://realpython.com/installing-python/) to install it.

To run the script, `python3 csv_to_vanilla_i18n.py [parameters]`.

For parameters in the above line, you have several options:

* You can specify the sheet ID and worksheet name of a Google Sheets worksheet, in that order, separated by a space. (Do NOT enter the entire URL to the Google Sheet.)

* You can specify only the sheet ID and let the worksheet name default to ‘Sheet1’.

* You can specify only the path to a local language CSV file. Be sure to include the .csv extension.

* You can omit the parameters completely. Then you will be prompted for the name of a local language CSV file. Be sure to include the .csv extension.

## How to use NodeJS script

`csv_to_json.js` was built with Javascript and NodeJS's built in modules.

NOTE: NodeJS should be installed to use the script, download it from [here](https://nodejs.org/).

To run the script, `node csv_to_json.js`. After running the script enter `PATH_TO_LANGUAGE_CSV`

## After running the script

The script generates the language JSON files with the filename `LANGUAGE.json`, where "LANGUAGE" is the language which the file represents from the CSV, in directory `vanilla-i18n` in the same folder.

Copy the language files to the desired directory in your website's root folder, recommended is `assets/vanilla-i18n`.
