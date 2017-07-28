/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'
//import SpriteLoader from './SpriteLoader';
import Reel from './Reel';

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

// 画像のコピー
require('file-loader?name=../../dist/img/[name].[ext]!../img/sprite.png');


const spriteJson = require('./sprite.json');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');



//======================
// アプリケーション
//======================

const btnStart = document.querySelector('#btnStart');
const btnStop0 = document.querySelector('#btnStop0');
const btnStop1 = document.querySelector('#btnStop1');
const btnStop2 = document.querySelector('#btnStop2');

// requestAnimationFrame の戻り値
let reqId;
let speed = 10;

let reel0, reel1, reel2;
let num_running = 0;

window.addEventListener('load', () => {

  //btnStop.style.display = 'none';

  reel0 = new Reel({
    canvasId: 'reel0',
    spriteJson
  });

  reel1 = new Reel({
    canvasId: 'reel1',
    spriteJson
  });

  reel2 = new Reel({
    canvasId: 'reel2',
    spriteJson
  });

  reel0.init();
  reel1.init();
  reel2.init();

});

//---------------
// スピード調整
//---------------
document.querySelector('#inputRangeSpeed').addEventListener('change', (e) => {
  // 1から20になる
  speed = Math.abs(e.currentTarget.value - 26);
  console.log(speed);
});

const start = () => {
  let cnt = 0;

  num_running = 3;

  reel0.start();
  reel1.start();
  reel2.start();

  const step = () => {

    if (cnt % speed === 0) {
      reel0.update();
      reel1.update();
      reel2.update();
    }

    cnt++;
    reqId = window.requestAnimationFrame(step);
  };

  reqId = window.requestAnimationFrame(step);

  btnStart.disabled = true;
};


btnStart.addEventListener('click', () => {
  start();
});

const stopOneSymbole = (reelObj) => {

  num_running--;
  reelObj.stop();

  if (num_running === 0) {
    window.cancelAnimationFrame(reqId);
    btnStart.disabled = false;
  }

};


btnStop0.addEventListener('click', () => {
  stopOneSymbole(reel0);
});

btnStop1.addEventListener('click', () => {
  stopOneSymbole(reel1);
});

btnStop2.addEventListener('click', () => {
  stopOneSymbole(reel2);
});

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    switch (num_running) {
      case 3:
        stopOneSymbole(reel0);
        break;
      case 2:
        stopOneSymbole(reel1);
        break;
      case 1:
        stopOneSymbole(reel2);
        break;
      case 0:
        start();
        break;
      default:
        // do nothing
    }
  }
});
