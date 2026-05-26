export class Kitsune {
  name: string; // имя
  tails: number; // количество хвостов (1-9)
  biome: string; // биом: лес, горы, город, поля
  age: number; // возраст

  constructor(name: string, tails: number, biome: string, age: number) {
    this.name = name;
    this.tails = tails;
    this.biome = biome;
    this.age = age;
  }

  printInfo(): void {
    console.log(
      `Кицуне: ${this.name}, Хвостов: ${this.tails}, Биом: ${this.biome}, Возраст: ${this.age} лет`,
    );
  }

  //за каждые 100 лет +1 хвост
  calculateTailsByAge(): number {
    return Math.floor(this.age / 100);
  }

  canFly(): boolean {
    return this.tails > 5;
  }

  //перемещение по биомам
  moveToBiome(newBiome: string): void {
    this.biome = newBiome;
  }

  // добавить хвост (например, после столетия)
  addTail(): void {
    if (this.tails < 9) {
      this.tails++;
      console.log(`${this.name} новый хвост! Теперь хвостов: ${this.tails}`);
    } else {
      console.log(`${this.name} уже достигла максимального количества хвостов (9)`);
    }
  }
}

// создание класса
const kitsune = new Kitsune("Химари", 3, "Лес", 350);

// вывод информации
kitsune.printInfo();

// проверка, хвостов по возрасту
const expectedTails = kitsune.calculateTailsByAge();
console.log(`По возрасту должно быть хвостов: ${expectedTails}`);

// проверка умения летать
if (kitsune.canFly()) {
  console.log(`${kitsune.name} умеет летать!`);
} else {
  console.log(`${kitsune.name} пока не умеет летать`);
}

kitsune.moveToBiome("Горы");
kitsune.printInfo();

kitsune.addTail();
kitsune.printInfo();
