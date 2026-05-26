import { kitsune } from "./kitsune";
import { Knight } from "./Knight";
import { Mage } from "./Mage";
import { Archer } from "./Archer";

export type kitsuneClassType = "Knight" | "Mage" | "Archer";

export class kitsunebuilder {
  private static names = ["Химари", "Юки", "Акари", "Кохаку", "Мияби", "Сакура", "Тсуки", "Кёка"];
  private static classes: kitsuneClassType[] = ["Knight", "Mage", "Archer"];
  //Химари (陽まり) – солнечный свет
  //Юки(雪) – снег
  //Акари(明かり) – свет, сияние
  //Кохаку(琥珀) – янтарь
  //Мияби(雅) – элегантность
  //Сакура(桜) – цветущая вишня
  //Кёка(鏡花) – зеркальный цветок
  //Тсуки (月луна) — луна
  public static createHero(
    heroClass: kitsuneClassType,
    name: string,
    health: number,
    strength: number,
  ): kitsune {
    switch (heroClass) {
      case "Knight":
        return new Knight(name, health, strength);
      case "Mage":
        return new Mage(name, health, strength);
      case "Archer":
        return new Archer(name, health, strength);
      default:
        throw new Error("Неизвестный класс героя");
    }
  }

  public static generateHeroes(count: number): kitsune[] {
    if (count % 2 !== 0) throw new Error("Количество игроков должно быть чётным");

    const heroes: kitsune[] = [];
    for (let i = 0; i < count; i++) {
      const randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];
      const randomName = this.names[Math.floor(Math.random() * this.names.length)] + ` #${i + 1}`;
      // УСИЛЕННЫЕ ПАРАМЕТРЫ
      const randomHealth = Math.floor(Math.random() * 100) + 150; // 150-249 HP
      const randomStrength = Math.floor(Math.random() * 20) + 25; // 20-39 силы

      heroes.push(this.createHero(randomClass, randomName, randomHealth, randomStrength));
    }
    return heroes;
  }
}
