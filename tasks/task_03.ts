function y(x) {
    return Math.pow(1.35 * x + 0.98, 1 / 3) / Math.pow(Math.log10(x), 2);
}

console.log(y(2));
console.log(y(3));
console.log(y(5));
console.log(y(10));
console.log(y(20));