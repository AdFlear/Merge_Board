import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  AnimatedSprite,
  MeshRope,
  Point,
  Text,
  BitmapText,
} from "pixi.js";
import gsap from 'gsap';
import { sound } from "@pixi/sound";
import mergeSource from '../assets/img/merge/merge.png';
import finger from '../assets/img/finger.png';
import logo from '../assets/img/ui/logo.png';
import soundBG from '../assets/img/ui/btn_light_large.png';
import soundOn from '../assets/img/ui/sound-on.png';
import bgSource from '../assets/img/ui/bg_grid.png';
import soundOff from '../assets/img/ui/sound-off.png';
import button from '../assets/img/ui/green_button.png';
import progress from '../assets/img/ui/bar_money.png';
import money from '../assets/img/icon_money.png';
import background from '../assets/img/music/bg.mp3';
import merge_sound from '../assets/img/music/merge.wav';
import click from '../assets/img/music/click.wav';
import coin_add from '../assets/img/music/coin_add.wav';
import starSource from '../assets/img/star.png';
// import fontSource from '../assets/img/TobiGreekCyrillic.fnt';
import itemSource_1 from '../assets/img/items/item_1.png';
import itemSource_2 from '../assets/img/items/item_2.png';
import itemSource_3 from '../assets/img/items/item_3.png';
import itemSource_4 from '../assets/img/items/item_4.png';
import itemSource_5 from '../assets/img/items/item_5.png';
import itemSource_6 from '../assets/img/items/item_6.png';
import itemSource_7 from '../assets/img/items/item_7.png';
import itemSource_8 from '../assets/img/items/item_8.png';
import itemSource_9 from '../assets/img/items/item_9.png';
import itemSource_10 from '../assets/img/items/item_10.png';
import itemSource_11 from '../assets/img/items/item_11.png';
import itemSource_12 from '../assets/img/items/item_12.png';
import itemSource_13 from '../assets/img/items/item_13.png';
import itemSource_14 from '../assets/img/items/item_14.png';
import itemSource_15 from '../assets/img/items/item_15.png';
import itemSource_16 from '../assets/img/items/item_16.png';
import itemSource_17 from '../assets/img/items/item_17.png';
import itemSource_18 from '../assets/img/items/item_18.png';
import itemSource_19 from '../assets/img/items/item_19.png';
import itemSource_20 from '../assets/img/items/item_20.png';
import itemSource_21 from '../assets/img/items/item_21.png';
import itemSource_22 from '../assets/img/items/item_22.png';
import itemSource_23 from '../assets/img/items/item_23.png';
import itemSource_24 from '../assets/img/items/item_24.png';
import itemSource_25 from '../assets/img/items/item_25.png';
import itemSource_26 from '../assets/img/items/item_26.png';
import itemSource_27 from '../assets/img/items/item_27.png';
import itemSource_28 from '../assets/img/items/item_28.png';


