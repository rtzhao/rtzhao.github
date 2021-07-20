/* 在文档加载后激活函数:根据类选择器获取到按钮对象，当按钮被点击时触发事件，
方法执行 CSS 属性集的自定义动画，获取到对应模块的上边框相对于文档顶端的偏移量，
设置垂直滚动条偏移量大小的位置，即实现点击按钮后页面滚动到对应模块位置
*/
$(document).ready(function(){
	$('.option1').click(function(){
		$('html,body').animate({
			scrollTop: $('#self-intro').offset().top
		},800);
	});
	$('.option2').click(function(){
		$('html,body').animate({
			scrollTop: $('#showskill').offset().top
		},800);
	});
	$('.option3').click(function(){
		$('html,body').animate({
			scrollTop: $('#articles').offset().top
		},800);
	});
	
	$('.option5').click(function(){
		$('html,body').animate({
			scrollTop: $('#contactMe').offset().top
		},800);
	});
});