//得分

import { DataStore } from "../base/DataStore";

//得分不是一个父类,不需要继承Sprite
export class score{
  constructor(){
    this.scoreNumber=0;//计分器
    this.dataStore=DataStore.getInstance();
    this.ctx=this.dataStore.ctx;
    this.canAdd=true;//是否可以加分
  }
  //画分数
  draw(){
    this.ctx.font='25px 宋体';
    this.ctx.fillStyle='red';
    this.ctx.fillText(
      this.scoreNumber,//得分的数字
      this.dataStore.canvas.width/2,//分数的位置水平居中
      this.dataStore.canvas.height/9,//垂直距离

    )
  }
}




