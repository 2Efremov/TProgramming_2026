import { kitsune } from "./kitsune";
import { Logger } from "./Logger";

export class Boss extends kitsune {
  constructor(name: string, health: number, strength: number) {
    super(name, health, strength);
    this._health = 580;
    this._maxHealth = 580;
    this._strength = 20;
  }

  public get className(): string {
    return "Демон (Босс)";
  }

  // Босс не использует специальные способности, только атакует
  public useAbility(target: kitsune, logger: Logger): void {
    this.attack(target, logger);
  }
}