let sound_assets = [];
let bg = null;
async function  setup () {
  const textureData = await Assets.load(mergeSource);
  await Assets.load({
    alias: 'merge',
    src: '../assets/img/merge/merge.json',
    data: { texture: textureData }
  });
  await Assets.load({alias: 'bg', src: bgSource});
  await Assets.load({alias: 'finger', src: finger});
  await Assets.load({alias: 'button', src:button});
  await Assets.load({alias: 'trail', src: starSource});
  await Assets.load({alias: 'item_1', src: itemSource_1});
  await Assets.load({alias: 'item_2', src: itemSource_2});
  await Assets.load({alias: 'item_3', src: itemSource_3});
  await Assets.load({alias: 'item_4', src: itemSource_4});
  await Assets.load({alias: 'item_5', src: itemSource_5});
  await Assets.load({alias: 'item_6', src: itemSource_6});
  await Assets.load({alias: 'item_7', src: itemSource_7});
  await Assets.load({alias: 'item_8', src: itemSource_8});
  await Assets.load({alias: 'item_9', src: itemSource_9});
  await Assets.load({alias: 'item_10', src: itemSource_10});
  await Assets.load({alias: 'item_11', src: itemSource_11});
  await Assets.load({alias: 'item_12', src: itemSource_12});
  await Assets.load({alias: 'item_13', src: itemSource_13});
  await Assets.load({alias: 'item_14', src: itemSource_14});
  await Assets.load({alias: 'item_15', src: itemSource_15});
  await Assets.load({alias: 'item_16', src: itemSource_16});
  await Assets.load({alias: 'item_17', src: itemSource_17});
  await Assets.load({alias: 'item_18', src: itemSource_18});
  await Assets.load({alias: 'item_19', src: itemSource_19});
  await Assets.load({alias: 'item_20', src: itemSource_20});
  await Assets.load({alias: 'item_21', src: itemSource_21});
  await Assets.load({alias: 'item_22', src: itemSource_22});
  await Assets.load({alias: 'item_23', src: itemSource_23});
  await Assets.load({alias: 'item_24', src: itemSource_24});
  await Assets.load({alias: 'item_25', src: itemSource_25});
  await Assets.load({alias: 'item_26', src: itemSource_26});
  await Assets.load({alias: 'item_27', src: itemSource_27});
  await Assets.load({alias: 'item_28', src: itemSource_28});

  sound_assets = [
    { name: "background", path: background },
    { name: 'click', path: click},
    { name: "merge_sound", path: merge_sound },
    { name: "coin_add", path: coin_add },
  ];
  // await Assets.load({
  //   alias: 'TobiGreekCyrillic',
  //   src: fontSource
  // });
  await Promise.all(
    sound_assets.map((s, index) =>
      new Promise(resolve => {
        sound.add(s.name, {
          url: s.path,
          volume: 1,
          loop: index === 0,
          preload: true,
          loaded: (err, snd) => {
            if (err) {
              setTimeout(() => resolve(), 100);
            } else {
              resolve();
            }
          }
        });
      })
    )
  );
  sound.play('background');
  bg = Assets.cache.get('bg');
}



const app = new Application();
await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xf5dfda,
  antialias: true,
  resizeTo: window
});

await setup();

document.getElementById('main').appendChild(app.canvas);
let grid = [];
let GRID_SIZE_WIDTH = 15;
let GRID_SIZE_HEIGHT = 15;
let fingerSprite;
let logoSprite;
let logoSprite2;
let soundSprite;
let soundOnSprite;
let soundOffSprite;
let progressSprite;
let CELL_SIZE;
let coins = 0;
let sucesses = 0;
let draggedSprite = null;
let startCell = null;
let historyX = [];
let historyY = [];
const historySize = 15;
const ropeSize =  100;
const points = [];

let inactivityTimer;
const inactivityTime = 5000;
const fadeOverlay = new Graphics();
fadeOverlay.beginFill(0x000000, 0.3);
fadeOverlay.drawRect(0, 0, window.innerWidth, window.innerHeight);
fadeOverlay.endFill();
fadeOverlay.alpha = 0;
fadeOverlay._zIndex = 9;
app.stage.addChild(fadeOverlay);


const winModal = new Container();
winModal.visible = false;
winModal.width = window.innerWidth;
winModal.height = window.innerHeight;

const modalContainer = new Container();
modalContainer.label = 'MODAL_CONTAINER';

const modalBg = new Graphics();
modalBg.beginFill(0x000000, 0.8);
modalBg.drawRoundedRect(0, 0, window.innerWidth, window.innerHeight, 0);
modalBg.endFill();
modalBg.pivot.set(0.5, 0.5);
modalBg.x = 0;
modalBg.y = 0;
winModal._zIndex = 10;



