"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureEmptyFolder = exports.ensureNoFolder = exports.ensureFolder = exports.copyFileSync = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const fileExists = (name) => fs_1.existsSync(name);
const isDirectory = (name) => fileExists(name) && fs_1.lstatSync(name).isDirectory();
const endsWithSeparator = (path) => path.endsWith("/") || path.endsWith("\\");
const copyFile = (source, target) => {
    // If target is a directory, create a copy of the source file with the same name
    const actualTarget = isDirectory(target)
        ? path_1.join(target, path_1.basename(source))
        : target;
    fs_1.writeFileSync(actualTarget, fs_1.readFileSync(source));
};
const copyDirectory = (source, target, onError) => {
    // If target is a directory and ends with a separator, copy the source directory under the target with the same name,
    // otherwise copy the content from the source to the target
    const actualTarget = isDirectory(target) && endsWithSeparator(target)
        ? path_1.join(target, path_1.basename(source))
        : target;
    if (!fileExists(actualTarget)) {
        fs_1.mkdirSync(actualTarget, {
            recursive: true
        });
    }
    fs_1.readdirSync(source).forEach(filename => {
        const childSource = path_1.join(source, filename);
        exports.copyFileSync(childSource, `${actualTarget}/`, onError);
    });
};
const copyFileSync = (source, target, onError) => {
    if (!fs_1.existsSync(source)) {
        onError(source, `File or directory does not exist`);
        return;
    }
    try {
        if (isDirectory(source)) {
            copyDirectory(source, target, onError);
        }
        else {
            copyFile(source, target);
        }
    }
    catch (reason) {
        onError(source, `Failed due to: ${JSON.stringify(reason)}`);
    }
};
exports.copyFileSync = copyFileSync;
const ensureFolder = (path) => {
    if (!fs_1.existsSync(path)) {
        fs_1.mkdirSync(path, { recursive: true });
    }
};
exports.ensureFolder = ensureFolder;
const ensureNoFolder = (path) => {
    if (fs_1.existsSync(path)) {
        fs_1.rmdirSync(path, { recursive: true });
    }
};
exports.ensureNoFolder = ensureNoFolder;
const ensureEmptyFolder = (path) => {
    exports.ensureNoFolder(path);
    exports.ensureFolder(path);
};
exports.ensureEmptyFolder = ensureEmptyFolder;
//# sourceMappingURL=file-helpers.js.map