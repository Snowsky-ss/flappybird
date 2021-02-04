import { DataStore } from "../base/DataStore";
//背景图
//图片类,继承Sprite图片基类

import { Sprite } from "../base/Sprite";

export class Background extends Sprite{
  constructor(){
    //获取背景图
    let img=Sprite.getImage('background');
    //调用重写父类构造方法
    //获取画布
    let canvas=DataStore.getInstance().canvas;
    let w=canvas.width;
    let h=canvas.height;
    super(img,0,0,img.width,img.height,0,0,w,h);
  }

}


