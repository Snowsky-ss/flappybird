import { DataStore } from "../base/DataStore";
//水管的基类,封装了上下水管的公共部分
//水管也是图片,也要继承Sprite

import { Sprite } from "../base/Sprite";

export class Pipe extends Sprite{
  constructor(img,top){//img水管的图片, top水管出现时的高度
    //无论是上还是下水管,初始位置都在屏幕右侧外面
    //所以初始的x坐标是屏幕的宽,y坐标随机
    let x=DataStore.getInstance().canvas.width;
    super(img,0,0,img.width,img.height,x,0,img.width,img.height);
    this.top=top;
  }
  
  //重写draw方法
  draw(){
    this.x=this.x-2;//和地板的速度保持一致
    super.draw();
  }
}











