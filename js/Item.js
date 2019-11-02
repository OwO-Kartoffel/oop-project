//Create the Item, Potion, Bomb and Key class

/*
Item class. Item is an Entity
Example use: not used by itself. 
*/

class Item extends Entity {
  constructor(value, rarity, type) {
    let src = `imgs/items/${type.toLowerCase()}.png`;
    super(src);
    this.value = value;
    this.rarity = rarity;
    this.type = type;
  }
}

/*
Potion class. Potion is an Item
Example use:
new Potion(0) // potion rarity 0
*/

class Potion extends Item {
  constructor(rarity) {
    super((rarity + 1) * 10, rarity, 'potion');
  }
  use(target) {
    target.hp += this.value;
    target.hp = Math.min(targer.getMaxHp(), target.hp);
    playSound('potion');
  }
}

/*
Bomb class. Bomb is an Item
Example use:
new Bomb(0) // bomb rarity 0
*/

class Bomb extends Item {
  constructor(rarity) {
    super((rarity + 1) * 20, rarity, 'bomb');
  }
  use(target) {
    target.hp -= this.value;
    target.hp = Math.max(o, target.hp);
    playSound('bomb');
  }
}

/*
Key class. Key is an Item
Example use:
new Key(0) // bomb rarity 0
*/

class Key extends Item {
  constructor() {
    super(100, 3, 'key');
  }
  use(target) {
    playSound('key');
  }
}
