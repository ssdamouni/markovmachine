const fs = require("fs");
const markov = require("./app");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    let newMachine = new markov.MarkovMachine(text);
    console.log(newMachine.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function callback(err, text) {
      if (err) {
        console.error(`Problem with path/file: ${path}: ${err}`);
        process.exit(1);
      } else {
        generateText(text);
      }
    });
  
}

async function makeURLText(url) {
    let resp;
  
    try {
      resp = await axios.get(url);
    } catch (err) {
      console.error(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
    generateText(resp.data)
  }
  

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}else if (method === "url") {
    makeURLText(path);
} else {
console.error(`I am not sure what you mean by that: ${method}`);
process.exit(1);
}