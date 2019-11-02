//Create the Position and Board class

/*
Position class
Example use:
const position = new Position(0, 0); // row 0, column 0
*/
class Position {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

/*
Board class
Example use:
const board = new Board(20, 20); // Creates a Board object with 20 rows, 20 columns, Wall entities (at the edges) and Grass entities.
*/
class Board {
  constructor(rows, columns) {
    this.rows = [];
    for (let i = 0; i < rows; i++) {
      this.rows[i] = [];
      for (let j = 0; j < columns; j++) {
        if (i === 0 || i === rows - 1 || j === 0 || j === columns - 1) {
          let wall = new Wall();
          wall.position = { row: i, column: j };
          this.rows[i][j] = [wall];
        } else {
          let grass = new Grass();
          grass.position = { row: i, columns: j };
          this.rows[i][j] = [grass];
        }
      }
    }
  }
  render(root) {
    this.root = root;
    this.update();
  }
  update() {
    this.rows.forEach((row, i) => {
      row.forEach((col, j) => {
        let entity = col[col.length - 1];
        entity.element.style.top = `${ENTITY_SIZE * j}px`;
        entity.element.style.left = `${ENTITY_SIZE * i}px`;
        this.root.appendChild(entity.element);
      });
    });
  }
  placeEntity(entity, position) {
    entity.position = position;
    this.rows[position.row][position.column].push(entity);
  }
  getEntity(position) {
    if (this.rows[position.row][position.column].length >= 3) {
      let entity = this.rows[position.row][position.column][
        this.rows[position.row][position.column].length - 2
      ];
      return entity;
    } else {
      let entity = this.rows[position.row][position.column][0];
      return entity;
    }
  }
  deleteEntity(position) {
    let entity = this.getEntity(position);
    entity.position = null;
    this.rows[position.row][position.column].splice(2, 1);
    this.root.removeChild(entity.element);
  }
  popPlayer(position) {
    this.rows[position.row][position.column].pop();
  }
  getMiddleBoard() {
    let x = Math.floor(this.getHeight() / 2);
    let y = Math.floor(this.getWidth() / 2);
    return new Position(x, y);
  }
  getHeight() {
    return this.rows.length;
  }
  getWidth() {
    return this.rows[0].length;
  }
  isPosClear(position) {
    let entity = this.getEntity(position);
    if (entity instanceof Wall || entity instanceof Grass) {
      return true;
    } else {
      return false;
    }
  }
  getRandomPos() {
    let x = getRandom(1, this.getHeight() - 2);
    let y = getRandom(1, this.getWidth() - 2);
    return new Position(x, y);
  }
  isAWall(position) {
    if (
      position.row <= 0 ||
      position.row >= this.getHeight() - 1 ||
      position.column <= 0 ||
      position.column >= this.getWidth() - 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
