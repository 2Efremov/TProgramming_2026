import { kitsune } from "./kitsune";
import { Logger } from "./Logger";
import { FireArrowSkill, IceArrowsSkill, EnchantmentSkill } from "./SkillMechanics";

export class Archer extends kitsune {
  private _fireArrowUsed: boolean = false;

  constructor(name: string, health: number, strength: number) {
    super(name, health, strength);
    this._iceArrowsLimit = 8;

    this.addSkill(new FireArrowSkill());
    this.addSkill(new IceArrowsSkill(8));
    this.addSkill(new EnchantmentSkill());
  }

  public get className(): string {
    return "Лучник";
  }

  // Старая логика - костыль для тестов
  public useAbility(target: kitsune, logger: Logger): void {
    if (!this._fireArrowUsed) {
      this._fireArrowUsed = true;
      target.receiveFireArrow();
      logger.log(
        `(${this.className}) ${this.name} использует (Огненные стрелы). (${target.className}) ${target.name} загорается!`,
      );
    } else {
      this.attack(target, logger);
    }
  }
}