await Assets.load({alias: 'logo2', src: logo});
logoSprite2 = Sprite.from(Assets.cache.get('logo2'));
logoSprite2.label = 'LOGO2';
logoSprite2.anchor.set(0);
logoSprite2.width = 350;
logoSprite2.height = 250;
logoSprite2.position.set(window.innerWidth / 2.5, window.innerHeight / 3 - 225);
modalContainer.width = 350;
modalContainer.height = 250;
modalContainer.pivot.set(0, 0);
modalContainer.position.set(0,0)
modalBg.addChild(modalContainer);
winModal.addChild(modalBg);


app.stage.addChild(winModal);

const winText = new Text('You Win!', {
  fontFamily: 'TobiGreekCyrillic',
  fontSize: 98,
  fontWeight: 'bold',
  fill: '#9e5746',
  stroke: '#eccca5',
  strokeThickness: 6,
});
winText.anchor.set(0.5);
winText.x = modalBg.width / 2;
winText.y = modalBg.height / 2.25;

const buttonModalSprite = Sprite.from(Assets.cache.get('button'));
buttonModalSprite.width = 200;
buttonModalSprite.height = 70;
buttonModalSprite.x = modalBg.width / 2;;
buttonModalSprite.y = modalBg.height / 2;
buttonModalSprite.anchor.set(0);
buttonModalSprite.position.set(winModal.width / 2 - 100, winModal.height / 1.75);

modalContainer.addChild(winText);


buttonModalSprite.interactive = true;
buttonModalSprite.buttonMode = true;
buttonModalSprite.on('pointerdown', restartGame);

const playAgainText = new Text('Play Again', { fontSize: 48, fill: '#ece0b8',  fontWeight: 'bold' });
playAgainText.anchor.set(0.5);
playAgainText.x = buttonModalSprite.width / 2 + 95;
playAgainText.y = buttonModalSprite.height / 3.25 + 45;

modalContainer.addChild(buttonModalSprite);
modalContainer.addChild(logoSprite2);
buttonModalSprite.addChild(playAgainText);


function showWinScreenshowWinScreen() {
  winModal.visible = true;
  clearTimeout(inactivityTimer);
  fingerSprite.visible = false;
  sound.pauseAll();

}


function restartGame() {
  sucesses = 0;
  winModal.visible = false;
  fadeOverlay.alpha = 0;
  sound.resumeAll();
  gsap.to(fadeOverlay, { alpha: 1, duration: 0.5, onComplete: () => {
      coins = 0;
      coinsText.text = coins;
      gsap.to(fadeOverlay, { alpha: 0, duration: 0.5 });
    }});
  createGrid();
  updateGrid();
  calculateSizes();
}




const SPRITE_LEVELS = [
  {texture: await Assets.cache.get('item_1'), value: 0, type: 'lock'},
  {texture: await Assets.cache.get('item_4'), value: 1, type: 'lock'},
  {texture: await Assets.cache.get('item_16'),value: 2, type: 'lock'},
  {texture: await Assets.cache.get('item_21'),value: 3, type: 'lock', final: true},

  {texture: await Assets.cache.get('item_2'), value: 4, type: 'travel'},
  {texture: await Assets.cache.get('item_3'), value: 5, type: 'travel'},
  {texture: await Assets.cache.get('item_7'), value: 6, type: 'travel'},
  {texture: await Assets.cache.get('item_9'), value: 7, type: 'travel'},
  {texture: await Assets.cache.get('item_12'),value: 8, type: 'travel'},
  {texture: await Assets.cache.get('item_17'), value: 9, type: 'travel'},
  {texture: await Assets.cache.get('item_18'), value: 10, type: 'travel'},
  {texture: await Assets.cache.get('item_19'), value: 11, type: 'travel'},
  {texture: await Assets.cache.get('item_20'), value: 12, type: 'travel'},
  {texture: await Assets.cache.get('item_24'), value: 13, type: 'travel', final: true},

  {texture: await Assets.cache.get('item_5'), value: 14, type: 'paper'},
  {texture: await Assets.cache.get('item_6'), value: 15, type: 'paper'},
  {texture: await Assets.cache.get('item_11'), value: 16, type: 'paper'},
  {texture: await Assets.cache.get('item_13'), value: 17, type: 'paper'},
  {texture: await Assets.cache.get('item_15'), value: 18, type: 'paper'},
  {texture: await Assets.cache.get('item_22'), value: 19, type: 'paper'},
  {texture: await Assets.cache.get('item_23'), value: 20, type: 'paper', final: true},

  {texture: await Assets.cache.get('item_8'), value: 21, type: 'photo'},
  {texture: await Assets.cache.get('item_10'), value: 22, type: 'photo'},
  {texture: await Assets.cache.get('item_14'), value: 23, type: 'photo'},
  {texture: await Assets.cache.get('item_25'), value: 24, type: 'photo'},
  {texture: await Assets.cache.get('item_26'), value: 25, type: 'photo'},
  {texture: await Assets.cache.get('item_27'), value: 26, type: 'photo'},
  {texture: await Assets.cache.get('item_28'), value: 27, type: 'photo', final: true},
];

