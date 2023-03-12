const arrayToMap = (key, funcOrArray, maybeArray) => {
    const [arr, func] = maybeArray ? [maybeArray, funcOrArray] : [funcOrArray];

    return arr.reduce((map, item) => {
        return func ?
            assoc(map, item[key], func(item)) :
            assoc(map, item[key], item);
    }, {});
};

const assoc = (obj, key, value, ...nextKeysValues) => {
    if (obj && key && typeOf(obj) === "object") {
        obj[key] = value;

        return nextKeysValues ?
            assoc(obj, ...nextKeysValues) :
            obj;
    } else {
        return obj;
    }
};

const assocIf = (obj, key, value, ...nextKeysValues) => {
    if (obj && key && typeOf(obj) === "object") {
        if (!isIn([null, undefined], value)) {
            obj[key] = value;
        };

        return nextKeysValues ?
            assoc(obj, ...nextKeysValues) :
            obj;
    } else {
        return obj;
    }
};

const bind = (func, ...args) => {
    return func.bind(func, ...args);
};

const compose = (...funcs) => {
    return (...args) => {
        return funcs.reduceRight((arg, func, index, fullArr) => {
            // first call can receive more than one argument
            // subsequent calls can receive only one argument
            return index === fullArr.length - 1 ? func(...arg) : func(arg);
        }, args);
    };
};

const dissoc = (obj, key, ...nextKeys) => {
    if (obj && key && typeOf(obj) === "object") {
        delete obj.key;

        return nextKeys ?
            dissoc(obj, ...nextKeys) :
            obj;
    } else {
        return obj;
    }
};

const evolve = (transformations, obj) => {
    const transform = (obj, [key, funcOrChildObj]) => {
        if (typeOf(funcOrChildObj) === "function") {
            obj[key] = funcOrChildObj(obj[key]);
        } else {
            transform(obj[key], Object.entries(funcOrChildObj)[0]);
        };

        return obj;
    };

    return Object.entries(transformations).reduce(transform, obj);
};

const invokeAndBypass = (func, value) => {
    func(value);

    return value;
};

const isIn = (valuesToCompare, value) => {
    return valuesToCompare.some(valueToCompare => value === valueToCompare)
};

const filterSelect = (validationFunc, keyNames, obj) => {
    return keyNames.reduce((acc, keyOrkeys) => {
        const [originalKeyOrKeys, newKeyName] = typeOf(keyOrkeys) === "array" ?
            keyOrkeys :
            [keyOrkeys, keyOrkeys];

        const value = get(originalKeyOrKeys, obj);

        if (validationFunc(value)) {
            assoc(acc, newKeyName, value);
        };

        return acc;
    }, {});
};

const get = (keyOrKeys, obj) => {
    if (obj && keyOrKeys && typeOf(obj) === "object") {
        const [key, ...nextKeys] = typeOf(keyOrKeys) === "array" ?
            keyOrKeys :
            [key];

        return nextKeys.length ?
            get(nextKeys, obj) :
            obj[key];
    } else {
        return obj;
    }
};

const merge = (originalObj, objToMerge) => {
    Object.entries(objToMerge).forEach(([key, value]) => {
        const originalValue = originalObj[key];

        const newValueIsObj = typeOf(value) === "object";
        const originalValueIsObj = typeOf(originalValue) === "object";

        if (newValueIsObj && originalValueIsObj) {
            assocDeep(oldValue, value)
        } else {
            originalObj[key] = value;
        }
    });

    return originalObj;
};

const numberTypeOf = (numb) => {
    switch (true) {
        case Number.isNaN(numb):
            return "nan";
        case !Number.isFinite(numb):
            return "infinity";
        default:
            return "number";
    };
};

const objectTypeOf = (obj) => {
    switch (true) {
        case obj === null:
            return "null";
        case Array.isArray(obj):
            return "array";
        case obj instanceof Set:
            return "set";
        case obj instanceof Map:
            return "map";
        case obj instanceof RegExp:
            return "regexp";
        case obj instanceof Date:
            return "date";
        default:
            return "object";
    };
};

const pipe = (...funcs) => {
    return (...args) => {
        return funcs.reduce((arg, func, index) => {
            // first call can receive more than one argument
            // subsequent calls can receive only one argument
            return index === 0 ? func(...arg) : func(arg);
        }, args);
    };
};

const select = (keyNames, obj) => {
    return keyNames.reduce((acc, keyOrkeys) => {
        const [originalKeyOrKeys, newKeyName] = typeOf(keyOrkeys) === "array" ?
            keyOrkeys :
            [keyOrkeys, keyOrkeys];

        const value = get(originalKeyOrKeys, obj);

        assoc(acc, newKeyName, value);

        return acc;
    }, {});
};

const typeOf = (input) => {
    const jsTypeOf = typeof input;

    switch (jsTypeOf) {
        case "string":
        case "boolean":
        case "undefined":
        case "function":
            return jsTypeOf;
        case "number":
            return numberTypeOf(input);
        default:
            return objectTypeOf(input);
    };
};

module.exports = {
    arrayToMap,
    assoc,
    assocIf,
    bind,
    compose,
    dissoc,
    evolve,
    filterSelect,
    get,
    invokeAndBypass,
    isIn,
    merge,
    pipe,
    select,
    typeOf
};
