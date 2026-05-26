import { kitsune } from "./kitsune";
import { Logger } from "./Logger";

export class Mage extends kitsune {
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
}