globalThis.__PIXI_APP__ = app;


const coinsText = new BitmapText("0", {
  fontFamily: 'TobiGreekCyrillic',
  fontSize: 60,
  fontWeight: 'bold',
  fill: '#9e5746',
});
app.stage.addChild(coinsText);
coinsText.anchor.set(0.5, 0);

const mainContainer = new Container();
app.stage.addChild(mainContainer);

const gridContainer = new Container();
mainContainer.label = 'MAIN';
gridContainer.label = 'GRID';
mainContainer.addChild(gridContainer);


function clipInput(elem, arr) {
  if (elem < 0) elem = 0;
  if (elem > arr.length - 1) elem = arr.length - 1;

  return arr[elem];
}

function getTangent(elem, factor, array) {
  return (factor * (clipInput(elem + 1, array) - clipInput(elem - 1, array))) / 2;
}

function cubicInterpolation(array, tan, tangentFactor = 1) {
  const k = Math.floor(tan);
  const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
  const p = [clipInput(k, array), clipInput(k + 1, array)];
  tan -= k;
  const t2 = tan * tan;
  const t3 = tan * t2;
  return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + tan) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}



function calculateSizes() {
  let availableWidth = window.innerWidth * 0.7;
  let availableHeight = window.innerHeight *0.7;
  mainContainer.width = window.innerWidth;
  mainContainer.height = window.innerHeight;
  gridContainer.width = GRID_SIZE_WIDTH * CELL_SIZE ;
  gridContainer.height = GRID_SIZE_HEIGHT * CELL_SIZE ;
  gridContainer.position.set(
    (window.innerWidth - (gridContainer.width + window.innerWidth * 0.15)) / 2,
    (window.innerHeight - (gridContainer.height+ window.innerHeight * 0.15)) / 2
  );
  gridContainer.pivot.set(gridContainer.width / 2, gridContainer.height / 2);
  gridContainer.position.set(0, 0);
  mainContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
  const scaleX = availableWidth / (GRID_SIZE_WIDTH * CELL_SIZE);
  const scaleY = availableHeight / (GRID_SIZE_HEIGHT * CELL_SIZE);
  const scale = Math.min(scaleX, scaleY);

  mainContainer.scale.set(scale);
  mainContainer.position.set(
    window.innerWidth  / 2,
    window.innerHeight/ 2
  );

}



async function createGrid() {
  gridContainer.removeChildren();
  for (let i = 0; i < GRID_SIZE_HEIGHT; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE_WIDTH; j++) {
      const x = j * CELL_SIZE;
      const y = i * CELL_SIZE;

      const bcg = Sprite.from(bg);
      bcg.anchor.set(0.5);
      bcg.width = CELL_SIZE;
      bcg.height = CELL_SIZE;
      bcg.x = x;
      bcg.y = y;

      gridContainer.addChild(bcg);

      const sprite = createRandomSprite(x, y, i * GRID_SIZE_WIDTH + j);
      sprite.anchor.set(0.5);
      sprite.width = CELL_SIZE * 0.8;
      sprite.height = CELL_SIZE * 0.8;
      bcg.addChild(sprite);

      grid[i][j] = { background: bcg, sprite, x, y, value: sprite.value, type: sprite.type, finished: sprite.finished  };
    }
  }
}


