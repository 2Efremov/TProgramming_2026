import { kitsune } from "./kitsune";
import { Logger } from "./Logger";

export class Archer extends kitsune {
  private _fireArrowUsed: boolean = false;

  constructor(name: string, health: number, strength: number) {
    super(name, health, strength);
    this._iceArrowsLimit = 8;
  }

  public get className(): string {
    return "Лучник";
  }

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
