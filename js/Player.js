//Create the Player class

/*
Player class definition. Player is a Creature
Example use:
new Player('Van', new Position(5, 5), new Board(10, 10), 1, [new Potion(0)]);
*/

class Player extends Creature {
  constructor(name, position, board, level, items, gold = 0) {
    let img = 'imgs/player/front.png';
    super(name, img, level, items, gold);
    this.attackSpeed = 2000 / level;
    this.xp = 0;
    this.position = position;
    this.board = board;
  }
  render(root) {
    root.appendChild(this.element);
    this.element.style.left = `${ENTITY_SIZE * this.position.row}px`;
    this.element.style.top = `${ENTITY_SIZE * this.position.column}px`;
    this.element.style.position = 'absolute';
    this.update();
  }
  update() {
    this.element.style.top = `${ENTITY_SIZE * this.position.column}px`;
    this.element.style.left = `${ENTITY_SIZE * this.position.row}px`;
  }
  moveToPosition(position) {
    if (board.isAWall(position)) return;

    board.popPlayer(this.position);
    board.placeEntity(this, position);
    this.update();
  }
  move(direction) {
    let positionNew = new Position(this.position.row, this.position.column);
    switch (direction) {
      case 'l':
        this.element.src = 'imgs/player/left.png';
        positionNew.row = positionNew.row - 1;
        this.moveToPosition(positionNew);
        break;
      case 'r':
        this.element.src = 'imgs/player/right.png';
        positionNew.row = positionNew.row + 1;
        this.moveToPosition(positionNew);
        break;
      case 'u':
        this.element.src = 'imgs/player/back.png';
        positionNew.column = positionNew.column - 1;
        this.moveToPosition(positionNew);
        break;
      case 'd':
        this.element.src = 'imgs/player/front.png';
        positionNew.column = positionNew.column + 1;
        this.moveToPosition(positionNew);
        break;
      default:
        break;
    }
  }
  pickup(entity) {
    if (entity instanceof Item) {
      this.items = this.items.concat(entity);
      playSound('loot');
    } else if (entity instanceof Gold) {
      this.gold += gold.value;
      playSound('gold');
    }
  }
  attack(entity) {
    if (super.attack(entity)) playSound('pattack');
  }
  buy(item, tradesman) {
    if (this.gold >= item.value) {
      tradesman.gold += item.value;
      this.gold -= item.value;
      this.items = this.items.concat(item);
      remove(tradesman.items, item);
      return true;
    }
    return false;
  }
  sell(item, trademan) {
    this.gold += item.value;
    tradesman.items = tradesman.items.concat(item);
    remove(this.items, item);
    return true;
  }
  useItem(item, target) {
    item.use(target);
    remove(this.items, item);
  }
  loot(entity) {
    this.gold += entity.gold;
    entity.gold = 0;
    this.items = this.items.concat(entity.items);
    entity.items = [];
    playSound('loot');
  }
  getExpToLevel() {
    return this.level * 10;
  }
  getXP(entity) {
    this.xp += entity.level * 10;
    if (this.xp >= this.getExpToLevel()) {
      this.levelUp(entity);
    }
  }
  levelUp(entity) {
    this.level = Math.max(this.level + 1, entity.level);
    this.hp = this.getMaxHp();
    this.strength = this.level * 10;
    this.attackSpeed = 3000 / this.level;
    playSound('levelup');
  }
}
