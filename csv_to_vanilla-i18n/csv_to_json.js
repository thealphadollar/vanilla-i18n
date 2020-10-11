const { dir } = require('console');
const fs = require('fs');
var path= ""  // enter your data file path here
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Enter path for the csv file ",(input) => {
    path=input;
const mycsv = fs.readFileSync(__dirname+path,'utf-8');


const myjson = csvJSON(mycsv)
try {
    fs.writeFileSync("./vanilla-i18n/new.json", myjson)
} catch (err) {
    console.error(err)
}
})


function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }

    return JSON.stringify(result[0]); 
  }

