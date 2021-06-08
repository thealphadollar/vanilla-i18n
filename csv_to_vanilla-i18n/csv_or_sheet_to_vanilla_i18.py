#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jun  8 11:04:16 2021

@author: randallwert
"""

import csv
import io
import json
import os
import requests
import sys

OUTPUT_DIR = 'vanilla-i18n'


def add_to_dict(root, key, value):
    keys = key.split('.')
    cur_key = keys[0]
    if cur_key in root.keys():
        if len(keys) == 1:
            print(
                "ERROR: duplicate key '{}' - keys with nesting cannot have non-nested elements!"
                .format(cur_key))
            exit(1)
        else:
            if not isinstance(root[cur_key], dict):
                print(
                    "ERROR: duplicate key '{}' - keys with nesting cannot have non-nested elements!"
                    .format(cur_key))
                exit(1)
            add_to_dict(root[cur_key], '.'.join(keys[1:]), value)
    else:
        if len(keys) == 1:
            root[cur_key] = value
        else:
            root[cur_key] = {}
            add_to_dict(root[cur_key], '.'.join(keys[1:]), value)


def main(path_to_file):
    languages = dict()
    reader = None
    if 'google.com' in path_to_file:
        r = requests.get(path_to_file)
        buff = io.StringIO(r.text)
        reader = csv.DictReader(buff)        
    else:
        f = open(path_to_file, 'r')
        reader = csv.DictReader(f)
    id_field_key = reader.fieldnames[0]
    for language in reader.fieldnames[1:]:
        languages[language] = dict()
    print("DEBUG: Languages found are {}".format(list(languages.keys())))
    for i, row in enumerate(reader):
        for language in languages.keys():
            add_to_dict(languages[language], row[id_field_key],
                        row[language])
    if 'google.com' not in path_to_file:
        f.close()
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for language in languages.keys():
        with open(os.path.join(OUTPUT_DIR, language + '.json'), 'w') as f:
            json.dump(languages[language], f, separators=(',', ':'))
    print("INFO: language json have been output in {}".format(
        os.path.abspath(OUTPUT_DIR)))


if __name__ == "__main__":
    path_to_file = None
    sheet_id = None
    worksheet_name = None
    if len(sys.argv) == 3:
        sheet_id = sys.argv[1]
        worksheet_name = sys.argv[2]
        path_to_file = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(sheet_id, worksheet_name)
    elif len(sys.argv) == 2:
        path_to_file = sys.argv[1]
    elif len(sys.argv) <= 1 and path_to_file is None:
        path_to_file = input("Enter path to CSV file: ")
    main(path_to_file)
