## CSV to Language JSONs

The script generates language JSON files from CSV.

For reference, please check `example.csv` and generated language JSON files in `vanilla-i18n`.

## How To Use

`csv_to_vanilla_i18n.py` is a "no-dependency" **Python3** script.

NOTE: Python3 should be installed to use the script, follow instructions [here](https://realpython.com/installing-python/) to install it.

To run the script, `python3 csv_to_vanilla_i18n.py PATH_TO_LANGUAGE_CSV`.

The script generates the langauge JSON files with the filename `LANGUAGE.json`, where "LANGUAGE" the language which the file represents from the CSV, in directory `vanilla-i18n` in the same folder.

Copy the language files to the desired directory in your website's root folder, recommended is `assets/vanilla-i18n`.