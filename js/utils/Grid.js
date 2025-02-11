import {AnimatedSprite, Container, MeshRope, Point, Sprite} from 'pixi.js';
import { Assets } from 'pixi.js';
import {SPRITE_LEVELS} from "./sprite_levels";
import {sound} from "@pixi/sound";
import {UIManager} from "./UIManager";
import gsap from "gsap";



let refToGrid = null;
export class Grid {
  constructor(app, GRID_SIZE_WIDTH, GRID_SIZE_HEIGHT, CELL_SIZE) {
    this.app = app;
    this.gridContainer = new Container();
    this.gridContainer.label = 'GRID CONTAINER';
    this.mainContainer = new Container();
    this.mainContainer.label = 'MAIN CONTAINER';
    this.mainContainer.addChild(this.gridContainer);
    this.app.stage.addChild(this.mainContainer);
    this.grid = [];
    this.GRID_SIZE_WIDTH = GRID_SIZE_WIDTH;
    this.GRID_SIZE_HEIGHT = GRID_SIZE_HEIGHT;
    this.CELL_SIZE = CELL_SIZE;
    this.draggedSprite = null;
    this.startCell = null;
    this.historyX = [];
    this.historyY = [];
    this.historySize = 15;
    this.ropeSize = 100;
    this.points = [];
    this.successes = 0;
    this.gridContainer.sortableChildren = true;
    for (let i = 0; i < this.historySize; i++) {
      this.historyX.push(0);

      this.historyY.push(0);
    }
    for (let i = 0; i < this.ropeSize; i++) {
      this.points.push(new Point(0, 0));
    }
    this.rope = new MeshRope({texture: Assets.cache.get('trail'), points: this.points});
    app.stage.addChild(this.rope);
    this.mouseposition = null;

    this.rope.blendmode = 'add';
    this.ropeTicker = null;
    refToGrid = this;
  }

  retrieveGrid(){
    return this.grid;
  }
  retrieveMain(){
    return this.mainContainer;
  }
  retrieveGridContainer(){
    return this.gridContainer;
  }


