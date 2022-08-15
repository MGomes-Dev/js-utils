const { pipe } = require("../index");

test(`expect pipe(sum, double)(1, 1) to be 4`, () => {
    const sum = (num1, num2) => num1 + num2;
    const double = (num) => num * 2;

    expect(pipe(sum, double)(1, 1)).toBe(4);
});

test(`expect pipe(double, double)(1) to be 4`, () => {
    const double = (num) => num * 2;

    expect(pipe(double, double)(1, 1)).toBe(4);
});

test(`expect pipe(destructAndSum, double)([1, 1]) to be 4`, () => {
    const destructAndSum = ([num1, num2]) => num1 + num2;
    const double = (num) => num * 2;

    expect(pipe(destructAndSum, double)([1, 1])).toBe(4);
});

test(`expect pipe(getAKey, double)({a: 2}) to be 4`, () => {
    const getAKey = (obj) => obj.a;
    const double = (num) => num * 2;

    expect(pipe(getAKey, double)({a: 2})).toBe(4);
});

test(`expect pipe(getAKey, double)({a: 2}) to be 4`, () => {
    const return2 = () => 2;
    const double = (num) => num * 2;

    expect(pipe(return2, double)()).toBe(4);
});

test(`expect pipe(sum, multiplyBy.bind(this, 2))(1, 1) to be 4`, () => {
    const sum = (num1, num2) => num1 + num2;
    const multiplyBy = (factor, num) => num * factor;

    expect(pipe(sum, multiplyBy.bind(this, 2))(1, 1)).toBe(4);
});