function createRandomSprite(x, y, cellIndex) {
  const level = Math.floor(Math.random() * SPRITE_LEVELS.length);
  return createSpriteFromLevel(x, y, cellIndex, level);
}

function createSpriteFromLevel(x, y, cellIndex, level) {
  const spriteData = SPRITE_LEVELS.find(sl => sl.value === level);
  const sprite = Sprite.from(spriteData.texture);
  sprite.anchor.set(0.5);
  sprite.width = CELL_SIZE;
  sprite.height = CELL_SIZE;
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
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)

  return sprite;
}

function redrawGrid() {
  gridContainer.removeChildren();
  for (let i = 0; i < GRID_SIZE_HEIGHT; i++) {
    for (let j = 0; j < GRID_SIZE_WIDTH; j++) {
      const elem = grid[i][j];
      elem.x = j * CELL_SIZE;
      elem.y = i * CELL_SIZE;
      elem.background.position.set(j * CELL_SIZE, i * CELL_SIZE);
      elem.background.width = CELL_SIZE * 1.1;
      elem.background.height = CELL_SIZE * 1.1;
      gridContainer.addChild(elem.background);
      if (elem.sprite) {
        elem.sprite.position.set(j * CELL_SIZE, i * CELL_SIZE);
        elem.sprite.width = CELL_SIZE;
        elem.sprite.height = CELL_SIZE;
        gridContainer.addChild(elem.sprite);
      }
    }
  }
}

function updateGrid() {
  CELL_SIZE = 20;

  if (window.innerWidth > window.innerHeight) {
    GRID_SIZE_WIDTH = 15;
    GRID_SIZE_HEIGHT = 15;

  } else {
    GRID_SIZE_WIDTH = 10;
    GRID_SIZE_HEIGHT = 13;
  }
  redrawGrid();
  calculateSizes();
}



for (let i = 0; i < historySize; i++)
{
  historyX.push(0);

  historyY.push(0);
}
for (let i = 0; i < ropeSize; i++)
{
  points.push(new Point(0, 0));
}
const rope = new MeshRope({ texture: await Assets.cache.get('trail'), points });
app.stage.addChild(rope);
let mouseposition = null;

rope.blendmode = 'add';
let ropeTicker = null;

function onDragStart(event) {
  this.data = event.data;
  this.dragging = true;
  draggedSprite = this;
  startCell = findCellBySprite(this);
  this.zIndex = 2;
  rope.visible = true;
  historyX.fill(event.data.global.x);
  historyY.fill(event.data.global.y);

  if (!ropeTicker) {
    ropeTicker = (delta) => {
      if (!mouseposition) return;
      historyX.pop();
      historyX.unshift(event.data.global.x);
      historyY.pop();
      historyY.unshift(event.data.global.y);

      for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
        const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

        p.x = ix;
        p.y = iy;
      }
    };
    sound.play('click');
    app.ticker.add(ropeTicker);
  }

}


function addCoins(amount) {
  coinsText.text = `${+coinsText.text + amount}`;
  spawnMoneyEffect(progressSprite.x, progressSprite.y);
}

