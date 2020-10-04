const fs = require('fs');
const prompt = require('prompt-sync')();

let csvPath = '';

if (!csvPath) {
  csvPath = prompt('Enter path to CSV file: ');
  const csvFile = fs.readFileSync(csvPath, 'utf8');
  csvToJSON(csvFile);
}

function csvToJSON(csvFile) {
  const arr = csvFile.split('\n');
  const result = [];
  let obj = {};
  console.log(arr);

  for (let k = 0; k < arr.length - 1; k++) {
    for (let i = 0; i < arr.length; i++) {
      let arrRow = arr[i].split(',').splice(1);
      let header = arr[i].split(',').splice(0, 1);
      let value = arrRow[k];

      // console.log('line ' + line);
      // console.log('header ' + header);

      for (let j = 0; j < header.length; j++) {
        addToDict(obj, header[j], value);
      }

      result.push(obj);
      console.log(JSON.stringify(result));
    }
  }

  // console.log(obj);
  // console.log(JSON.stringify(result));
}

function addToDict(obj, key, value) {
  // console.log(line); // [ 'English', 'हिन्दी', 'española', 'français\r' ]

  // console.log(header) // [ 'form.name' ]
  // console.log(obj); // {'vanilla-i18n-key': 'English',language: 'Language', ... }
  // console.log(key); // form.name
  // console.log(value); // English

  keys = key.split('.');
  // console.log(keys);
  cur_key = keys[0];

  // console.log(keys) // [ 'form', 'name' ]
  // console.log(cur_key) // form

  if (cur_key in keys) {
    if (keys.length === 1) {
      // console.log("ERROR: duplicate key '{}' - keys with nesting cannot have non-nested elements!")
      return 1;
    } else {
      if (!(obj[cur_key] instanceof obj)) {
        // console.log("ERROR: duplicate key '{}' - keys with nesting cannot have non-nested elements!")
        return 1;
      }
      addToDict(obj[cur_key], keys.splice(1).join('.'), value);
    }
  } else {
    if (keys.length === 1) {
      obj[cur_key] = value;
    } else {
      obj[cur_key] = {};
      addToDict(obj[cur_key], keys.splice(1).join('.'), value);
    }
  }
}

function main() {
  // let path = '';
  // if(prompt.length <= 1 && !path){
  //   path = prompt('Enter path to CSV file: ');
  // } else {
  //   path = prompt[1];
  // }
  // var lines = csv.split('\n');
  // var result = [];
  // var headers = lines[0].split(',');
  // for (var i = 1; i < lines.length; i++) {
  //   var obj = {};
  //   var currentline = lines[i].split(',');
  //   for (var j = 0; j < headers.length; j++) {
  //     obj[headers[j]] = currentline[j];
  //   }
  //   result.push(obj);
  // }
  // return JSON.stringify(result);
}
