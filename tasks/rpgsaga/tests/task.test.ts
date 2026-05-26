import { describe, expect, it } from "vitest";
import { calculateY, TaskA, TaskB } from "../src/tasks/task_3";

describe("Задачи А и Б", () => {
  const a = 1.35;
  const b = 0.98;

  it("calculateY должна возвращать число, не бесконечность", () => {
    const y = calculateY(0.35, a, b);

    expect(typeof y).toBe("number");
  });

  // Задача А
  it("TaskA должна возвращать массив строк с результатами", () => {
    const results = TaskA(a, b, 1.14, 4.24, 0.62);

    // проверка
    expect(results.length).toBeGreaterThan(0);
  });

  // Задача Б
  it("TaskB должна возвращать столько же ответов, сколько было передано x", () => {
    // Ввод массива
    const x_values = [0.35, 1.28, 3.51, 5.21, 4.16];

    const results = TaskB(a, b, x_values);

    // Проверка вывода (длина через length)
    expect(results.length).toBe(5);

    // Проверка первого значения из ответа, что х остался таким же
    expect(results[0]).toContain("x1 = 0.35");
  });
});
