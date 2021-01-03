"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTranslationMemory = void 0;
const argument_helpers_1 = require("./argument-helpers");
const recycling_helpers_1 = require("./recycling-helpers");
const resource_helpers_1 = require("./resource-helpers");
const fs_1 = require("fs");
const updateTranslationMemory = (args) => {
    const { sourceInputPath, targetInputPath, outputPath } = args;
    argument_helpers_1.validateFilePath(sourceInputPath, {
        what: "source resource file",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(targetInputPath, {
        what: "target resource file",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(outputPath, {
        what: "generated translation memory path"
    });
    const sourceResources = resource_helpers_1.deserializeResources(fs_1.readFileSync(sourceInputPath).toString());
    const targetResources = resource_helpers_1.deserializeResources(fs_1.readFileSync(targetInputPath).toString());
    const translationMemory = recycling_helpers_1.newTranslationMemory(sourceResources, targetResources);
    fs_1.writeFileSync(outputPath, recycling_helpers_1.serializeTranslationMemory(translationMemory));
};
exports.updateTranslationMemory = updateTranslationMemory;
//# sourceMappingURL=update-translation-memory.js.map