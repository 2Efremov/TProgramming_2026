import { kitsunebuilder } from "./kitsunebuilder";
import { Boss } from "./Boss";
import { Game } from "./Game";
import { Logger } from "./Logger";

const logger = new Logger();
const players = kitsunebuilder.generateHeroes(4); // 4 игрока (чётное)
const boss = new Boss("Владыка Тьмы", 250, 35);

const game = new Game(players, boss, logger);
game.start();
