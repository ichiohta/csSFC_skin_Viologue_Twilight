"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizeFile = void 0;
const fs_1 = require("fs");
const resource_helpers_1 = require("./resource-helpers");
const argument_helpers_1 = require("./argument-helpers");
const localizeFile = (args) => {
    const { inputPath, outputPath, resourceInputPaths } = args;
    argument_helpers_1.validateFilePath(inputPath, {
        what: "source file path",
        needsExist: true
    });
    argument_helpers_1.validateFilePath(outputPath, {
        what: "ouptut file path"
    });
    if (resourceInputPaths.length === 0) {
        throw new Error("Specify at least one resource file");
    }
    const content = fs_1.readFileSync(inputPath).toString();
    const resourceSets = resourceInputPaths.map(path => resource_helpers_1.deserializeResources(fs_1.readFileSync(path).toString()));
    const output = resource_helpers_1.applyResources(content, ...resourceSets);
    fs_1.writeFileSync(outputPath, Buffer.from(output));
};
exports.localizeFile = localizeFile;
//# sourceMappingURL=localize-file.js.map