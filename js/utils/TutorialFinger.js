import {Assets, Sprite} from "pixi.js";
import {UIManager} from "./UIManager";

export class TutorialFinger {
  constructor(app,x,y,GRID_SIZE_WIDTH,GRID_SIZE_HEIGHT,CELL_SIZE,container, grid) {
    this.GRID_SIZE_HEIGHT = GRID_SIZE_HEIGHT;
    this.GRID_SIZE_WIDTH = GRID_SIZE_WIDTH;
    this.container = container;
    this.cell_size = CELL_SIZE;
    this.grid = grid;
    this.sprite = {};
    this.inactivityTimer = null;
    this.inactivityTime = 5000;
    this.app=app;
    window.addEventListener("pointerdown", ()=>this.resetInactivityTimer());
    window.addEventListener("pointermove", ()=>this.resetInactivityTimer());
    window.addEventListener("keydown", ()=>this.resetInactivityTimer());
    this.createSprite(Assets.cache.get('finger'));

  }

  createSprite(texture) {
    const sprite = Sprite.from(texture);
    sprite.label = 'FINGER';
    sprite.width = this.cell_size * 1.5;
    sprite.height = this.cell_size * 3.5;
    sprite.anchor.set(0.75, 0);
    sprite.position.set(0,0);
    sprite._zIndex = 5;
    sprite.visible = false;
    this.sprite = sprite;
    this.container.addChild(sprite);
    console.log(this.container, this.sprite)
    this.resetInactivityTimer();
  }

  update(){
    this.container.addChild(this.sprite);
  }

  getValidChain() {
    let result = this.findChain();
    if (result) {
      return result;
    } else {
      return this.getValidChain();
    }
  }

  findElementByValueAndType(target, array, targetValue, targetType, x, y ) {
    for (let i = 0; i < this.GRID_SIZE_WIDTH; i++) {
      for (let j = 0; j < this.GRID_SIZE_HEIGHT; j++) {
        if (array[i][j].value === targetValue && array[i][j].type === targetType && array[i][j].x !== x && array[i][j].y) {
          return array[i][j];
        }
      }
    }
    return null;
  }

  findChain(){
    let targetType = null;
    let targetLevel = null
    let randomRow = Math.floor(Math.random() * (this.GRID_SIZE_HEIGHT -  1));
    let randomCol = Math.floor(Math.random() * (this.GRID_SIZE_WIDTH -  1));
    if(this.grid[randomRow][randomCol].sprite) {
      this.sprite.position.set(this.grid[randomRow][randomCol].x, this.grid[randomRow][randomCol].y);
      this.sprite.visible = true;
      targetLevel = this.grid[randomRow][randomCol].value;
      targetType = this.grid[randomRow][randomCol].type;
    }
    return this.findElementByValueAndType(this.grid[randomRow][randomCol],this.grid, targetLevel, targetType, this.grid[randomRow][randomCol].x, this.grid[randomRow][randomCol].y);
  }

  moveFingerToPosition(objectToMove) {
    this.sprite.visible = true;
    let elapsedTime = 0;
    const duration = 2;
    const startX = this.sprite.position.x;
    const startY = this.sprite.position.y;
    this.app.ticker.add((delta) => {
      if (elapsedTime < duration) {
        elapsedTime += delta.deltaTime / 60;
        const t = Math.min(elapsedTime / duration, 1);
        this.sprite.x = startX + (objectToMove.sprite.position.x - startX) * t;
        this.sprite.y = startY + (objectToMove.sprite.position.y - startY) * t;
      }
    });

  }
  resetInactivityTimer() {
    if (this.sprite) {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
        this.sprite.visible = false;
      }
      if(UIManager.retrieveModal()?.visible === false){
        this.inactivityTimer = setTimeout(() => {
          this.moveFingerToPosition(this.getValidChain());
        }, this.inactivityTime);
      }
    }

  }

}
