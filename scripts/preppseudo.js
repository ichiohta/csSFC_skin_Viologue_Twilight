"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const pseudo_translate_1 = require("./lib/pseudo-translate");
const argument_helpers_1 = require("./lib/argument-helpers");
const baseCulture = "en-ca";
const pseudoCulture = "xx-zz";
const rootPath = argument_helpers_1.normalizeSeparator(__dirname);
const resourceRootPath = `${rootPath}/resources`;
const inputResourcePath = `${resourceRootPath}/${baseCulture}`;
const outputResourcePath = `${resourceRootPath}/${pseudoCulture}`;
if (!fs_1.existsSync(outputResourcePath)) {
    fs_1.mkdirSync(outputResourcePath);
}
fs_1.readdirSync(inputResourcePath)
    .filter(filename => filename.endsWith("json"))
    .forEach(filename => {
    const inputPath = `${inputResourcePath}/${filename}`;
    const outputPath = `${outputResourcePath}/${filename}`;
    pseudo_translate_1.pseudoTranslate({
        inputPath,
        outputPath
    });
});
//# sourceMappingURL=preppseudo.js.map