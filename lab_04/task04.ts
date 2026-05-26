function y(x: number): number {
    return Math.pow(1.35 * x + 0.98, 1 / 3) / Math.pow(Math.log10(x), 2);
}
const xValues: number[] = [2, 3, 5, 10, 20];

console.log();
for (let i = 0; i < xValues.length; i++) {
    const x = xValues[i];
    const result = y(x);
    console.log(`${result}`);
}