function onDragEnd() {
  if (!this.dragging) return;
  rope.visible = false;
  this.dragging = false;
  this.data = null;
  const dropX = this.x;
  const dropY = this.y;
  const {row, col} = getCellIndex(dropY, dropX);
  const targetCell = grid[row][col];

  if (targetCell && targetCell.sprite !== draggedSprite &&
    targetCell.sprite?.value === draggedSprite.value &&
    targetCell.sprite?.type === draggedSprite.type && !targetCell.sprite.finished)  {
    const newLevel = targetCell.sprite.value + 1;
    const newSprite = createSpriteFromLevel(
      targetCell.sprite.x,
      targetCell.sprite.y,
      targetCell.index,
      newLevel
    );
    gridContainer.removeChild(targetCell.sprite);
    gridContainer.removeChild(draggedSprite);
    grid[row][col].sprite = newSprite;
    grid[row][col].value = newLevel;
    startCell.sprite = null;
    sound.play('merge_sound');
    playEffectMerge(grid[row][col].x, grid[row][col].y);
    gridContainer.addChild(newSprite);
    coinsText.text = `${+coinsText.text + 25}`;
    sucesses  +=1;
    sound.play('coin_add');


    addCoins(25);
    if (sucesses >=2) {
      showWinScreenshowWinScreen();
    }

  } else {
    if (targetCell.sprite) {
      const temp = {
        texture: draggedSprite.texture,
        value: draggedSprite.value,
        index: draggedSprite.index,
        type: draggedSprite.type};
      draggedSprite.texture = targetCell.sprite.texture;
      draggedSprite.value = targetCell.sprite.value;
      draggedSprite.type = targetCell.sprite.type;
      draggedSprite.index = targetCell.sprite.index;
      targetCell.sprite.texture = temp.texture;
      targetCell.sprite.value = temp.value;
      targetCell.sprite.index = temp.index;
      targetCell.value = temp.value;
      targetCell.type = temp.type

    }
  }
  draggedSprite.x = startCell.x;
  draggedSprite.y = startCell.y;
  draggedSprite.zIndex = 1;


  draggedSprite = null;
  startCell = null;
  if (ropeTicker) {
    app.ticker.remove(ropeTicker);
    ropeTicker = null;
  };

}

function onDragMove(event) {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
    mouseposition = { x: event.data.global.x, y: event.data.global.y };
    mouseposition.x = event.data.global.x;
    mouseposition.y = event.data.global.y;

  }

}

function findCellBySprite(sprite) {
  for (let i = 0; i < GRID_SIZE_HEIGHT; i++) {
    for (let j = 0; j < GRID_SIZE_WIDTH; j++) {
      if (grid[i][j].sprite === sprite) {
        return grid[i][j];
      }
    }
  }
  return null;
}
function getCellIndex(x, y) {
  const row = Math.abs(Math.floor((x - gridContainer.getLocalBounds().x) / CELL_SIZE));
  const col = Math.abs(Math.floor((y - gridContainer.getLocalBounds().y) / CELL_SIZE));
  return {row, col};
}


async function playEffectMerge( x, y) {
  const effect = new AnimatedSprite(Assets.cache.get('merge').animations['Merge_FX']);
  effect._zIndex = 3;
  effect.anchor.set(0.5);
  effect.position.set(x, y);
  effect.width = CELL_SIZE * 5;
  effect.height = CELL_SIZE * 5;
  effect.loop = false;
  effect.label = 'EFFECT';
  effect.animationSpeed = 0.45;
  gridContainer.addChild(effect);
  effect.zIndex = 2;
  effect.onComplete = () => {
    gridContainer.removeChild(effect);
    effect.destroy();
  };

  effect.play();

  return effect;
}


function resetInactivityTimer() {
  if (fingerSprite) {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      fingerSprite.visible = false;
    }
    if(winModal.visible === false){
      inactivityTimer = setTimeout(() => {
        moveFingerToPosition(getValidChain());
      }, inactivityTime);
    }
  }

}
window.addEventListener("pointerdown", resetInactivityTimer);
window.addEventListener("pointermove", resetInactivityTimer);
window.addEventListener("keydown", resetInactivityTimer);


resetInactivityTimer();

