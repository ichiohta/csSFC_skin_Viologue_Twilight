"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const localize_file_1 = require("./lib/localize-file");
const file_helpers_1 = require("./lib/file-helpers");
const argument_helpers_1 = require("./lib/argument-helpers");
const args = process.argv.splice(2);
const rootPath = argument_helpers_1.normalizeSeparator(__dirname);
const commonFilePath = `${rootPath}/GUI_USER.common`;
const sourceRootPath = `${rootPath}/sources`;
const buildRootPath = `${rootPath}/build`;
const baseCulture = "en-ca";
const cultures = args.length > 0 ? args : ["xx-zz", "en-us", "ja-jp"];
const baseCultureResourceRootPath = `${rootPath}/resources/${baseCulture}`;
const onError = (_file, reason) => {
    console.error(reason);
};
for (const culture of cultures) {
    const cutlureResourceRootPath = `${rootPath}/resources/${culture}`;
    const cultureBuildRootPath = `${buildRootPath}/${culture}/GUI_USER`;
    // Ensure we delete the existing build
    if (fs_1.existsSync(cultureBuildRootPath)) {
        fs_1.rmdirSync(cultureBuildRootPath, { recursive: true });
    }
    console.log(`Copying common files for ${culture}`);
    file_helpers_1.copyFileSync(commonFilePath, cultureBuildRootPath, onError);
    console.log(`Generating localized files for ${culture}`);
    fs_1.readdirSync(sourceRootPath).forEach(sourceFileName => {
        const outputFileName = sourceFileName.replace(/\.src$/, "");
        const resourceFileName = sourceFileName.replace(/\.src$/, ".json");
        localize_file_1.localizeFile({
            inputPath: `${sourceRootPath}/${sourceFileName}`,
            outputPath: `${cultureBuildRootPath}/${outputFileName}`,
            resourceInputPaths: [
                `${cutlureResourceRootPath}/${resourceFileName}`,
                `${baseCultureResourceRootPath}/${resourceFileName}`
            ]
        });
    });
    console.log(`Copying culture specific files for ${culture}`);
    if (fs_1.existsSync(cutlureResourceRootPath)) {
        fs_1.readdirSync(cutlureResourceRootPath)
            .map(name => `${cutlureResourceRootPath}/${name}`)
            .filter(path => !path.endsWith(".json") && !fs_1.lstatSync(path).isDirectory())
            .map(path => {
            file_helpers_1.copyFileSync(path, cultureBuildRootPath, onError);
        });
    }
}
//# sourceMappingURL=build.js.map