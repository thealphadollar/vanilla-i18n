const fs = require('fs');
const csv = require('csvtojson');
const prompt = require('prompt-sync')();
const csvFile = fs.readFileSync(prompt('Enter path to CSV file: '), 'utf-8');

let result = [];

let languages = csvFile.split('\n').splice(0, 1).join('').split(',').splice(1);
let arr = csvFile.split('\n').splice(1);

for (let k = 0; k < arr.length; k++) {
  result[k] = arr[k].split(',');
}

const transpose = result[0].map((_, colIndex) =>
  result.map((row) => row[colIndex])
);

const csvTransposed = transpose.join('\n');

csv()
  .fromString(csvTransposed)
  .then((jsonObj) => {
    for (let i = 0; i < languages.length; i++) {
      fs.writeFileSync(
        `./${languages[i]}.json`,
        JSON.stringify(jsonObj.splice(0, 1)).replace(/^\[|]$/g, ''),
        'UTF-8'
      );
    }
  });
