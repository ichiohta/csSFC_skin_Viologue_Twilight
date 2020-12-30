"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoTranslate = void 0;
const fs_1 = require("fs");
const resource_helpers_1 = require("./resource-helpers");
const argument_helpers_1 = require("./argument-helpers");
const autoTranslate = (args) => {
    const { inputPath, outputPath, translationMemoryPath } = args;
    argument_helpers_1.validateFilePath(inputPath, {
        what: "source resource file",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(outputPath, {
        what: "target resource file"
    });
    argument_helpers_1.validateFilePath(translationMemoryPath, {
        what: "translation memory file path",
        needsExist: true
    });
    const resources = resource_helpers_1.deserializeResources(fs_1.readFileSync(inputPath).toString());
    const translationMemory = resource_helpers_1.deserializeTranslationMemory(fs_1.readFileSync(translationMemoryPath).toString());
    const translated = resource_helpers_1.recycleTranslation(resources, translationMemory);
    fs_1.writeFileSync(outputPath, resource_helpers_1.serializeResources(translated));
};
exports.autoTranslate = autoTranslate;
//# sourceMappingURL=auto-translate.js.map