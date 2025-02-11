import {Assets} from "pixi.js";

export const SPRITE_LEVELS = [

  {texture: await Assets.cache.get('item_1'), value: 0, type: 'lock', code: 'item_1'},
  {texture: await Assets.cache.get('item_4'), value: 1, type: 'lock', code: 'item_4'},
  {texture: await Assets.cache.get('item_16'),value: 2, type: 'lock', code: 'item_16'},
  {texture: await Assets.cache.get('item_21'),value: 3, type: 'lock', final: true, code: 'item_21'},

  {texture: await Assets.cache.get('item_2'), value: 4, type: 'travel', code: 'item_2'},
  {texture: await Assets.cache.get('item_3'), value: 5, type: 'travel', code: 'item_3'},
  {texture: await Assets.cache.get('item_7'), value: 6, type: 'travel', code: 'item_7'},
  {texture: await Assets.cache.get('item_9'), value: 7, type: 'travel', code: 'item_9'},
  {texture: await Assets.cache.get('item_12'),value: 8, type: 'travel', code: 'item_12'},
  {texture: await Assets.cache.get('item_17'), value: 9, type: 'travel', code: 'item_17'},
  {texture: await Assets.cache.get('item_18'), value: 10, type: 'travel', code: 'item_18'},
  {texture: await Assets.cache.get('item_19'), value: 11, type: 'travel', code: 'item_19'},
  {texture: await Assets.cache.get('item_20'), value: 12, type: 'travel', code: 'item_20'},
  {texture: await Assets.cache.get('item_24'), value: 13, type: 'travel', final: true, code: 'item_24'},

  {texture: await Assets.cache.get('item_5'), value: 14, type: 'paper', code: 'item_5'},
  {texture: await Assets.cache.get('item_6'), value: 15, type: 'paper', code: 'item_6'},
  {texture: await Assets.cache.get('item_11'), value: 16, type: 'paper', code: 'item_11'},
  {texture: await Assets.cache.get('item_13'), value: 17, type: 'paper', code: 'item_13'},
  {texture: await Assets.cache.get('item_15'), value: 18, type: 'paper', code: 'item_15'},
  {texture: await Assets.cache.get('item_22'), value: 19, type: 'paper', code: 'item_22'},
  {texture: await Assets.cache.get('item_23'), value: 20, type: 'paper', final: true, code: 'item_23'},

  {texture: await Assets.cache.get('item_8'), value: 21, type: 'photo', code: 'item_8'},
  {texture: await Assets.cache.get('item_10'), value: 22, type: 'photo', code: 'item_10'},
  {texture: await Assets.cache.get('item_14'), value: 23, type: 'photo', code: 'item_14'},
  {texture: await Assets.cache.get('item_25'), value: 24, type: 'photo', code: 'item_25'},
  {texture: await Assets.cache.get('item_26'), value: 25, type: 'photo', code: 'item_26'},
  {texture: await Assets.cache.get('item_27'), value: 26, type: 'photo', code: 'item_27'},
  {texture: await Assets.cache.get('item_28'), value: 27, type: 'photo', final: true, code: 'item_28'},
  ];
