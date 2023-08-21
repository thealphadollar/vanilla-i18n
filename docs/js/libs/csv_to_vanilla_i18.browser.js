/**
 * Class to transform a CSV text to Vanilla-i18n json file format.
 * @author IsmaCortGtz - thealphadollar/vanilla-i18n
 * @version 1.0.0
 */
class csv2vi18n {
  // Settings
  #csv
  #separator;

  // Class vars
  #languages = [];
  #matrixData;
  #result;
  #currentLanguage;
  #currentKey;
  #currentDepth;
  #depthArray;
  #tempLanguage;
  #searchResult;
  #downloadElement;
  #zip;
  #zipFolder;

  /**
  * Transform a CSV text to Vanilla-i18n json file format
  * @param {string} csv_text - The CSV data in plain text.
  * @param {Object.<string>} options - { separator: "," } - Cell delimiter to parse CSV.
  */
  constructor(csv_text = "", {separator=","} = {}){
    this.#csv = csv_text;
    this.#separator = separator;
    this.#parseCSV();
  }


  /**
  * Get the languages array of csv.
  * @return {Array.<string>} Language names in CSV header.
  */
  getLanguages() { return this.#languages; }


  /**
  * Get the Language JS Object.
  * @param {string} languageID - The name of language in CSV header.
  * @return {Object} LObject in Vanilla-i18n file format.
  */
  getLanguageObject(languageID){
    if (this.#result.length === 0) return;
    this.#searchResult = this.#result.filter((obj) => obj.lang === languageID);
    return this.#searchResult[0].data;
  }

  /**
  * Download JSON file from language in Vanilla-i18n file format.
  * @param {string} languageID - The name of language in CSV header.
  */
  downloadLanguageJson(languageID){
    if (this.#result.length === 0) return;
    
    this.#downloadElement = document.createElement("a")
    this.#downloadElement.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.getLanguageObject(languageID)))}`);
    this.#downloadElement.setAttribute("download", `${languageID}.json`);
    this.#downloadElement.click();
  }

  /**
  * Download a ZIP file with all languages in Vanilla-i18n file format. The JSON files will be inside a "vanilla-i18n" folder:
  */
  downloadZip(){
    if (JSZip === undefined) { console.error("You need to use JSZip!!"); return}
    this.#zip = new JSZip();
    this.#zipFolder = this.#zip.folder("vanilla-i18n");

    this.#languages.forEach((language) => {
      this.#zipFolder.file(`${language}.json`, JSON.stringify(this.getLanguageObject(language)));
    });

    this.#zip.generateAsync({type:"blob"}).then((content) => {
      this.#downloadElement = document.createElement("a")
      this.#downloadElement.href = URL.createObjectURL(content);;
      this.#downloadElement.setAttribute("download", `vanilla-i18n.zip`);
      this.#downloadElement.click();
    });
  }

  #getLanguage(languageIndex){
    this.#currentLanguage = {};
    this.#matrixData.forEach((row) => {

      this.#currentKey = row[languageIndex];
      if (!row[0].includes(".")) {
        this.#currentLanguage[row[0]] = this.#currentKey;
        return;
      }
  
      this.#currentDepth = this.#currentLanguage;
      this.#depthArray = row[0].split(".");
      this.#depthArray.forEach((depthName, index) => {
        if (this.#currentDepth[depthName] === undefined) this.#currentDepth[depthName] = {};
        if (this.#depthArray.length - 1 !== index) this.#currentDepth = this.#currentDepth[depthName];
        if (this.#depthArray.length - 1 === index) this.#currentDepth[depthName] = this.#currentKey;
      });
    });
    return this.#currentLanguage;
  }

  #parseCSV(){
    this.#result = [];
    this.#matrixData = $.csv.toArrays(this.#csv, {separator: this.#separator}).splice(1);
    this.#languages = $.csv.toArrays(this.#csv, {separator: this.#separator})[0].splice(1);
    
    this.#languages.forEach((language, index) => {
      this.#tempLanguage = {"lang": language};
      this.#tempLanguage["data"] = this.#getLanguage(index + 1);
      this.#result.push(this.#tempLanguage);
    });
  }
}