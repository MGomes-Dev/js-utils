const compose = (...funcs) => {
    return (...args) => {
        return funcs.reduceRight((arg, func, index, fullArr) => {
            // first call can receive more than one argument
            // subsequent calls can receive only one argument
            return index === fullArr.length - 1 ? func(...arg) : func(arg);
        }, args);
    };
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
    typeOf,
    pipe,
    compose
};
