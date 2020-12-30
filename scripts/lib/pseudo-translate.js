"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseudoTranslate = void 0;
const fs_1 = require("fs");
const resource_helpers_1 = require("./resource-helpers");
const argument_helpers_1 = require("./argument-helpers");
const PseudoTranslate = (args) => {
    const { inputPath, outputPath } = args;
    argument_helpers_1.validateFilePath(inputPath, {
        what: "input file path",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(outputPath, {
        what: "output file path"
    });
    try {
        const fileContent = fs_1.readFileSync(inputPath).toString();
        const resources = resource_helpers_1.deserializeResources(fileContent);
        const localized = resource_helpers_1.pseudoLocalize(resources);
        fs_1.writeFileSync(outputPath, resource_helpers_1.serializeResources(localized));
    }
    catch (reason) {
        throw new Error(`Failed to pseudo-translate, due to: ${reason}`);
    }
};
exports.PseudoTranslate = PseudoTranslate;
//# sourceMappingURL=pseudo-translate.js.map