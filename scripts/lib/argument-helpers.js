"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolderPaths = exports.getRootPath = exports.validateFilePath = void 0;
const fs_1 = require("fs");
const validateFilePath = (path, options) => {
    const { needsExist, what } = options;
    if (!path) {
        throw new Error(`Specify ${what}`);
    }
    if (needsExist && !fs_1.existsSync(path)) {
        throw new Error(`Cannot locate '${path}'`);
    }
};
exports.validateFilePath = validateFilePath;
const getRootPath = (path) => path.replace(/\\/g, "/").replace(/\/[^/]+$/, "");
exports.getRootPath = getRootPath;
const getFolderPaths = (dirname) => {
    const rootPath = exports.getRootPath(dirname);
    const resourceRootPath = `${rootPath}/resources`;
    const buildRootPath = `${rootPath}/build`;
    const sourceRootPath = `${rootPath}/sources`;
    const commonFilePath = `${rootPath}/GUI_USER.common`;
    const translationMemoryPath = `${rootPath}/tm`;
    return {
        rootPath,
        resourceRootPath,
        buildRootPath,
        sourceRootPath,
        commonFilePath,
        translationMemoryRootPath: translationMemoryPath
    };
};
exports.getFolderPaths = getFolderPaths;
//# sourceMappingURL=argument-helpers.js.map