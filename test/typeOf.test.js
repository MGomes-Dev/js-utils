const { typeOf } = require("../index");

test(`expect typeof "a" to be "string"`, () => {
    expect(typeOf("a")).toBe("string")
});

test(`expect typeof "" to be "string"`, () => {
    expect(typeOf("")).toBe("string")
});

test(`expect typeof true to be "boolean"`, () => {
    expect(typeOf(true)).toBe("boolean")
});

test(`expect typeof false to be "boolean"`, () => {
    expect(typeOf(false)).toBe("boolean")
});

test(`expect typeof undefined to be "undefined"`, () => {
    expect(typeOf(undefined)).toBe("undefined")
});

test(`expect typeof a => a + 1 to be "function"`, () => {
    expect(typeOf(a => a + 1)).toBe("function")
});

test(`expect typeof NaN to be "nan"`, () => {
    expect(typeOf(NaN)).toBe("nan")
});

test(`expect typeof Infinity to be "infinity"`, () => {
    expect(typeOf(Infinity)).toBe("infinity")
});

test(`expect typeof 0 to be "number"`, () => {
    expect(typeOf(0)).toBe("number")
});

test(`expect typeof 1 to be "number"`, () => {
    expect(typeOf(1)).toBe("number")
});

test(`expect typeof null to be "null"`, () => {
    expect(typeOf(null)).toBe("null")
});

test(`expect typeof [] to be "array"`, () => {
    expect(typeOf([])).toBe("array")
});

test(`expect typeof [1] to be "array"`, () => {
    expect(typeOf([1])).toBe("array")
});

test(`expect typeof new Set to be "set"`, () => {
    expect(typeOf(new Set)).toBe("set")
});

test(`expect typeof new Map to be "map"`, () => {
    expect(typeOf(new Map)).toBe("map")
});

test(`expect typeof new RegExp to be "regexp"`, () => {
    expect(typeOf(new RegExp)).toBe("regexp")
});

test(`expect typeof new Date to be "date"`, () => {
    expect(typeOf(new Date)).toBe("date")
});

test(`expect typeof {} to be "object"`, () => {
    expect(typeOf({})).toBe("object")
});

test(`expect typeof {"a": 1} to be "object"`, () => {
    expect(typeOf({"a": 1})).toBe("object")
});