   createGrid() {
    this.gridContainer.removeChildren();
    for (let i = 0; i < this.GRID_SIZE_HEIGHT; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.GRID_SIZE_WIDTH; j++) {
        const x = j * this.CELL_SIZE;
        const y = i * this.CELL_SIZE;

        const bcg = Sprite.from(Assets.cache.get('bg'));
        bcg.anchor.set(0.5);
        bcg.width = this.CELL_SIZE;
        bcg.height = this.CELL_SIZE;
        bcg.x = x;
        bcg.y = y;

        this.gridContainer.addChild(bcg);

        const sprite =  this.createRandomSprite(x, y, i * this.GRID_SIZE_WIDTH + j);
        sprite.anchor.set(0.5);
        sprite.width = this.CELL_SIZE * 0.8;
        sprite.height = this.CELL_SIZE * 0.8;
        bcg.addChild(sprite);

        this.grid[i][j] = { background: bcg, sprite, x, y, value: sprite.value, type: sprite.type, finished: sprite.finished  };
      }
    }
  }

   createRandomSprite(x, y, cellIndex) {
    const level = Math.floor(Math.random() * SPRITE_LEVELS.length);
    return this.createSpriteFromLevel(x, y, cellIndex, level);
  }

  createSpriteFromLevel(x, y, cellIndex, level) {
    const spriteData = SPRITE_LEVELS.find(sl => sl.value === level);
    console.log(Assets.cache);
    const sprite = Sprite.from(Assets.cache.get(`${spriteData.code}`));
    sprite.anchor.set(0.5);
    sprite.width = this.CELL_SIZE;
    sprite.height = this.CELL_SIZE;
    sprite.x = x;
    sprite.y = y;
    sprite.value = spriteData.value;
    sprite.type = spriteData.type;
    sprite.index = cellIndex;
    sprite.eventMode = 'static';
    sprite.buttonMode = true;
    sprite.dragging = false;
    sprite.zIndex = 1;
    sprite.finished = spriteData.final ? spriteData.final : false;

    sprite
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove)

    return sprite;
  }

  redrawGrid() {
    this.gridContainer.removeChildren();
    for (let i = 0; i < this.GRID_SIZE_HEIGHT; i++) {
      for (let j = 0; j < this.GRID_SIZE_WIDTH; j++) {
        const elem = this.grid[i][j];
        elem.x = j * this.CELL_SIZE;
        elem.y = i * this.CELL_SIZE;
        elem.background.position.set(j * this.CELL_SIZE, i * this.CELL_SIZE);
        elem.background.width = this.CELL_SIZE * 1.1;
        elem.background.height = this.CELL_SIZE * 1.1;
        this.gridContainer.addChild(elem.background);
        if (elem.sprite) {
          elem.sprite.position.set(j * this.CELL_SIZE, i * this.CELL_SIZE);
          elem.sprite.width = this.CELL_SIZE;
          elem.sprite.height = this.CELL_SIZE;
          this.gridContainer.addChild(elem.sprite);
        }
      }
    }
  }

  updateGrid() {
    this.CELL_SIZE = 20;

    if (window.innerWidth > window.innerHeight) {
      this.GRID_SIZE_WIDTH = 15;
      this.GRID_SIZE_HEIGHT = 15;

    } else {
      this.GRID_SIZE_WIDTH = 10;
      this.GRID_SIZE_HEIGHT = 13;
    }
    this.redrawGrid();
    this.calculateSizes();
  }
  calculateSizes() {
    let availableWidth = window.innerWidth * 0.7;
    let availableHeight = window.innerHeight *0.7;
    this.mainContainer.width = window.innerWidth;
    this.mainContainer.height = window.innerHeight;
    this.gridContainer.width = this.GRID_SIZE_WIDTH * this.CELL_SIZE ;
    this.gridContainer.height = this.GRID_SIZE_HEIGHT * this.CELL_SIZE ;
    this.gridContainer.position.set(
      (window.innerWidth - (this.gridContainer.width + window.innerWidth * 0.15)) / 2,
      (window.innerHeight - (this.gridContainer.height+ window.innerHeight * 0.15)) / 2
    );
    this.gridContainer.pivot.set(this.gridContainer.width / 2, this.gridContainer.height / 2);
    this.gridContainer.position.set(0, 0);
    this.mainContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
    const scaleX = availableWidth / (this.GRID_SIZE_WIDTH * this.CELL_SIZE);
    const scaleY = availableHeight / (this.GRID_SIZE_HEIGHT * this.CELL_SIZE);
    const scale = Math.min(scaleX, scaleY);

    this.mainContainer.scale.set(scale);
    this.mainContainer.position.set(
      window.innerWidth  / 2,
      window.innerHeight/ 2
    );

  }

   addCoins(amount) {
    UIManager.coinsText.text = `${+UIManager.coinsText.text + amount}`;
    UIManager.spawnMoneyEffect(UIManager.progressSprite.x, UIManager.progressSprite.y);
  }

   onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
    this.draggedSprite = this;
    this.startCell = refToGrid.findCellBySprite(this);
    this.zIndex = 2;
     refToGrid.rope.visible = true;
     refToGrid.historyX.fill(event.data.global.x);
     refToGrid.historyY.fill(event.data.global.y);

    if (!refToGrid.ropeTicker) {
      refToGrid.ropeTicker = (delta) => {
        if (!refToGrid.mouseposition) return;
        refToGrid.historyX.pop();
        refToGrid.historyX.unshift(event.data.global.x);
        refToGrid.historyY.pop();
        refToGrid.historyY.unshift(event.data.global.y);

        for (let i = 0; i < refToGrid.ropeSize; i++) {
          const p = refToGrid.points[i];

          const ix = refToGrid.cubicInterpolation(refToGrid.historyX, (i / refToGrid.ropeSize) * refToGrid.historySize);
          const iy = refToGrid.cubicInterpolation(refToGrid.historyY, (i / refToGrid.ropeSize) * refToGrid.historySize);

          p.x = ix;
          p.y = iy;
        }
      };
      sound.play('click');
      refToGrid.app.ticker.add(refToGrid.ropeTicker);
    }

  }
  async restartGame() {
    refToGrid.successes = 0;
    UIManager.winModal.visible = false;
    UIManager.coinsText.text = 0;
    sound.resumeAll();
    // gsap.to(fadeOverlay, { alpha: 1, duration: 0.5, onComplete: () => {
    //     const coins = 0;
    //     UIManager.coinsText.text = coins;
    //     gsap.to(fadeOverlay, { alpha: 0, duration: 0.5 });
    //   }});
    refToGrid.createGrid();
    refToGrid.updateGrid();
    refToGrid.calculateSizes();
  }


   onDragEnd() {
    if (!this.dragging) return;
     refToGrid.rope.visible = false;
    this.dragging = false;
    this.data = null;
    const dropX = this.x;
    const dropY = this.y;
    const {row, col} = refToGrid.getCellIndex(dropY, dropX);
    const targetCell = refToGrid.grid[row][col];
    console.log(targetCell, this.draggedSprite);
    if (targetCell && targetCell.sprite !== this.draggedSprite &&
      targetCell.sprite?.value === this.draggedSprite.value &&
      targetCell.sprite?.type === this.draggedSprite.type && !targetCell.sprite.finished)  {
      const newLevel = targetCell.sprite.value + 1;
      const newSprite = refToGrid.createSpriteFromLevel(
        targetCell.sprite.x,
        targetCell.sprite.y,
        targetCell.index,
        newLevel
      );
      refToGrid.gridContainer.removeChild(targetCell.sprite);
      refToGrid.gridContainer.removeChild(this.draggedSprite);
      refToGrid.grid[row][col].sprite = newSprite;
      refToGrid.grid[row][col].value = newLevel;
      this.startCell.sprite = null;
      sound.play('merge_sound');
      refToGrid.playEffectMerge(refToGrid.grid[row][col].x, refToGrid.grid[row][col].y);
      refToGrid.gridContainer.addChild(newSprite);
      refToGrid.successes  +=1;
      sound.play('coin_add');

      refToGrid.addCoins(25);
      if (refToGrid.successes >=10) {
        UIManager.showWinModal(refToGrid.restartGame);
      }

    } else {
      if (targetCell?.sprite) {
        const temp = {
          texture: this.draggedSprite.texture,
          value: this.draggedSprite.value,
          index: this.draggedSprite.index,
          type: this.draggedSprite.type};
        this.draggedSprite.texture = targetCell.sprite.texture;
        this.draggedSprite.value = targetCell.sprite.value;
        this.draggedSprite.type = targetCell.sprite.type;
        this.draggedSprite.index = targetCell.sprite.index;
        targetCell.sprite.texture = temp.texture;
        targetCell.sprite.value = temp.value;
        targetCell.sprite.index = temp.index;
        targetCell.value = temp.value;
        targetCell.type = temp.type

      }
    }
     this.draggedSprite.x = this.startCell.x;
     this.draggedSprite.y = this.startCell.y;
     this.draggedSprite.zIndex = 1;


     this.draggedSprite = null;
     this.startCell = null;
    if (refToGrid.ropeTicker) {
      refToGrid.app.ticker.remove(refToGrid.ropeTicker);
      refToGrid.ropeTicker = null;
    };

  }

   onDragMove(event) {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(refToGrid.gridContainer);
      this.x = newPosition.x;
      this.y = newPosition.y;
      refToGrid.mouseposition = { x: event.data.global.x, y: event.data.global.y };
      refToGrid.mouseposition.x = event.data.global.x;
      refToGrid.mouseposition.y = event.data.global.y;

    }

  }

   findCellBySprite(sprite) {
    for (let i = 0; i < this.GRID_SIZE_HEIGHT; i++) {
      for (let j = 0; j < this.GRID_SIZE_WIDTH; j++) {
        if (this.grid[i][j].sprite === sprite) {
          return this.grid[i][j];
        }
      }
    }
    return null;
  }
   getCellIndex(x, y) {
    const row = Math.abs(Math.floor((x - this.gridContainer.getLocalBounds().x) / this.CELL_SIZE));
    const col = Math.abs(Math.floor((y - this.gridContainer.getLocalBounds().y) / this.CELL_SIZE));
    return {row, col};
  }
  async playEffectMerge( x, y) {
    const effect = new AnimatedSprite(Assets.cache.get('merge').animations['Merge_FX']);
    effect._zIndex = 3;
    effect.anchor.set(0.5);
    effect.position.set(x, y);
    effect.width = this.CELL_SIZE * 5;
    effect.height = this.CELL_SIZE * 5;
    effect.loop = false;
    effect.label = 'EFFECT';
    effect.animationSpeed = 0.45;
    this.gridContainer.addChild(effect);
    effect.onComplete = () => {
      this.gridContainer.removeChild(effect);
      effect.destroy();
    };

    effect.play();

    return effect;
  }
  clipInput(elem, arr) {
    if (elem < 0) elem = 0;
    if (elem > arr.length - 1) elem = arr.length - 1;

    return arr[elem];
  }

  getTangent(elem, factor, array) {
    return (factor * (this.clipInput(elem + 1, array) - this.clipInput(elem - 1, array))) / 2;
  }

  cubicInterpolation(array, tan, tangentFactor = 1) {
    const k = Math.floor(tan);
    const m = [this.getTangent(k, tangentFactor, array), this.getTangent(k + 1, tangentFactor, array)];
    const p = [this.clipInput(k, array), this.clipInput(k + 1, array)];
    tan -= k;
    const t2 = tan * tan;
    const t3 = tan * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + tan) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
  }


}
