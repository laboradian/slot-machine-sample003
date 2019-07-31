/* global */
import Reel from './Reel.js';

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
const resultMessage = document.querySelector('#excellent');
const inputRangeSpeed = document.querySelector('#inputRangeSpeed');


// requestAnimationFrame の戻り値
let reqId;
let speed = 10;

let reel0, reel1, reel2;
let num_running = 0;
let num_play = 0;

window.addEventListener('load', () => {

  //btnStop.style.display = 'none';

  fetch('./js/sprite.json')
    .then((response) => {
      return response.json()
    })
    .then((spriteJson) => {

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

    })
    .catch((err) => {
      console.error(err);
    })
});

//---------------
// スピード調整
//---------------
inputRangeSpeed.addEventListener('change', (event) => {
  speed = convertRangeValueToSpeed(event.currentTarget.value);
});

/**
 *
 */
const convertRangeValueToSpeed = (value) => {
  return Math.abs(value - 26);
}

const start = () => {
  let cnt = 0;
  num_running = 3;

  if (num_play > 0) {
    reel0.reInit();
    reel1.reInit();
    reel2.reInit();
  }

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
  num_play++;
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

    if (reel0.current_symbol === reel1.current_symbol &&
        reel0.current_symbol === reel2.current_symbol) {

      resultMessage.className = 'excellent';
      setTimeout(() => {
        resultMessage.className = 'excellent-default';
      }, 5900);
    }
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
  switch (event.key) {
    case 'Enter':
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
      break;
    case 'ArrowLeft':
      inputRangeSpeed.value--;
      speed = convertRangeValueToSpeed(inputRangeSpeed.value);
      break;
    case 'ArrowRight':
      inputRangeSpeed.value++;
      speed = convertRangeValueToSpeed(inputRangeSpeed.value);
      break;
    default:
      // do nothing
  }
});

