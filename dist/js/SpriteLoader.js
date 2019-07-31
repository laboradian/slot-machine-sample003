class SpriteLoader {
  constructor(imgObj, ctxObj, configJson) {
    this.imgObj = imgObj;
    this.ctxObj = ctxObj;
    this.configJson = configJson;
  }

  drawImage(id, dx, dy) {
    this.ctxObj.drawImage(
      this.imgObj,
      this.configJson.frames[id].frame.x,
      this.configJson.frames[id].frame.y,
      this.configJson.frames[id].frame.w,
      this.configJson.frames[id].frame.h,
      dx, dy,
      this.configJson.frames[id].frame.w,
      this.configJson.frames[id].frame.h
    );
  }
}
export default SpriteLoader;
