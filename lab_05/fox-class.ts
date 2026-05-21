const $dataSkills = [
    null,
    { id: 1, name: "Лисьи Огни", description: "Наносит магический урон цели" },
    { id: 2, name: "Очарование", description: "Цель пропускает ход" }
];
class Game_Action {
    private _subject: Game_Actor;
    private _skill: any;

    constructor(subject: Game_Actor, skillId: number) {
        this._subject = subject;
        this._skill = $dataSkills[skillId];
    }

    skill(): any {
        return this._skill;
    }

    subject(): Game_Actor {
        return this._subject;
    }

    execute(): void {
        console.log(`\n${this._subject.name} использует способность: ${this._skill.name}!`);
        console.log(`   Лог боя: ${this._skill.description}`);
    }
}

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

class Game_Actor extends Game_BattlerBase {
    public name: string;

    constructor(name: string) {
        super();
        this.name = name;
        this._strength = 15;
        this._hp = 100;
        this._mp = 100;
    }

    useSkill(skillId: number): Game_Action {
        return new Game_Action(this, skillId);
    }

    showStats(): void {
        console.log(`Имя: ${this.name}`);
        console.log(`HP: ${this._hp}`);
        console.log(`MP: ${this._mp}`);
        console.log(`Сила: ${this.strength}`);
    }
}

const kitsune: Game_Actor = new Game_Actor("Лисица");
kitsune.showStats();
//const action2 = kitsune.useSkill(2);
//action2.execute();
//const action1 = kitsune.useSkill(1);
//action1.execute();
kitsune.useSkill(2).execute();
kitsune.useSkill(1).execute();