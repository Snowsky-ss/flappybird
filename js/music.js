

export let playbgm=function(){
  let audio =wx.createInnerAudioContext();
  audio.src='audio/bgm.mp3';
  //设置是否为自动播放
  // audio.autoplay=true;
  audio.loop=true;
  //手动调用播放方法
  audio.play();
}

export let boom =function(){
  let audio=wx.createInnerAudioContext();
  audio.src='audio/boom.mp3';
  audio.play();
}

export let go =function(){
  let audio=wx.createInnerAudioContext();
  audio.src='audio/bullet.mp3';
  audio.play();
}







