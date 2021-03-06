"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const process_1 = require("process");
const auto_translate_1 = require("./lib/auto-translate");
const argument_helpers_1 = require("./lib/argument-helpers");
const args = process.argv.splice(2);
const targetCulture = args[0];
if (!targetCulture) {
    console.error("Specify target culture");
    process_1.exit(-1);
}
const baseCulture = "en-ca";
const { resourceRootPath, translationMemoryPath } = argument_helpers_1.getFolderPaths(__dirname);
const inputResourcePath = `${resourceRootPath}/${baseCulture}`;
const outputResourcePath = `${resourceRootPath}/${targetCulture}`;
if (!fs_1.existsSync(outputResourcePath)) {
    fs_1.mkdirSync(outputResourcePath);
}
fs_1.readdirSync(inputResourcePath)
    .filter(filename => filename.endsWith("json"))
    .forEach(filename => {
    const inputPath = `${inputResourcePath}/${filename}`;
    const outputPath = `${outputResourcePath}/${filename}`;
    auto_translate_1.autoTranslate({
        inputPath,
        outputPath,
        translationMemoryPaths: [translationMemoryPath]
    });
});
//# sourceMappingURL=recycle.js.map