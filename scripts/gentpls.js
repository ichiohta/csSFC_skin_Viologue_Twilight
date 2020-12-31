"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generate_template_1 = require("./lib/generate-template");
const argument_helpers_1 = require("./lib/argument-helpers");
const rootPath = argument_helpers_1.normalizeSeparator(__dirname);
const xmlRootPath = `${rootPath}/GUI_USER.common`;
const outputRootPath = `${rootPath}/src`;
const baseCulture = "en-ca";
const resourceRootPath = `${rootPath}/resources`;
const resourceOutputPath = `${resourceRootPath}/${baseCulture}`;
if (!fs_1.existsSync(resourceOutputPath)) {
    fs_1.mkdirSync(resourceOutputPath);
}
if (!fs_1.existsSync(outputRootPath)) {
    fs_1.mkdirSync(outputRootPath);
}
fs_1.readdirSync(xmlRootPath)
    .filter(filename => filename.endsWith(".xml"))
    .forEach(filename => {
    const inputPath = `${xmlRootPath}/${filename}`;
    const outputPath = `${outputRootPath}/${filename}.src`;
    const resourcesPath = `${resourceOutputPath}/${filename}.json`;
    const patternsPath = `${rootPath}/scripts/resource-names.pattern`;
    generate_template_1.generateTemplate({
        inputPath,
        outputPath,
        resourcesPath,
        patternsPath
    });
});
//# sourceMappingURL=gentpls.js.map