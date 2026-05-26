import { kitsune } from "./kitsune";
import { Logger } from "./Logger";

export class Knight extends kitsune {
  public get className(): string {
    return "Рыцарь";
  }

  public useAbility(target: kitsune, logger: Logger): void {
    const bonusDamage = Math.floor(target.health * 0.3);
    const totalDamage = this._strength + bonusDamage;
    target.takeDamage(totalDamage);
    logger.log(
      `(${this.className}) ${this.name} использует (Удар возмездия) и наносит урон ${totalDamage} противнику (${target.className}) ${target.name}`,
    );
  }
}
