"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTranslationMemory = exports.deserializeTranslationMemory = exports.newTranslationMemory = exports.recycleTranslation = void 0;
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
        tm.set(value, translation);
    });
    return tm;
};
exports.newTranslationMemory = newTranslationMemory;
const deserializeTranslationMemory = (text) => text
    .toString()
    .split("\n")
    .map(line => {
    const [name, value] = line.split("\t");
    return {
        name,
        value
    };
})
    .reduce((acc, cur) => {
    const { name, value } = cur;
    if (name !== undefined && value !== undefined) {
        acc.set(name, value);
    }
    return acc;
}, new Map());
exports.deserializeTranslationMemory = deserializeTranslationMemory;
const serializeTranslationMemory = (translationMemory) => Array.from(translationMemory.keys())
    .map(key => `${key}\t${translationMemory.get(key) || ""}`)
    .join("\n");
exports.serializeTranslationMemory = serializeTranslationMemory;
//# sourceMappingURL=recycling-helpers.js.map