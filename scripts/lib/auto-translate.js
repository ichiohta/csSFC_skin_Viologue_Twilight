"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoTranslate = void 0;
const fs_1 = require("fs");
const resource_helpers_1 = require("./resource-helpers");
const recycling_helpers_1 = require("./recycling-helpers");
const argument_helpers_1 = require("./argument-helpers");
const autoTranslate = (args) => {
    const { inputPath, outputPath, translationMemoryPaths } = args;
    argument_helpers_1.validateFilePath(inputPath, {
        what: "source resource file",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(outputPath, {
        what: "target resource file"
    });
    if (translationMemoryPaths.length === 0) {
        throw new Error(`Need to specify at least one translation memory`);
    }
    const resources = resource_helpers_1.deserializeResources(fs_1.readFileSync(inputPath).toString());
    const translationMemories = translationMemoryPaths.map(path => resource_helpers_1.deserializeTranslationMemory(fs_1.readFileSync(path).toString()));
    const translated = recycling_helpers_1.recycleTranslation(resources, translationMemories);
    fs_1.writeFileSync(outputPath, resource_helpers_1.serializeResources(translated));
};
exports.autoTranslate = autoTranslate;
//# sourceMappingURL=auto-translate.js.map