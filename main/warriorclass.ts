// БАЗОВЫЙ КЛАСС (родитель)

class Game_BattlerBase {

    protected _hp: number;
    protected _mp: number;
    protected _strength: number;

    constructor() {
        this._hp = 1;
        this._mp = 0;
        this._strength = 10;
    }

    get strength(): number {
        return this._strength;
    }
}

// КЛАСС ПЕРСОНАЖА (наследник)

class Game_Actor extends Game_BattlerBase {
    public name: string;

    constructor(name: string) {
        super();
        this.name = name;
        this._strength = 15;
        this._hp = 100;
        this._mp = 50;
    }

    showStats(): void {
        console.log(`Имя: ${this.name}`);
        console.log(`HP: ${this._hp}`);
        console.log(`MP: ${this._mp}`);
        console.log(`Сила: ${this.strength}`);
    }
}

const warrior: Game_Actor = new Game_Actor("Сэр Троглодит");
warrior.showStats();