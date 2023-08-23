const languagesBox = document.getElementById("languages-container");
const csvFileInput = document.getElementById("csv-input-file");
const csvURLInput = document.getElementById("input-url");
var inputAlreadyLoaded = false
const reader = new FileReader();
var csvParser;

async function loadFromURL(){
  wipeData();
  if (csvURLInput.value === "") return;
  var csvRequest = await fetch(csvURLInput.value);
  if (csvRequest.status !== 200) {console.error("Couldn't find file!"); return};
  if (csvRequest.headers.get("Content-Type").split(";")[0]!== "text/csv") {console.error("File isn't csv"); return};
  var csvRaw = await csvRequest.text();
  csvParser = new csv2vi18n(csvRaw);
  renderData();
}

reader.addEventListener('load', (event) => {
  wipeData();
  csvParser = new csv2vi18n(event.target.result);
  renderData();
});

function wipeData(){
  languagesBox.style.left = "-200%";
  csvParser = null;
  document.getElementById("languages-box-container").innerHTML = "";
}


csvFileInput.onchange = () => {
  if (csvFileInput.files[0].type !== "text/csv"){
    console.error("File must be csv");
    return;
  }

  reader.readAsText(csvFileInput.files[0]);
  inputAlreadyLoaded = true;
}


function renderData(){
  csvParser.getLanguages().forEach((language) => {
    var lanContainerElement = document.createElement("div");
    lanContainerElement.setAttribute("class", "language-container");
    
    var titleLangElemetn = document.createElement("p");
    titleLangElemetn.setAttribute("class", "language-name");
    titleLangElemetn.innerHTML = language; 

    var buttonLangElemetn = document.createElement("span");
    buttonLangElemetn.setAttribute("class", "language-download-button");
    buttonLangElemetn.setAttribute("onclick", `csvParser.downloadLanguageJson("${language}");`);
    buttonLangElemetn.innerHTML = "📥";

    lanContainerElement.appendChild(titleLangElemetn);
    lanContainerElement.appendChild(buttonLangElemetn);
    document.getElementById("languages-box-container").appendChild(lanContainerElement);
    languagesBox.style.left = "0";
  });
}

if (!inputAlreadyLoaded && csvFileInput.files.length === 1){
  reader.readAsText(csvFileInput.files[0]);
  inputAlreadyLoaded = true
}
