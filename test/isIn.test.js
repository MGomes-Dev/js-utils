const { isIn } = require("../index");

test(`expect isIn(["0", "1", "2"], "0") to be true`, () => {
    const valuesToCompare = ["0", "1", "2"];

    const value = "0";

    expect(isIn(valuesToCompare, value)).toBe(true);
});

test(`expect isIn(["0", "1", "2"], 0) to be false`, () => {
    const valuesToCompare = ["0", "1", "2"];

    const value = 0;

    expect(isIn(valuesToCompare, value)).toBe(false);
});

test(`expect isIn([undefined, null], 0) to be false`, () => {
    const valuesToCompare = [undefined, null];

    const value = 0;

    expect(isIn(valuesToCompare, value)).toBe(false);
});

test(`expect isIn([undefined, null], "") to be false`, () => {
    const valuesToCompare = [undefined, null];

    const value = "";

    expect(isIn(valuesToCompare, value)).toBe(false);
});

test(`expect isIn([undefined, null], undefined) to be true`, () => {
    const valuesToCompare = [undefined, null];

    expect(isIn(valuesToCompare)).toBe(true);
});

test(`expect isIn([], "0") to be false`, () => {
    const valuesToCompare = [];

    const value = "0";

    expect(isIn(valuesToCompare)).toBe(false);
});