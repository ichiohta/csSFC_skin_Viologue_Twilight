const fs = require("fs");
const gt = require("./lib/generate-template");

const rootPath = __dirname.replace(/\\/g, "/").replace(/\/[^\/]+$/, "");
const xmlRootPath = `${rootPath}/GUI_USER.common`;
const outputRootPath = `${rootPath}/src`;
const baseCulture = "en-ca";
const resourceRootPath = `${rootPath}/resources`;
const resourceOutputPath = `${resourceRootPath}/${baseCulture}`;

if (!fs.existsSync(resourceOutputPath)) {
  fs.mkdirSync(resourceOutputPath);
}

if (!fs.existsSync(outputRootPath)) {
  fs.mkdirSync(outputRootPath);
}

fs.readdirSync(xmlRootPath)
  .filter((filename) => filename.endsWith(".xml"))
  .forEach((filename) => {
    const inputPath = `${xmlRootPath}/${filename}`;
    const outputPath = `${outputRootPath}/${filename}.src`;
    const resourcesPath = `${resourceOutputPath}/${filename}.json`;
    const patternsPath = `${rootPath}/scripts/resource-names.pattern`;

    gt.generateTemplate({
      inputPath,
      outputPath,
      resourcesPath,
      patternsPath,
    });
  });
