"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_translation_memory_1 = require("./lib/update-translation-memory");
const argument_helpers_1 = require("./lib/argument-helpers");
const file_helpers_1 = require("./lib/file-helpers");
const fs_1 = require("fs");
const args = process.argv.splice(2);
const sourceCulture = "en-ca";
const targetCulture = args[0];
if (!targetCulture) {
    console.error("Specify target culture");
}
const { resourceRootPath, translationMemoryRootPath } = argument_helpers_1.getFolderPaths(__dirname);
const sourceCultureResourceRootPath = `${resourceRootPath}/${sourceCulture}`;
const targetCultureResourceRootPath = `${resourceRootPath}/${targetCulture}`;
const targetCultureTmRootPath = `${translationMemoryRootPath}/${targetCulture}`;
// Ensure the tagret translation memory folder is empty
file_helpers_1.ensureEmptyFolder(targetCultureTmRootPath);
fs_1.readdirSync(sourceCultureResourceRootPath).forEach(name => {
    const sourceInputPath = `${sourceCultureResourceRootPath}/${name}`;
    const targetInputPath = `${targetCultureResourceRootPath}/${name}`;
    const tmFileName = name.replace(/\.json$/, ".tm");
    const outputPath = `${targetCultureTmRootPath}/${tmFileName}`;
    update_translation_memory_1.updateTranslationMemory({
        sourceInputPath,
        targetInputPath,
        outputPath
    });
});
//# sourceMappingURL=updtm.js.map