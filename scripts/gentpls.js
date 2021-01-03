"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generate_template_1 = require("./lib/generate-template");
const argument_helpers_1 = require("./lib/argument-helpers");
const { commonFilePath: xmlRootPath, sourceRootPath: outputRootPath, resourceRootPath } = argument_helpers_1.getFolderPaths(__dirname);
const baseCulture = "en-ca";
const resourceOutputPath = `${resourceRootPath}/${baseCulture}`;
if (!fs_1.existsSync(resourceOutputPath)) {
    fs_1.mkdirSync(resourceOutputPath, { recursive: true });
}
if (!fs_1.existsSync(outputRootPath)) {
    fs_1.mkdirSync(outputRootPath, { recursive: true });
}
fs_1.readdirSync(xmlRootPath)
    .filter(filename => filename.endsWith(".xml"))
    .forEach(filename => {
    const inputPath = `${xmlRootPath}/${filename}`;
    const outputPath = `${outputRootPath}/${filename}.src`;
    const resourcesPath = `${resourceOutputPath}/${filename}.json`;
    const patternsPath = `${__dirname}/resource-names.pattern`;
    generate_template_1.generateTemplate({
        inputPath,
        outputPath,
        resourcesPath,
        patternsPath
    });
});
//# sourceMappingURL=gentpls.js.map