async function createFinger() {
  fingerSprite = Sprite.from(Assets.cache.get('finger'));
  fingerSprite.label = 'FINGER';
  fingerSprite.width = CELL_SIZE * 1.5;
  fingerSprite.height = CELL_SIZE * 3.5;
  fingerSprite.anchor.set(0.75, 0);
  fingerSprite.position.set(0,0);
  fingerSprite._zIndex = 5;
  gridContainer.addChild(fingerSprite);
  fingerSprite.visible = false;
}

async function createLogo() {
  await Assets.load({alias: 'logo', src: logo});
  logoSprite = Sprite.from(Assets.cache.get('logo'));
  logoSprite.label = 'LOGO';

  logoSprite.alpha = 0;
  logoSprite.anchor.set(0.5, 0);
  app.stage.addChild(logoSprite);

  if (window.innerWidth > window.innerHeight) {
    logoSprite.width = 50;
    logoSprite.height = 40;
    logoSprite.position.set(window.innerWidth - 125, 25);

    gsap.to(logoSprite, {
      width: 150,
      height: 125,
      alpha: 1,
      duration: 0.5,
      ease: "power2.out"
    });

  } else {
    logoSprite.width = 50;
    logoSprite.height = 40;
    logoSprite.position.set(window.innerWidth - 75, 25);

    gsap.to(logoSprite, {
      width: 100,
      height: 75,
      alpha: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  }

  window.addEventListener('resize',  () => {
    logoSprite.position.set(window.innerWidth - 125, 25);
  });
}

async function createSoundIcon() {
  await Assets.load({alias: 'soundBG', src: soundBG});
  soundSprite = Sprite.from(Assets.cache.get('soundBG'));
  soundSprite.label = 'sound';
  soundSprite.width = 75;
  soundSprite.height = 75;
  soundSprite.anchor.set(0.5, 0);
  soundSprite.position.set(75, window.innerHeight - 100);
  app.stage.addChild(soundSprite);


  await Assets.load({alias: 'soundOn', src: soundOn});
  soundOnSprite = Sprite.from(Assets.cache.get('soundOn'));
  soundOnSprite.label = 'soundOn';
  soundOnSprite.width = 75;
  soundOnSprite.height = 75;
  soundOnSprite.anchor.set(0.5);
  soundOnSprite.position.set(0, 75);
  soundSprite.addChild(soundOnSprite);

  await Assets.load({alias: 'soundOff', src: soundOff});
  soundOffSprite = Sprite.from(Assets.cache.get('soundOff'));
  soundOffSprite.label = 'soundOff';
  soundOffSprite.width = 75;
  soundOffSprite.height = 75;
  soundOffSprite.anchor.set(0.5);
  soundOffSprite.position.set(0, 75);
  soundOffSprite.interactive = true;
  soundOffSprite.buttonMode = true;
  soundOffSprite.visible =false;
  soundOnSprite.interactive = true;
  soundOnSprite.buttonMode = true;
  soundSprite.addChild(soundOffSprite);


  soundOnSprite.on('pointerdown', ()=>   {
    sound.exists('background') && sound.muteAll();
    soundOnSprite.visible = false;
    soundOnSprite.interactive = false;
    soundOnSprite.buttonMode = false;
    soundOffSprite.visible = true;
    soundOffSprite.interactive = true;
    soundOffSprite.buttonMode = true;
  })
  soundOffSprite.on('pointerdown', ()=>   {
    sound.exists('background') && sound.unmuteAll();
    soundOffSprite.visible = false;
    soundOffSprite.interactive = false;
    soundOffSprite.buttonMode = false;
    soundOnSprite.visible = true;
    soundOnSprite.interactive = true;
    soundOnSprite.buttonMode = true;
  })
  window.addEventListener('resize',  () => {
    soundSprite.position.set(75, window.innerHeight - 100);
    soundOnSprite.position.set(0, 75);
    soundOffSprite.position.set(0, 75);
  });
}

async function createBar() {
  await Assets.load({alias: 'progress', src: progress});
  await Assets.load({ alias: 'money', src: money });

  progressSprite = Sprite.from(Assets.cache.get('progress'));
  progressSprite.label = 'progress';
  progressSprite.width = 295;
  progressSprite.height = 100;
  progressSprite.anchor.set(0.5, 0);
  progressSprite.position.set(150, 30);

  coinsText.position.set(130, 30);


  progressSprite.addChild(coinsText);
  app.stage.addChild(progressSprite);
  window.addEventListener('resize',  () => {
    progressSprite.position.set(150, 25);
    coinsText.position.set(130, 35);

  });
}


function spawnMoneyEffect(x, y) {
  const moneySprite = Sprite.from(Assets.cache.get('money'));
  moneySprite.anchor.set(0.5);
  moneySprite.position.set(x - progressSprite.width - 15, 75);
  moneySprite.scale.set(0);
  progressSprite.addChild(moneySprite);
  moneySprite._zIndex = 5;

  gsap.to(moneySprite.scale, {
    x: 1.01, y: 1.01, duration: 0.2, ease: "power2.out", onComplete: () => {
      gsap.to(moneySprite, {
        alpha: 0, duration: 1, ease: "power2.inOut", onComplete: () => {
          moneySprite.destroy();
        }
      });
    }
  });
}


function getValidChain() {
  let result = findChain();

  if (result) {
    return result;
  } else {
    return getValidChain();
  }
}

function findElementByValueAndType(target, array, targetValue, targetType, x, y ) {
  for (let i = 0; i < GRID_SIZE_WIDTH; i++) {
    for (let j = 0; j < GRID_SIZE_HEIGHT; j++) {
      if (array[i][j].value === targetValue && array[i][j].type === targetType && array[i][j].x !== x && array[i][j].y) {
        return array[i][j];
      }
    }
  }
  return null;
}

function findChain(){
  let targetType = null;
  let targetLevel = null
  let randomRow = Math.floor(Math.random() * (GRID_SIZE_HEIGHT -  1));
  let randomCol = Math.floor(Math.random() * (GRID_SIZE_WIDTH -  1));
  if(grid[randomRow][randomCol].sprite) {
    fingerSprite.position.set(grid[randomRow][randomCol].x, grid[randomRow][randomCol].y);
    fingerSprite.visible = true;
    targetLevel = grid[randomRow][randomCol].value;
    targetType = grid[randomRow][randomCol].type;
  }
  return findElementByValueAndType(grid[randomRow][randomCol],grid, targetLevel, targetType, grid[randomRow][randomCol].x, grid[randomRow][randomCol].y);
}

function moveFingerToPosition(objectToMove) {
  fingerSprite.visible = true;
  let elapsedTime = 0;
  const duration = 2;
  const startX = fingerSprite.position.x;
  const startY = fingerSprite.position.y;
  app.ticker.add((delta) => {
    if (elapsedTime < duration) {
      elapsedTime += delta.deltaTime / 60;
      const t = Math.min(elapsedTime / duration, 1);
      fingerSprite.x = startX + (objectToMove.sprite.position.x - startX) * t;
      fingerSprite.y = startY + (objectToMove.sprite.position.y - startY) * t;
    }
  });

}


calculateSizes();
createGrid();
createLogo();
createBar();
createSoundIcon();


window.addEventListener('resize', async () => {
  updateGrid();
  createFinger();
  // showWinScreenshowWinScreen();
  winModal.width =  app.stage.width;
  winModal.height =  app.stage.height;
  fadeOverlay.clear();
  fadeOverlay.beginFill(0x000000, 0.3);
  fadeOverlay.drawRect(0, 0, app.stage.width, app.stage.height);
  fadeOverlay.endFill();
  fadeOverlay.alpha = 0;
  fadeOverlay._zIndex = 9;

});

window.dispatchEvent(new Event('resize'));
