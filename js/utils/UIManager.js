import {Assets, BitmapText, Container, Graphics, Sprite, Text} from "pixi.js";
import logo from "../../assets/img/ui/logo.png";
import gsap from "gsap";
import soundBG from "../../assets/img/ui/btn_light_large.png";
import soundOn from "../../assets/img/ui/sound-on.png";
import soundOff from "../../assets/img/ui/sound-off.png";
import {sound} from "@pixi/sound";
import progress from "../../assets/img/ui/bar_money.png";
import money from "../../assets/img/icon_money.png";
let refToUi = null;
export class UIManager {
  static winModal = new Container();
  static progressSprite = null;
  static coinsText = null;
  constructor(stage) {
    this.stage = stage;
    UIManager.winModal.visible =false;
    refToUi = this;
  }


  createUI(soundManager) {
    this.createLogo();
    this.createSoundIcon(soundManager);
    this.createBar();
  }

  createLogo() {
    const logoSprite = Sprite.from(Assets.cache.get('logo'));
    logoSprite.label = 'LOGO';

    logoSprite.alpha = 0;
    logoSprite.anchor.set(0.5, 0);
    this.stage.addChild(logoSprite);

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

  async createSoundIcon() {
    const soundSpriteBg = Sprite.from(Assets.cache.get('soundBG'));
    soundSpriteBg.label = 'sound';
    soundSpriteBg.width = 75;
    soundSpriteBg.height = 75;
    soundSpriteBg.anchor.set(0.5, 0);
    soundSpriteBg.position.set(75, window.innerHeight - 100);
    this.stage.addChild(soundSpriteBg);
    const soundOnSprite = Sprite.from(Assets.cache.get('soundOn'));
    soundOnSprite.label = 'soundOn';
    soundOnSprite.width = 75;
    soundOnSprite.height = 75;
    soundOnSprite.anchor.set(0.5);
    soundOnSprite.position.set(0, 75);
    soundSpriteBg.addChild(soundOnSprite);
    const soundOffSprite = Sprite.from(Assets.cache.get('soundOff'));
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
    soundSpriteBg.addChild(soundOffSprite);


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
      soundSpriteBg.position.set(75, window.innerHeight - 100);
      soundOnSprite.position.set(0, 75);
      soundOffSprite.position.set(0, 75);
    });
  }


  async createBar() {
    UIManager.coinsText = new BitmapText("0", {
      fontFamily: 'TobiGreekCyrillic',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#9e5746',
    });
    UIManager.progressSprite = Sprite.from(Assets.cache.get('progress'));
    UIManager.progressSprite.label = 'progress';
    UIManager.progressSprite.width = 295;
    UIManager.progressSprite.height = 100;
    UIManager.progressSprite.anchor.set(0.5, 0);
    UIManager.progressSprite.position.set(150, 30);

    UIManager.coinsText.position.set(130, 30);


    UIManager.progressSprite.addChild(UIManager.coinsText);
    this.stage.addChild(UIManager.progressSprite);
    window.addEventListener('resize',  () => {
      UIManager.progressSprite.position.set(150, 25);
      UIManager.coinsText.position.set(130, 35);

    });
  }


  static spawnMoneyEffect(x, y) {
    const moneySprite = Sprite.from(Assets.cache.get('money'));
    moneySprite.anchor.set(0.5);
    moneySprite.position.set(x - UIManager.progressSprite.width - 15, 75);
    moneySprite.scale.set(0);
    UIManager.progressSprite.addChild(moneySprite);
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


  static showWinModal(onRestart) {
    const bg = new Graphics();
    bg.beginFill(0x000000, 0.7);
    bg.drawRect(0, 0, window.innerWidth, window.innerHeight);
    bg.endFill();
    UIManager.winModal.addChild(bg);

    const winText = new Text('You Win!', {
      fontFamily: 'TobiGreekCyrillic',
      fontSize: 98,
      fontWeight: 'bold',
      fill: '#9e5746',
      stroke: '#eccca5',
      strokeThickness: 6,
    });
    winText.anchor.set(0.5);
    winText.x = bg.width / 2;
    winText.y = bg.height / 2.25;
    UIManager.winModal.addChild(winText);


    const buttonModalSprite = Sprite.from(Assets.cache.get('button'));
    buttonModalSprite.width = 200;
    buttonModalSprite.height = 70;
    buttonModalSprite.x = bg.width / 2;;
    buttonModalSprite.y = bg.height / 2;
    buttonModalSprite.anchor.set(0);
    buttonModalSprite.position.set(UIManager.winModal.width / 2 - 100, UIManager.winModal.height / 1.75);


    const logoSprite2 = Sprite.from(Assets.cache.get('logo'));
    logoSprite2.label = 'LOGO2';
    logoSprite2.anchor.set(0);
    logoSprite2.width = 350;
    logoSprite2.height = 250;
    logoSprite2.position.set(window.innerWidth / 2.5, window.innerHeight / 3 - 225);

    buttonModalSprite.interactive = true;
    buttonModalSprite.buttonMode = true;
    buttonModalSprite.on('pointerdown', onRestart);

    const playAgainText = new Text('Play Again', { fontSize: 48, fill: '#ece0b8',  fontWeight: 'bold' });
    playAgainText.anchor.set(0.5);
    playAgainText.x = buttonModalSprite.width / 2 + 95;
    playAgainText.y = buttonModalSprite.height / 3.25 + 45;

    buttonModalSprite.addChild(playAgainText);
    UIManager.winModal.addChild(buttonModalSprite);
    UIManager.winModal.addChild(logoSprite2);
    UIManager.winModal.visible = true;
    UIManager.winModal.width = window.innerWidth;
    UIManager.winModal.height = window.innerHeight;
    refToUi.stage.addChild(UIManager.winModal);
    window.addEventListener('resize',  () => {
      UIManager.winModal.width = refToUi.stage.width;
      UIManager.winModal.height = refToUi.stage.height;
      logoSprite2.position.set(window.innerWidth / 2.5, window.innerHeight / 3 - 225);
      buttonModalSprite.position.set(refToUi.stage.width / 2 - 100, refToUi.stage.height / 1.75);
      playAgainText.x = buttonModalSprite.width / 2 + 95;
      playAgainText.y = buttonModalSprite.height / 3.25 + 45;
    })
  }

  static retrieveModal(){
    return UIManager.winModal;
  }
}
