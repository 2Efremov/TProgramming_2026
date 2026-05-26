import { describe, it, expect } from "vitest";
import { Kitsune } from "../src/tasks/task_5";

describe("Kitsune", () => {
  const kitsune = new Kitsune("Химари", 3, "Лес", 350);

  it("должна создаваться с правильными параметрами", () => {
    expect(kitsune.name).toBe("Химари");
    expect(kitsune.tails).toBe(3);
    expect(kitsune.biome).toBe("Лес");
    expect(kitsune.age).toBe(350);
  });

  it("calculateTailsByAge() должно считать хвосты по возрасту", () => {
    expect(kitsune.calculateTailsByAge()).toBe(3);
  });

  it("canFly() должно определять умение летать (хвостов > 5)", () => {
    expect(kitsune.canFly()).toBe(false);
  });

  it("moveToBiome() должно менять биом", () => {
    kitsune.moveToBiome("Горы");
    expect(kitsune.biome).toBe("Горы");
  });

  it("addTail() должно увеличивать хвосты (макс 9)", () => {
    kitsune.addTail();
    expect(kitsune.tails).toBe(4);
  });
});
