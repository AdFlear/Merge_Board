import { AssetLoader } from './utils/AssetLoader';
import { SoundManager } from './utils/SoundManager';
import { UIManager } from './utils/UIManager';
import {TutorialFinger} from "./utils/TutorialFinger";
import {Application, Assets} from "pixi.js";
import {Grid} from "./utils/Grid";

const app = new Application();
await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xf5dfda,
  antialias: true,
  resizeTo: window
});

document.getElementById('main').appendChild(app.canvas);
const assetLoader = new AssetLoader();
await assetLoader.loadAssets();
const soundManager = new SoundManager(app);
await soundManager.setupSounds();
soundManager.play('background');
const uiManager = new UIManager(app.stage);
uiManager.createUI(soundManager);

const GRID_SIZE_WIDTH = 15;
const GRID_SIZE_HEIGHT = 15;
const CELL_SIZE = 50;
const gridObject = new Grid(app,GRID_SIZE_WIDTH, GRID_SIZE_HEIGHT, CELL_SIZE);
gridObject.createGrid();
const grid = gridObject.retrieveGrid();
const mainContainer = gridObject.retrieveMain();
const gridContainer = gridObject.retrieveGridContainer();
const tutorialFinger = new TutorialFinger(app,0, 0,GRID_SIZE_WIDTH, GRID_SIZE_HEIGHT,CELL_SIZE,gridContainer, grid);

window.addEventListener('resize', () => {
  gridObject.updateGrid();
  tutorialFinger.update();

});
window.dispatchEvent(new Event('resize'));
globalThis.__PIXI_APP__ = app;
