import { describe, it, expect } from "vitest";
import { Knight } from "../src/game/Knight";
import { Mage } from "../src/game/Mage";
import { Archer } from "../src/game/Archer";
import { Boss } from "../src/game/Boss";
import { Logger } from "../src/game/Logger";

class DummyLogger extends Logger {
  public log(): void {}
}

describe("Hero Abilities and Effects Unit Tests", () => {
  const logger = new DummyLogger();

  // Имена
  const names = ["Химари", "Юки", "Акари", "Кохаку", "Мияби", "Сакура", "Тсуки", "Кёка"];
  //Химари (陽まり) – солнечный свет
  //Юки(雪) – снег
  //Акари(明かり) – свет, сияние
  //Кохаку(琥珀) – янтарь
  //Мияби(雅) – элегантность
  //Сакура(桜) – цветущая вишня
  //Кёка(鏡花) – зеркальный цветок
  //Тсуки (月луна) — луна
  it("Рыцарь должен наносить дополнительные 30% урона от текущего здоровья противника", () => {
    const knight = new Knight(names[0], 100, 20);
    const mage = new Mage(names[1], 100, 10);

    knight.useAbility(mage, logger);
    expect(mage.health).toBe(50);
  });

  it("Маг должен заставлять цель пропустить ход", () => {
    const mage = new Mage(names[2], 100, 10);
    const archer = new Archer(names[3], 100, 15);

    mage.useAbility(archer, logger);

    expect(archer.consumeSkipTurn()).toBe(true);
    expect(archer.consumeSkipTurn()).toBe(false);
  });

  it("Огненные стрелы Лучника должны наносить 2 урона каждый ход", () => {
    const archer = new Archer(names[4], 100, 15);
    const knight = new Knight(names[5], 100, 20);

    archer.useAbility(knight, logger);
    knight.applyEffects(logger);

    expect(knight.health).toBe(98);
  });

  it("Маг должен иметь иммунитет к доп. урону от ледяных стрел)", () => {
    const archer = new Archer(names[6], 100, 15);
    const mage = new Mage(names[7], 100, 10);

    archer.useIceArrows(mage, logger);
    mage.applyEffects(logger);

    expect(mage.health).toBe(85);
  });

  it("Босс должен иметь правильное имя и характеристики", () => {
    const boss = new Boss("Владыка Тьмы", 250, 35);
    expect(boss.name).toBe("Владыка Тьмы");
    expect(boss.health).toBe(580);
    expect(boss.strength).toBe(20);
    expect(boss.className).toBe("Демон (Босс)");
  });

  it("Босс должен наносить урон", () => {
    const boss = new Boss("Владыка Тьмы", 250, 35);
    const knight = new Knight(names[0], 100, 20);

    const initialHealth = boss.health;
    knight.attack(boss, logger);

    expect(boss.health).toBeLessThan(initialHealth);
  });
});
