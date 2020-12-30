const fs = require("fs");
const pt = require("./lib/pseudo-translate");

const baseCulture = "en-ca";
const pseudoCulture = "xx-zz";
const rootPath = __dirname.replace(/\\/g, "/").replace(/\/[^\/]+$/, "");
const resourceRootPath = `${rootPath}/resources`;
const inputResourcePath = `${resourceRootPath}/${baseCulture}`;
const outputResourcePath = `${resourceRootPath}/${pseudoCulture}`;

if (!fs.existsSync(outputResourcePath)) {
  fs.mkdirSync(outputResourcePath);
}

fs.readdirSync(inputResourcePath)
  .filter((filename) => filename.endsWith("json"))
  .forEach((filename) => {
    const inputPath = `${inputResourcePath}/${filename}`;
    const outputPath = `${outputResourcePath}/${filename}`;
    pt.PseudoTranslate({
      inputPath,
      outputPath,
    });
  });
