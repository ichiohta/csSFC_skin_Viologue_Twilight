"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recycleTranslation = exports.deserializeTranslationMemory = exports.pseudoLocalize = exports.getPseudoLocaliation = exports.deserializeResources = exports.serializeResources = exports.applyResources = exports.extractRawText = void 0;
const extractRawText = (stringMarkers, input, options) => {
    const { prefix } = options || {};
    const pattern = `(${stringMarkers.join("|")})="([^"]+)"`;
    const regex = RegExp(pattern, "g");
    const resources = new Map();
    const reverseMap = new Map();
    let index = 0;
    const getOrAdd = (value) => {
        const existingKey = reverseMap.get(value);
        if (existingKey !== undefined) {
            return existingKey;
        }
        const key = `${prefix}${(prefix && "/") || ""}RSC_${index++}`;
        resources.set(key, value);
        reverseMap.set(value, key);
        return key;
    };
    const output = input.replace(regex, (_whole, stringMarker, value) => {
        const key = getOrAdd(value);
        return `${stringMarker}="(${key})"`;
    });
    return {
        output,
        resources
    };
};
exports.extractRawText = extractRawText;
const applyResources = (input, ...resourceMaps) => {
    const resourceNames = Array.from(new Set(resourceMaps
        .map(resourceMap => Array.from(resourceMap.keys()))
        .reduce((acc, cur) => acc.concat(cur), [])));
    const findResource = (name) => {
        for (const resourceMap of resourceMaps) {
            const value = resourceMap.get(name);
            if (value) {
                return value;
            }
        }
        return "";
    };
    const pattern = `"\\((${resourceNames.join("|")})\\)"`;
    const regex = RegExp(pattern, "g");
    return input.replace(regex, (_whole, propertyRef) => `"${findResource(propertyRef) || ""}"`);
};
exports.applyResources = applyResources;
const serializeResources = (resources) => {
    const kvps = {};
    for (const key of resources.keys()) {
        const value = resources.get(key) || "";
        kvps[key] = value;
    }
    return JSON.stringify(kvps, null, 1);
};
exports.serializeResources = serializeResources;
const deserializeResources = (text) => {
    try {
        const content = JSON.parse(text);
        const names = Object.keys(content);
        return Array.from(names).reduce((acc, cur) => {
            acc.set(cur, content[cur] || "");
            return acc;
        }, new Map());
    }
    catch (reason) {
        throw new Error(`Unable to deserialize: ${reason}`);
    }
};
exports.deserializeResources = deserializeResources;
const pseudoChars = {
    a: "α",
    e: "ε",
    i: "ι",
    o: "Ω",
    u: "υ"
};
const getPseudoLocaliation = (text) => {
    // If the text is a TTF file name, do not localize it
    if (text.match(/\.ttf$/i)) {
        return text;
    }
    let isVariableName = false;
    return Array.from(text).reduce((acc, cur) => {
        const l = cur.toLowerCase();
        isVariableName = cur === "$" || (isVariableName && "a" <= l && l <= "z");
        const m = isVariableName ? cur : pseudoChars[l] || l;
        return acc + m;
    }, "");
};
exports.getPseudoLocaliation = getPseudoLocaliation;
const pseudoLocalize = (resources) => {
    const localized = new Map();
    for (const key of resources.keys()) {
        const value = resources.get(key) || "";
        localized.set(key, exports.getPseudoLocaliation(value));
    }
    return localized;
};
exports.pseudoLocalize = pseudoLocalize;
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
        acc.set(name.toLowerCase(), value);
    }
    return acc;
}, new Map());
exports.deserializeTranslationMemory = deserializeTranslationMemory;
const recycleTranslation = (sourceResources, translationMemory) => {
    const translated = new Map();
    sourceResources.forEach((value, key) => {
        const tmKey = value.toLowerCase();
        const tmValue = translationMemory.get(tmKey);
        translated.set(key, tmValue || value);
    });
    return translated;
};
exports.recycleTranslation = recycleTranslation;
//# sourceMappingURL=resource-helpers.js.map