"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilePath = void 0;
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
//# sourceMappingURL=argument-helpers.js.map