class csv2vi18n {
  // Settings
  #csv
  #double_quotationmark;
  #lastbeggin_quotationmark;
  #delimiter;
  #breakline;

  // Class vars
  #matrixData;
  #result;
  #currentLanguage;
  #currentKey;
  #currentDepth;
  #depthArray;
  #tempLanguage;
  #cleanedText;
  #qmSplited;
  #searchResult;
  #downloadElement;
  #zip;
  #zipFolder;

  constructor(csv_text = "", {double_quotationmark=true, lastbeggin_quotationmark=true, delimiter=",", breakline="\r\n"} = {}){
    this.#csv = csv_text;
    this.#double_quotationmark = double_quotationmark;
    this.#lastbeggin_quotationmark = lastbeggin_quotationmark;
    this.#delimiter = delimiter;
    this.#breakline = breakline;
    this.#parseCSV();
  }

  getLanguageObject(languageID){
    if (this.#result.length === 0) return;
    this.#searchResult = this.#result.filter((obj) => obj.lang === languageID);
    return this.#searchResult[0].data;
  }

  getSingleLanguageJson(languageID){
    if (this.#result.length === 0) return;
    
    this.#downloadElement = document.createElement("a")
    this.#downloadElement.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.getLanguageObject(languageID)))}`);
    this.#downloadElement.setAttribute("download", `${languageID}.json`);
    this.#downloadElement.click();
  }

  downloadZip(){
    if (JSZip === undefined) { console.error("You need to use JSZip!!"); return}
    this.#zip = new JSZip();
    this.#zipFolder = this.#zip.folder("vanilla-i18n");

    this.languages.forEach((language) => {
      this.#zipFolder.file(`${language}.json`, JSON.stringify(this.getLanguageObject(language)));
    });

    this.#zip.generateAsync({type:"blob"}).then((content) => {
      this.#downloadElement = document.createElement("a")
      this.#downloadElement.href = URL.createObjectURL(content);;
      this.#downloadElement.setAttribute("download", `vanilla-i18n.zip`);
      this.#downloadElement.click();
    });
  }

  #cleanQuotationMarks(text){
    this.#cleanedText = text;
    if (this.#lastbeggin_quotationmark) {
      this.#qmSplited = this.#cleanedText.split("");
      if (this.#qmSplited[0] !== `"` && this.#qmSplited[this.#qmSplited.length - 1] !== `"`) return text;
      this.#cleanedText = this.#qmSplited.splice(1, this.#qmSplited.length - 2).join("");
    }
  
    if (this.#double_quotationmark){
      this.#cleanedText = this.#cleanedText.replaceAll(`""`, `"`);
    }
    
    return this.#cleanedText;
  }

  #getLanguage(languageIndex){
    this.#currentLanguage = {};
    this.#matrixData.forEach((row) => {

      this.#currentKey = row[languageIndex];
      if (!row[0].includes(".")) {
        this.#currentLanguage[row[0]] = this.#cleanQuotationMarks(this.#currentKey);
        return;
      }
  
      this.#currentDepth = this.#currentLanguage;
      this.#depthArray = row[0].split(".");
      this.#depthArray.forEach((depthName, index) => {
        if (this.#currentDepth[depthName] === undefined) this.#currentDepth[depthName] = {};
        if (this.#depthArray.length - 1 !== index) this.#currentDepth = this.#currentDepth[depthName];
        if (this.#depthArray.length - 1 === index) this.#currentDepth[depthName] = this.#cleanQuotationMarks(this.#currentKey);
      });
    });
    return this.#currentLanguage;
  }

  #parseCSV(){
    this.#result = [];
    this.#matrixData = [];

    this.languages = this.#csv
      .split(this.#breakline)[0]
      .split(this.#delimiter)
      .splice(1);
  
    this.#csv
      .split(this.#breakline)
      .splice(1)
      .forEach((row, index) => {
        this.#matrixData[index] = row.split(this.#delimiter);
    });
    
    this.languages.forEach((language, index) => {
      this.#tempLanguage = {"lang": language};
      this.#tempLanguage["data"] = this.#getLanguage(index + 1);
      this.#result.push(this.#tempLanguage);
    });
  }
}