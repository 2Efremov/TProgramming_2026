import { kitsune } from "./kitsune";
import { Logger } from "./Logger";

export class Game {
  private players: kitsune[];
  private logger: Logger;
  private boss: kitsune | null;

  constructor(players: kitsune[], boss: kitsune | null, logger: Logger) {
    this.players = players;
    this.boss = boss;
    this.logger = logger;
  }

  public start(): void {
    if (!this.boss) {
      this.logger.log(`\nБосс не передан. Нет цели для битвы.`);
      return;
    }

    this.logger.log(`\nВсе лисы объединяются против ${this.boss.name}!`);
    this.allVsBoss();
  }

  private allVsBoss(): void {
    if (!this.boss) return;

    let turn = 1;

    this.logger.log(`\n=== Начало битвы ===`);
    this.logger.log(
      `Босс: ${this.boss.name} (HP: ${this.boss.health}, Сила: ${this.boss.strength})`,
    );
    this.logger.log(`Лисы: ${this.players.length} участников`);

    while (this.boss.health > 0 && this.players.length > 0) {
      this.logger.log(`\n--- Ход ${turn} ---`);

      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.health <= 0) continue;
        if (this.boss.health <= 0) break;

        this.logger.log(`${player.name} атакует ${this.boss.name}`);
        player.attack(this.boss, this.logger);
      }

      if (this.boss.health <= 0) {
        this.logger.log(`\n${this.boss.name} повержен!`);
        break;
      }

      const survivors: kitsune[] = [];
      for (const player of this.players) {
        if (player.health <= 0) continue;

        this.logger.log(`${this.boss.name} атакует ${player.name}`);

        const damage = Math.floor(player.health * 0.2);
        player.takeDamage(damage);
        this.logger.log(`${player.name} теряет ${damage} здоровья. Осталось: ${player.health}`);

        if (player.health > 50) {
          survivors.push(player);
        } else {
          this.logger.log(`${player.name} сбегает из боя`);
        }
      }
      this.players = survivors;

      turn++;
    }

    this.logger.log(`\n=== Итог битвы ===`);
    if (this.boss.health <= 0) {
      this.logger.log(`Лисы объединились и победили ${this.boss.name}!`);
      this.logger.log(`Оставшиеся на поле боя лисы: ${this.players.length}`);
      for (const player of this.players) {
        this.logger.log(`- ${player.name} (${player.className}), HP: ${player.health}`);
      }
    } else {
      this.logger.log(`Босс ${this.boss.name} победил всех лис!`);
    }
  }
}
