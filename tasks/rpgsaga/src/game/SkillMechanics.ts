import { Skill } from "./Skill";
import { kitsune } from "./kitsune";
import { Logger } from "./Logger";

export class FireArrowSkill extends Skill {
  private _used: boolean = false;

  constructor() {
    super("Огненная стрела", "Поджигает цель");
  }

  public override use(target: kitsune | null, logger: Logger): boolean {
    if (!target || this._used) return false;

    if (this._owner) {
      this._used = true;
      target.receiveFireArrow();
      logger.log(
        `(${this._owner.className}) ${this._owner.name} использует Огненные стрелы против (${target.className}) ${target.name}!`,
      );
      return true;
    }
    return false;
  }

  public override isAvailable(): boolean {
    return !this._used;
  }
}

export class IceArrowsSkill extends Skill {
  private _limit: number;
  private _used: number = 0;

  constructor(limit: number = 1) {
    super("Ледяные стрелы", "Наносит урон и накладывает обморожение");
    this._limit = limit;
  }

  public override use(target: kitsune | null, logger: Logger): boolean {
    if (!target || this._used >= this._limit) return false;

    if (this._owner) {
      this._used++;
      const damage = this._owner.strength;
      target.receiveIceArrow(damage);
      logger.log(
        `(${this._owner.className}) ${this._owner.name} использует Ледяные стрелы против (${target.className}) ${target.name}!`,
      );
      return true;
    }
    return false;
  }

  public override isAvailable(): boolean {
    return this._used < this._limit;
  }

  public reset(): void {
    this._used = 0;
  }
}

export class EnchantmentSkill extends Skill {
  constructor() {
    super("Очарование", "Заставляет цель пропустить ход");
  }

  public override use(target: kitsune | null, logger: Logger): boolean {
    if (!target) return false;

    if (this._owner) {
      target.receiveEnchantment();
      logger.log(
        `(${this._owner.className}) ${this._owner.name} очаровывает (${target.className}) ${target.name}!`,
      );
      return true;
    }
    return false;
  }
}

export class RetributionStrikeSkill extends Skill {
  constructor() {
    super("Удар возмездия", "Наносит дополнительный урон, равный 30% от здоровья цели");
  }

  public override use(target: kitsune | null, logger: Logger): boolean {
    if (!target || !this._owner) return false;

    const bonusDamage = Math.floor(target.health * 0.3);
    const totalDamage = this._owner.strength + bonusDamage;
    target.takeDamage(totalDamage);
    logger.log(
      `(${this._owner.className}) ${this._owner.name} использует Удар возмездия и наносит урон ${totalDamage} противнику (${target.className}) ${target.name}`,
    );
    return true;
  }
}
