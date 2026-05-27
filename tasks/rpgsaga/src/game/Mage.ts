import { kitsune } from "./kitsune";
import { Logger } from "./Logger";
import { EnchantmentSkill } from "./SkillMechanics";

export class Mage extends kitsune {
  constructor(name: string, health: number, strength: number) {
    super(name, health, strength);
    this.addSkill(new EnchantmentSkill());
  }

  public get className(): string {
    return "Маг";
  }

  public useAbility(target: kitsune, logger: Logger): void {
    target.receiveEnchantment();
    logger.log(
      `(${this.className}) ${this.name} использует (Очарование). (${target.className}) ${target.name} пропустит ход.`,
    );
  }

  public override receiveIceArrow(baseDamage: number): void {
    this.takeDamage(baseDamage);
  }

  public override applyEffects(logger: Logger): void {
    if (this.isDead) return;
    if (this._fireDamage > 0) {
      this.takeDamage(this._fireDamage);
      logger.log(
        `(${this.className}) ${this.name} горит и теряет ${this._fireDamage} здоровья. Осталось: ${this.health}`,
      );
    }
  }
}
