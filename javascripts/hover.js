//算出到四方形某条边中点的位置
function toEdgeDist(x,y,x2,y2){
  const xDiff = x-x2;
  const yDiff = y-y2;
  return (xDiff**2 + yDiff**2);
}

//计算最近的边：调用函数toEdgeDist，比较获得最小的值，根据值返回最近的边
const closestDist = function(x,y,w,h){
  const toTop = toEdgeDist(x,y,w/2,0);
  const toBottom = toEdgeDist(x,y,w/2,h);
  const toLeft = toEdgeDist(x,y,0,h/2);
  const toRight = toEdgeDist(x,y,w,h/2);
  const minDist = Math.min(toTop,toBottom,toLeft,toRight);
  switch(minDist){
    case toTop:
      return 'top';
    case toBottom:
      return 'bottom';
    case toLeft:
      return 'left';
    case toRight:
      return 'right';
                }
}

/* 在文档加载后激活函数：根据类选择器获取小盒子的数量，遍历小盒子，
实现鼠标进入和离开小盒子时的动效，文字的显示和隐藏，并且会根据鼠标相对位置进行调整*/
$(document).ready(function(){
  const num = $(".boxes").length;
  for( let i = 0; i<num; i++){
	  /* 当鼠标进入小盒子时，执行如下函数：获取鼠标进入该小盒子时，相对小盒子的相对位置xywh，根据这四个参数调用closestDist函数，返回最近的边
根据对应的边，改变相应的样式和执行对应的动画：获取小盒子上覆盖的文字，首先将其处于隐藏的状态，之后执行动画让其显示出来；*/
    $('.boxes').eq(i).mouseenter(function(e){
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;
      const w = this.clientWidth;
      const h = this.clientHeight;
      console.log(x,y,w,h);
	    
      const enterResult = closestDist(x,y,w,h); 
      switch(enterResult){
        case 'top':
          $('.overlay').eq(i).css({'top':'-100%','left':'0%'});
          $('.overlay').eq(i).animate({top:'0%'},300);
          break;
        case 'bottom':
          $('.overlay').eq(i).css({'top':'100%','left':'0%'});
          $('.overlay').eq(i).animate({top:'0%'},300);
          break;
        case 'left':
          $('.overlay').eq(i).css({'left':'-100%','top':'0%'});
          $('.overlay').eq(i).animate({left:'0%'},300);
          break;
        case 'right':
          $('.overlay').eq(i).css({'left':'100%','top':'0%'});
          $(".overlay").eq(i).animate({left:'0%'},300);
          break;
                        }  
    });
	
	/* 当鼠标离开小盒子时，执行如下函数：获取鼠标进入该小盒子时，获取小盒子上覆盖的文字，首先将其处于正常的状态，
	获取鼠标离开时相对小盒子的相对位置xywh，根据这四个参数调用closestDist函数，返回最近的边
	根据对应的边，执行对应的动画，让其隐藏出来；*/
    $('.boxes').eq(i).mouseleave(function(e){
      $('.overlay').eq(i).css({'top':'0%','left':'0%'}); 
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;
      const w = this.clientWidth;
      const h = this.clientHeight;
	  
      const exitResult = closestDist(x,y,w,h);
      switch (exitResult){
        case 'top':
          $('.overlay').eq(i).animate({'top':'-100%'},300);
          break;
        case 'left':
          $('.overlay').eq(i).animate({'left':'-100%'},300);
          break;
        case 'right':
          $('.overlay').eq(i).animate({'left':'100%'},300);
          break;
        case 'bottom':
          $('.overlay').eq(i).animate({'top':'100%'},300);
          break;
                        }
    })
  }
})