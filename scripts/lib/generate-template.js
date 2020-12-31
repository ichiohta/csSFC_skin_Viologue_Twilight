"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const resource_helpers_1 = require("./resource-helpers");
const argument_helpers_1 = require("./argument-helpers");
const generateTemplate = (args) => {
    const { inputPath, outputPath, patternsPath, resourcesPath } = args;
    argument_helpers_1.validateFilePath(inputPath, {
        what: "input file path",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(outputPath, {
        what: "output file path"
    });
    argument_helpers_1.validateFilePath(patternsPath, {
        what: "pattern file path",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(resourcesPath, {
        what: "generated resource file path"
    });
    const patterns = fs_1.readFileSync(patternsPath)
        .toString()
        .split("\n")
        .filter(line => line.length > 0);
    const content = fs_1.readFileSync(inputPath).toString();
    const prefix = path_1.basename(inputPath);
    const { output: template, resources } = resource_helpers_1.extractRawText(patterns, content, {
        prefix
    });
    const resourcesText = resource_helpers_1.serializeResources(resources);
    if (resources.size > 0) {
        fs_1.writeFileSync(outputPath, Buffer.from(template));
        fs_1.writeFileSync(resourcesPath, resourcesText);
    }
    return resources.size;
};
exports.generateTemplate = generateTemplate;
//# sourceMappingURL=generate-template.js.map