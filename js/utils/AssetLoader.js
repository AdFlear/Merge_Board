import { Assets } from 'pixi.js';
import finger from '../../assets/img/finger.png';
import logo from '../../assets/img/ui/logo.png';
import soundBG from '../../assets/img/ui/btn_light_large.png';
import soundOn from '../../assets/img/ui/sound-on.png';
import bgSource from '../../assets/img/ui/bg_grid.png';
import soundOff from '../../assets/img/ui/sound-off.png';
import button from '../../assets/img/ui/green_button.png';
import progress from '../../assets/img/ui/bar_money.png';
import money from '../../assets/img/icon_money.png';
import merge from '../../assets/img/merge/merge.json';
import mergeSource from "../../assets/img/merge/merge.png";
import starSource from "../../assets/img/star.png";
import itemSource_1 from "../../assets/img/items/item_1.png";
import itemSource_2 from "../../assets/img/items/item_2.png";
import itemSource_3 from "../../assets/img/items/item_3.png";
import itemSource_4 from "../../assets/img/items/item_4.png";
import itemSource_5 from "../../assets/img/items/item_5.png";
import itemSource_6 from "../../assets/img/items/item_6.png";
import itemSource_7 from "../../assets/img/items/item_7.png";
import itemSource_8 from "../../assets/img/items/item_8.png";
import itemSource_9 from "../../assets/img/items/item_9.png";
import itemSource_10 from "../../assets/img/items/item_10.png";
import itemSource_11 from "../../assets/img/items/item_11.png";
import itemSource_12 from "../../assets/img/items/item_12.png";
import itemSource_13 from "../../assets/img/items/item_13.png";
import itemSource_14 from "../../assets/img/items/item_14.png";
import itemSource_15 from "../../assets/img/items/item_15.png";
import itemSource_16 from "../../assets/img/items/item_16.png";
import itemSource_17 from "../../assets/img/items/item_17.png";
import itemSource_18 from "../../assets/img/items/item_18.png";
import itemSource_19 from "../../assets/img/items/item_19.png";
import itemSource_20 from "../../assets/img/items/item_20.png";
import itemSource_21 from "../../assets/img/items/item_21.png";
import itemSource_22 from "../../assets/img/items/item_22.png";
import itemSource_23 from "../../assets/img/items/item_23.png";
import itemSource_24 from "../../assets/img/items/item_24.png";
import itemSource_25 from "../../assets/img/items/item_25.png";
import itemSource_26 from "../../assets/img/items/item_26.png";
import itemSource_27 from "../../assets/img/items/item_27.png";
import itemSource_28 from "../../assets/img/items/item_28.png";


export class AssetLoader {
  async loadAssets() {

    const textureData = await Assets.load(mergeSource);
    await Promise.all([
    await Assets.load({
      alias: 'merge',
      src: '../assets/img/merge/merge.json',
      data: { texture: textureData }
    }),
    await Assets.load({alias: 'bg', src: bgSource}),
    await Assets.load({alias: 'progress', src: progress}),
    await Assets.load({alias: 'logo', src: logo}),
    await Assets.load({alias: 'money', src: money}),
    await Assets.load({alias: 'soundBG', src: soundBG}),
    await Assets.load({alias: 'soundOn', src: soundOn}),
    await Assets.load({alias: 'soundOff', src: soundOff}),
    await Assets.load({alias: 'finger', src: finger}),
    await Assets.load({alias: 'button', src:button}),
    await Assets.load({alias: 'trail', src: starSource}),
    await Assets.load({alias: 'item_1', src: itemSource_1}),
    await Assets.load({alias: 'item_2', src: itemSource_2}),
    await Assets.load({alias: 'item_3', src: itemSource_3}),
    await Assets.load({alias: 'item_4', src: itemSource_4}),
    await Assets.load({alias: 'item_5', src: itemSource_5}),
    await Assets.load({alias: 'item_6', src: itemSource_6}),
    await Assets.load({alias: 'item_7', src: itemSource_7}),
    await Assets.load({alias: 'item_8', src: itemSource_8}),
    await Assets.load({alias: 'item_9', src: itemSource_9}),
    await Assets.load({alias: 'item_10', src: itemSource_10}),
    await Assets.load({alias: 'item_11', src: itemSource_11}),
    await Assets.load({alias: 'item_12', src: itemSource_12}),
    await Assets.load({alias: 'item_13', src: itemSource_13}),
    await Assets.load({alias: 'item_14', src: itemSource_14}),
    await Assets.load({alias: 'item_15', src: itemSource_15}),
    await Assets.load({alias: 'item_16', src: itemSource_16}),
    await Assets.load({alias: 'item_17', src: itemSource_17}),
    await Assets.load({alias: 'item_18', src: itemSource_18}),
    await Assets.load({alias: 'item_19', src: itemSource_19}),
    await Assets.load({alias: 'item_20', src: itemSource_20}),
    await Assets.load({alias: 'item_21', src: itemSource_21}),
    await Assets.load({alias: 'item_22', src: itemSource_22}),
    await Assets.load({alias: 'item_23', src: itemSource_23}),
    await Assets.load({alias: 'item_24', src: itemSource_24}),
    await Assets.load({alias: 'item_25', src: itemSource_25}),
    await Assets.load({alias: 'item_26', src: itemSource_26}),
    await Assets.load({alias: 'item_27', src: itemSource_27}),
    await Assets.load({alias: 'item_28', src: itemSource_28})
]);
  }}
