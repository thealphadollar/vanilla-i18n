const fs = require('fs');
const path= ""  // enter your data file path here
const mycsv = fs.readFileSync(path,'utf-8');
console.log(mycsv);

const myjson = csvJSON(mycsv)
console.log(myjson);

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
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

