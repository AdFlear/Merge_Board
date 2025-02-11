import {sound} from "@pixi/sound";
import background from "../../assets/img/music/bg.mp3";
import click from "../../assets/img/music/click.mp3";
import merge_sound from "../../assets/img/music/merge.mp3";
import coin_add from "../../assets/img/music/coin_add.mp3";

const  sound_assets = [
  { name: "background", path: background },
  { name: 'click', path: click},
  { name: "merge_sound", path: merge_sound },
  { name: "coin_add", path: coin_add },
];

export class SoundManager {
  constructor(app) {
    this.app = app;
    this.isMuted = false;
    this.sounds = [];
  }

 async setupSounds() {
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
  }

  play(soundName) {
    console.log(sound)
   sound.play(soundName);
  }
}
