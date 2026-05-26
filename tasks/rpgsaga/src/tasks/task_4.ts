function calculateY(x: number, a: number, b: number): number {
  const numerator = Math.cbrt(a * x + b);
  const denominator = Math.pow(Math.log10(x), 2);

  return numerator / denominator;
}

function TaskA(a: number, b: number, x_start: number, x_end: number, dx: number): string[] {
  const results: string[] = [];

  for (let x = x_start; x <= x_end; x += dx) {
    const y = calculateY(x, a, b);
    results.push(`x = ${x}, y = ${y}`);
  }

  return results;
}

function TaskB(a: number, b: number, x_values: number[]): string[] {
  const results: string[] = [];

  for (let i = 0; i < x_values.length; i = i + 1) {
    const x = x_values[i];
    const y = calculateY(x, a, b);
    results.push(`x${i + 1} = ${x}, y = ${y}`);
  }

  return results;
}

const a_val: number = 1.35;
const b_val: number = 0.98;

console.log("Задача А");
console.log(TaskA(a_val, b_val, 1.14, 4.24, 0.62));

console.log("Задача Б");
console.log(TaskB(a_val, b_val, [0.35, 1.28, 3.51, 5.21, 4.16]));
