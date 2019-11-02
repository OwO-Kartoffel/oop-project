//Create the Entity, Wall, Grass, Gold, Dungeon and Tradesman class

/*
Entity class
Example use: not used by itself. 
*/
class Entity {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.src = src;
    this.element.style.position = 'fixed';
  }
  setIMG(src) {
    this.src = src;
  }
}

/*
Wall class. A Wall is an Entity
Example use:
new Wall()
*/
class Wall extends Entity {
  constructor() {
    let src = 'imgs/environment/wall.png';
    super(src);
  }
}

/*
Grass class. Grass is an Entity
Example use:
new Grass()
*/
class Grass extends Entity {
  constructor() {
    super('');
    this.element.src = this.randomGrass(1, 3);
  }
  randomGrass(min, max) {
    let genGrass = Math.floor(Math.random() * max - min + 1 + min);
    return `imgs/environment/grass${genGrass}.png`;
  }
}

/*
Gold class. Gold is an Entity
Example use:
new Gold()
*/
class Gold extends Entity {
  constructor(value) {
    let src = 'imgs/gold.gif';
    super(src);
    this.value = value;
  }
}

/*
Dungeon class. Gold is an Entity
Example use:
new Dungeon(true, false, 30, [new Potion(2), new Bomb(2)]);
*/
class Dungeon extends Entity {
  constructor(isOpen = false, hasPrincess = false, gold = 0, items = []) {
    let src = isOpen ? 'imgs/dungeon/open.png' : 'imgs/dungeon/closed.png'; //ask the other options loot...
    super(src);
    this.isOpen = isOpen;
    this.hasPrincess = hasPrincess;
    this.gold = gold;
    this.items = items;
  }
}

/*
Tradesman class. A Tradesman is an Entitye
- items (Item[])
Example use:
new Tradesman([new Potion(0), new Bomb(0), new Key()]);
*/
class Tradesman extends Entity {
  constructor(items) {
    let src = 'imgs/tradesman.gif';
    super(src);
    this.items = items;
  }
}
