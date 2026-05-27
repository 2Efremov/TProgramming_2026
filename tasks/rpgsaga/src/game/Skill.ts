import { Logger } from "./Logger";
import { kitsune } from "./kitsune";

export abstract class Skill {
  protected _name: string;
  protected _description: string;
  protected _owner: kitsune | null = null;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public setOwner(owner: kitsune): void {
    this._owner = owner;
  }

  public abstract use(target: kitsune | null, logger: Logger): boolean;

  public isAvailable(): boolean {
    return true;
  }
}
