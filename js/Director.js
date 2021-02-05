//导演类:控制游戏的逻辑

import { DataStore } from "./base/DataStore";
import { DownPipe } from "./runtime/DownPipe";
import { UpPipe } from "./runtime/UpPipe";

export class Director{
  constructor(){
    //获取变量池,方便获取或修改其中的变量
    this.dataStore=DataStore.getInstance();
  }

  //导演也必须是一个单例模式
  static getInstance(){
    if(!Director.instance){
      Director.instance=new Director();
    }
    return Director.instance;
  }

  //小鸟向上飞
  birdsUp(){
    for(let i=0;i<3;i++){
      let  birds=this.dataStore.get('birds');
      birds.y[i]=birds.birdsY[i];
    }
    //重置自由落体时间
    this.dataStore.get('birds').time=0;
  }

  //判断小鸟和某一个根水水管是否相撞
  isStrike(bird,pipe){
    let strike=true;//假设相撞
    if(
      bird.right<pipe.left ||
      bird.bottom>pipe.top ||
      bird.top<pipe.bottom ||
      bird.left>pipe.right
    ){
      //没有撞
      strike=false;
    }
    return strike;
  }


  //创建水管的方法
  createPipes(){
    //设置水管初始位置的高度范围
    let minTop=this.dataStore.canvas.height/9;//最小高度
    let maxTop=this.dataStore.canvas.height/5;//最大高度
    // let top=minTop+Math.random()*(minTop+maxTop);
    let top=100;
    //创建一组上下水管,并将其存入变量池的pipes数组中
    this.dataStore.get('pipes').push(new UpPipe(top));
    this.dataStore.get('pipes').push(new DownPipe(top));
  }

  //判断游戏结束的条件
  check(){
    //游戏结束的条件:撞天,撞地,撞水管
    let pipes=this.dataStore.get('pipes');
    let birds=this.dataStore.get('birds');
    let land=this.dataStore.get('land');
    //撞天(小鸟的y坐标小于0),撞地(小鸟的y坐标+自身的高大于地板的位置)
    if(birds.birdsY[0]<0 || birds.birdsY[0]+birds.clippingHeight[0]>land.y){
      this.isGameOver=true;
      return;
    }
    //判断小鸟与水管是否相撞
    let birdsBorder={
      top:birds.birdsY[0],//小鸟的顶部
      bottom:birds.birdsY[0]+birds.clippingHeight[0],//小鸟的底部
      left:birds.birdsX[0],//小鸟的左边
      right:birds.birdsX[0]+birds.clippingWidth[0],//小鸟的右边
    }
    //遍历水管,获取每一根水管的4条边
    for(let i=0;i<pipes.length;i++){
      let p=pipes[i];
      //定义每一根水管的边框
      let pipeBorder={
        top: p.y,
        bottom: p.y + p.h,
        left: p.x,
        right: p.x + p.w,
      }
      //判断小鸟和每一根水管的位置关系
      if(this.isStrike(birdsBorder,pipeBorder)){
        this.isGameOver=true;
        return;
      }
    }

  }

  //程序运行的方法
  run(){
    //先检查游戏有没有结束
    this.check();
    if(!this.isGameOver){//游戏没有结束
      //从变量池中获取图片并将其渲染在屏幕上
      this.dataStore.get('background').draw();
      //获取水管数组
      //创建水管
      let pipes=this.dataStore.get('pipes');//获取水管
      //创建水管的条件,第一组出界消失,第二组越过中间线
      //删除出界的水管,水管的x坐标 小于 水管宽度的负值
      if(pipes[0].x<-pipes[0].w && pipes.length==4){
        //一次删除一组水管,shift删除两次
        pipes.shift();
        pipes.shift();
      }
      //添加下一组水管:当前只有一组水管,且这组水管已经越过中间线
      if(pipes[0].x < this.dataStore.canvas.width/2 && pipes.length==2){
        this.createPipes();
      }
      pipes.forEach(pipe=>{//遍历水管组,获取里面的每个水管
        //调用水管对象的方法
        pipe.draw();
      })

      this.dataStore.get('birds').draw();
      this.dataStore.get('land').draw();
      this.id=requestAnimationFrame(()=>this.run());
    }else{//游戏结束
      cancelAnimationFrame(this.id);
    }
    
  }


}








