//Create the Creature and Monster class

/*
The Creature class is an Entity.
Example use: not used by itself. 
*/

class Creature extends Entity {
  constructor(name, img, level, items, gold) {
    super(img);
    this.name = name;
    this.img = img;
    this.level = level;
    this.items = items;
    this.gold = gold;
    this.hp = level * 100;
    this.strength = level * 10;
    this.attackSpeed = 3000 / level;
  }
  getMaxHp() {
    return this.level * 100;
  }
  hit(val) {
    this.hp -= val;
    this.hp = Math.max(0, this.hp);
  }
  attack(entity) {
    entity.hp -= this.strength;
    entity.hp = Math.max(0, entity.hp);
    this.attackTimeout = setTimeout(() => {
      this.attackTimeout = null;
      return false;
    }, this.attackSpeed);
    return true;
  }
}

/*
The Monster class is a Creature.
Example use:
new Monster('Anti Fairy', 1, [], 0); // Creates a Monster named Anti Fairy, level 1, no items and 0 gold. Only the name is required.
*/

class Monster extends Creature {
  constructor(name, level = 1, items = [], gold = 0) {
    let nameFile = name.split(' ').join('');
    nameFile = `imgs/monsters/${nameFile}.gif`;
    super(name, nameFile, level, items, gold);
  }
  attack(entity) {
    if (super.attack(entity)) playSound('mattack');
  }
}
