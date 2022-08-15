const { compose } = require("../index");

test(`expect compose(double, sum)(1, 1) to be 4`, () => {
    const double = (num) => num * 2;
    const sum = (num1, num2) => num1 + num2;

    expect(compose(double, sum)(1, 1)).toBe(4);
});

test(`expect compose(double, double)(1) to be 4`, () => {
    const double = (num) => num * 2;

    expect(compose(double, double)(1, 1)).toBe(4);
});

test(`expect compose(double, destructAndSum)([1, 1]) to be 4`, () => {
    const double = (num) => num * 2;
    const destructAndSum = ([num1, num2]) => num1 + num2;

    expect(compose(double, destructAndSum)([1, 1])).toBe(4);
});

test(`expect compose(double, getAKey)({a: 2}) to be 4`, () => {
    const double = (num) => num * 2;
    const getAKey = (obj) => obj.a;

    expect(compose(double, getAKey)({a: 2})).toBe(4);
});

test(`expect compose(double, return2)({a: 2}) to be 4`, () => {
    const double = (num) => num * 2;
    const return2 = () => 2;

    expect(compose(double, return2)()).toBe(4);
});

test(`expect compose(sum, multiplyBy.bind(this, 2))(1, 1) to be 4`, () => {
    const multiplyBy = (factor, num) => num * factor;
    const sum = (num1, num2) => num1 + num2;

    expect(compose(multiplyBy.bind(this, 2), sum)(1, 1)).toBe(4);
});
