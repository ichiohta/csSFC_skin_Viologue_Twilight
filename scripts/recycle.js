const fs = require("fs");
const { exit } = require("process");
const at = require("./lib/auto-translate");

const args = process.argv.splice(2);
const targetCulture = args[0];

if (!targetCulture) {
  console.error("Specify target culture");
  exit(-1);
}

const baseCulture = "en-ca";
const rootPath = __dirname.replace(/\\/g, "/").replace(/\/[^\/]+$/, "");
const resourceRootPath = `${rootPath}/resources`;
const inputResourcePath = `${resourceRootPath}/${baseCulture}`;
const outputResourcePath = `${resourceRootPath}/${targetCulture}`;
const translationMemoryPath = `${rootPath}/tm/${targetCulture}.tm`;

if (!fs.existsSync(outputResourcePath)) {
  fs.mkdirSync(outputResourcePath);
}

fs.readdirSync(inputResourcePath)
  .filter((filename) => filename.endsWith("json"))
  .forEach((filename) => {
    const inputPath = `${inputResourcePath}/${filename}`;
    const outputPath = `${outputResourcePath}/${filename}`;
    at.autoTranslate({
      inputPath,
      outputPath,
      translationMemoryPath,
    });
  });
