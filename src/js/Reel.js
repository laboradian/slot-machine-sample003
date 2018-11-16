//import _ from 'lodash'
import SpriteLoader from './SpriteLoader';

class Reel {
  /**
   * @param {string} options.canvasId
   * @param {object} options.spriteJson
   */
  constructor(options) {
    this.canvas = document.querySelector(`#${options.canvasId}`);

    this.spriteJson = options.spriteJson;

    // 回転する要素数
    this.NUM = 12;
    // 画面に表示する要素数
    this.SHOW_MAX = 1;

    this.MARGIN_TOP = 0;
    this.MARGIN_BOTTOM = 0;
    this.MARGIN_LEFT = 0;
    this.MARGIN_RIGHT = 0;
    this.SYMBOL_WIDTH = 192;
    this.SYMBOL_HEIGHT = 192;

    // シンボル画像IDの配列
    this.symbols = [];
    this.current_symbol = '';

    this.spriteLoader;
    this.canvas;
    this.ctx;

    this.idx_1st = 0; // 1st index of symbol to show

    this.running = false;
  }

  /**
   *
   */
  init() {
    this.canvas.width = this.MARGIN_LEFT + this.SYMBOL_WIDTH + this.MARGIN_RIGHT;
    this.canvas.height = this.MARGIN_TOP + this.MARGIN_BOTTOM + (this.SYMBOL_HEIGHT - 1) * this.SHOW_MAX + 1;
    this.ctx = this.canvas.getContext('2d');

    const spriteImage = new Image();

    this.spriteLoader = new SpriteLoader(spriteImage, this.ctx, this.spriteJson);

    this.shuffleSymbols();

    spriteImage.addEventListener('load', (/*e*/) => {
      let i;

      // シンボルの描画
      for (i=0; i<this.SHOW_MAX; i++) {
        this.spriteLoader.drawImage(this.symbols[i], this.MARGIN_LEFT, this.MARGIN_TOP + (this.SYMBOL_HEIGHT * i));
      }

    });
    spriteImage.src = 'img/sprite.png';
  }

  /**
   * 2回目以降の実行時にはこのメソッドを呼び出す
   */
  reInit() {
    let i;
    this.shuffleSymbols();
    // シンボルの描画
    for (i=0; i<this.SHOW_MAX; i++) {
      this.spriteLoader.drawImage(this.symbols[i], this.MARGIN_LEFT, this.MARGIN_TOP + (this.SYMBOL_HEIGHT * i));
    }
  }

  /**
   * シンボルの並びを変える
   *
   * 干支の順番は保つ。
   */
  shuffleSymbols() {
    let i;

    const min = 0;
    const max = 11;
    const idx_1st = Math.floor(Math.random() * (max + 1 - min)) + min;

    const symbols_tmp = [];
    let idx;
    for (i=0; i<this.NUM; i++) {
      idx = idx_1st + i;
      if (idx >= this.NUM) {
        idx -= this.NUM;
      }
      symbols_tmp.push(`symbol${idx}`);
    }
    this.symbols = symbols_tmp;
  }

  /**
   *
   */
  start() {
    this.num_running = true;
  }

  /**
   *
   */
  update() {

    let i, idx;

    if (this.num_running === false) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (i=0; i<this.SHOW_MAX; i++) {
      idx = this.idx_1st + i;
      if (idx >= this.symbols.length) {
        idx -= this.symbols.length;
      }

      const h = this.SYMBOL_HEIGHT;
      this.spriteLoader.drawImage(this.symbols[idx],
        this.MARGIN_LEFT,
        this.MARGIN_TOP + (h * i)
      );
      this.current_symbol = this.symbols[idx];
    }

    // 次回、1つ目として表示する要素のインデックス番号を設定する
    if (this.idx_1st == (this.symbols.length - 1)) {
      this.idx_1st = 0;
    } else {
      this.idx_1st++;
    }
  }

  stop() {
    this.num_running = false;
  }
}

export default Reel;
