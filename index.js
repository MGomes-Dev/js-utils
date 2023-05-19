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

const constantly = (value) => {
    return () => {
        return value;
    }
};

const isIn = (valuesToCompare, value) => {
    return valuesToCompare.some(valueToCompare => value === valueToCompare)
};

const get = (keyOrKeys, obj) => {
    const [key, ...nextKeys] = typeOf(keyOrKeys) === "array" ?
        keyOrKeys :
        [keyOrKeys];

    if (obj && obj[key]) {
        return nextKeys.length ?
            get(nextKeys, obj[key]) :
            obj[key];
    } else {
        return undefined;
    }
};

const assoc = (obj, key, value, ...nextKeysValues) => {
    if (obj) {
        obj[key] = value;

        return nextKeysValues ?
            assoc(obj, ...nextKeysValues) :
            obj;
    } else {
        return obj;
    }
};

const assocIf = (obj, key, value, ...nextKeysValues) => {
    if (obj) {
        if (!isIn([null, undefined], value)) {
            obj[key] = value;
        };

        return nextKeysValues ?
            assocIf(obj, ...nextKeysValues) :
            obj;
    } else {
        return obj;
    }
};

const dissoc = (obj, key, ...nextKeys) => {
    if (obj) {
        delete obj[key];

        return nextKeys ?
            dissoc(obj, ...nextKeys) :
            obj;
    } else {
        return obj;
    }
};

const arrayToMap = (key, funcOrArray, maybeArray) => {
    const [arr, func] = maybeArray ? [maybeArray, funcOrArray] : [funcOrArray];

    return arr.reduce((map, item) => {
        return func ?
            assoc(map, item[key], func(item)) :
            assoc(map, item[key], item);
    }, {});
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

const pipe = (...funcs) => {
    return (...args) => {
        return funcs.reduce((arg, func, index) => {
            // first call can receive more than one argument
            // subsequent calls can receive only one argument
            return index === 0 ? func(...arg) : func(arg);
        }, args);
    };
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

const evolveEach = (selectFunc, transformFunc, itemToTransform) => {
    const arrayTransform = (array, arrayTransformFunc) => {
        return array.map(bind(evolveEach, selectFunc, arrayTransformFunc))
    };

    const objectTransform = (object, objectTransformFunc) => {
        return Object.fromEntries(
            Object.entries(object).map(([key, value]) => {
                return [key, evolveEach(selectFunc, objectTransformFunc, value)];
            })
        )
    };

    switch (typeOf(itemToTransform)) {
        case "object":
            return objectTransform(itemToTransform, transformFunc);

        case "array":
            return arrayTransform(itemToTransform, transformFunc);

        default:
            return selectFunc(itemToTransform) ? transformFunc(itemToTransform) : itemToTransform;
    }
};

const invokeAndBypass = (func, value) => {
    func(value);

    return value;
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

const merge = (originalObj, objToMerge) => {
    Object.entries(objToMerge).forEach(([key, value]) => {
        const originalValue = originalObj[key];

        const newValueIsObj = typeOf(value) === "object";
        const originalValueIsObj = typeOf(originalValue) === "object";

        if (newValueIsObj && originalValueIsObj) {
            merge(originalValue, value)
        } else {
            originalObj[key] = value;
        }
    });

    return originalObj;
};

const invokeInSequence = ([currentPromise, ...nextPromises]) => {
    return nextPromises.length ?
        currentPromise().then((_) => invokeInSequence(nextPromises)) :
        currentPromise();
};

const wrapOnFunction = (func, ...args) => {
    return () => {
        return func(...args)
    }
};

module.exports = {
    arrayToMap,
    assoc,
    assocIf,
    bind,
    compose,
    constantly,
    dissoc,
    evolve,
    evolveEach,
    filterSelect,
    get,
    invokeAndBypass,
    invokeInSequence,
    isIn,
    merge,
    pipe,
    select,
    typeOf,
    wrapOnFunction
};
