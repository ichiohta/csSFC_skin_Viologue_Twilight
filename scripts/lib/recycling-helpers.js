"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTranslationMemory = exports.recycleTranslation = void 0;
const recycleTranslation = (sourceResources, translationMemories) => {
    const translated = new Map();
    const findTranslation = (value) => {
        for (const translationMemory of translationMemories) {
            const translation = translationMemory.get(value);
            if (translation !== undefined) {
                return translation;
            }
        }
        return undefined;
    };
    sourceResources.forEach((value, key) => {
        translated.set(key, findTranslation(value) || value);
    });
    return translated;
};
exports.recycleTranslation = recycleTranslation;
const newTranslationMemory = (source, target) => {
    const tm = new Map();
    source.forEach((value, key) => {
        const translation = target.get(key) || value;
        tm.set(key, translation);
    });
    return tm;
};
exports.newTranslationMemory = newTranslationMemory;
//# sourceMappingURL=recycling-helpers.js.map