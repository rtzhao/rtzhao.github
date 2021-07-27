window.onload=function() {
	
	var canvas = document.getElementById("canvas");//根据id获取canvas对象
	var context = canvas.getContext("2d");//Canvas绘制上下文
	
	//获取页面宽高以及设置canvas宽高
	var WINDOW_WIDTH = document.getElementById("time_container").offsetWidth;
	var WINDOW_HEIGHT = document.getElementById("time_container").offsetHeight;

	var RADIUS = 1.5; //球半径
	var NUMBER_GAP =1.5; //数字之间的间隙
	var u = 0.65; //碰撞能量损耗系数 
	var balls = []; //存储彩色的小球
	//彩色小球的颜色
	const colors = ["#0085c3", "#7ab800", "#f2af00", "#dc5034", "#6e2585", "#71c6c1", "#5482ab", "#009bbb","#ce1126", "#ff0092"]; 
	var currentNums = []; //屏幕显示的8个字符
	// 使用0、1表示数字0-9以及':'
	var digit = [
		[
			[0, 0, 1, 1, 1, 0, 0],
			[0, 1, 1, 0, 1, 1, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 0, 1, 1, 0],
			[0, 0, 1, 1, 1, 0, 0]
		], //0
		[
			[0, 0, 0, 1, 1, 0, 0],
			[0, 1, 1, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[1, 1, 1, 1, 1, 1, 1]
		], //1
		[
			[0, 1, 1, 1, 1, 1, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 1, 1, 0, 0, 0],
			[0, 1, 1, 0, 0, 0, 0],
			[1, 1, 0, 0, 0, 0, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1]
		], //2
		[
			[1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 1, 1, 1, 0, 0],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 1, 1, 0]
		], //3
		[
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 1, 1, 1, 0],
			[0, 0, 1, 1, 1, 1, 0],
			[0, 1, 1, 0, 1, 1, 0],
			[1, 1, 0, 0, 1, 1, 0],
			[1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 1, 1, 1, 1]
		], //4
		[
			[1, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 0, 0, 0, 0],
			[1, 1, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 0],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 1, 1, 0]
		], //5
		[
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 1, 1, 0, 0, 0],
			[0, 1, 1, 0, 0, 0, 0],
			[1, 1, 0, 0, 0, 0, 0],
			[1, 1, 0, 1, 1, 1, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 1, 1, 0]
		], //6
		[
			[1, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 0, 1, 1, 0, 0, 0],
			[0, 0, 1, 1, 0, 0, 0],
			[0, 0, 1, 1, 0, 0, 0],
			[0, 0, 1, 1, 0, 0, 0]
		], //7
		[
			[0, 1, 1, 1, 1, 1, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 1, 1, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 1, 1, 0]
		], //8
		[
			[0, 1, 1, 1, 1, 1, 0],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[1, 1, 0, 0, 0, 1, 1],
			[0, 1, 1, 1, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 1, 1, 0, 0],
			[0, 1, 1, 0, 0, 0, 0]
		], //9
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		] //:
	];
	
	// 绘制画面的主函数
	function drawDatetime(context) {
		
		var nums = [];//存储当前时间两位数表示共6位，以及两个冒号，共8个数字
		context.fillStyle = "#000";//时间主主体用黑色填充
		
		var date = new Date();//获取当前时间
		
		var offsetX = 70,offsetY = 30;//     存疑
			
		// 获取当前时间的小时位，不足两位的，首尾为0
		var hours = date.getHours();
		var num1 = Math.floor(hours / 10);
		var num2 = hours % 10;
		nums.push({num: num1});
		nums.push({num: num2});
		nums.push({num: 10}); //冒号
		
		// 获取当前时间的分钟位，不足两位的，首尾为0
		var minutes = date.getMinutes();
		var num1 = Math.floor(minutes / 10);
		var num2 = minutes % 10;
		nums.push({num: num1});
		nums.push({num: num2});
		nums.push({num: 10}); //冒号
		
		// 获取当前时间的秒数位，不足两位的，首尾为0
		var seconds = date.getSeconds();
		var num1 = Math.floor(seconds / 10);
		var num2 = seconds % 10;
		nums.push({num: num1});
		nums.push({num: num2});
		
		// 遍历nums数组中的每个数
		for (var x = 0; x < nums.length; x++) {
			
			nums[x].offsetX = offsetX;
			
			// 调用drawSingleNumber绘制每个数对应的小球，并返回小球间距
			offsetX = drawSingleNumber(offsetX, offsetY, nums[x].num,context);
			
			//将前后两个数字连一块，中间间隔一些距离NUMBER_GAP（之前设置为10）
			if (x < nums.length - 1) {
				if ((nums[x].num != 10) && (nums[x + 1].num != 10)) {
					offsetX += NUMBER_GAP;
				}
			}
		}

		//但currentNums为0时，说明是初始化
		if (currentNums.length == 0) {
			currentNums = nums;
		} else {
			//非初始化的情况下，遍历数组中的所有数
			for (var index = 0; index < currentNums.length; index++) {
				//当currentNums与num中数量不一样时，代表显示的位数变化，如1变2等，需要添加彩色小球
				if (currentNums[index].num != nums[index].num) {
					//根据当前时间数组的索引，调用addBalls函数，添加小球；并将屏幕显示的字符数调整为实际该显示的数
					addBalls(nums[index]);
					currentNums[index].num = nums[index].num;
				}
			}
		}
		
		// 绘制初始位置的小球
		renderBalls(context);
		
		// 更改每个球的位置
		updateBalls();

		return date;
	}
	
	// 添加彩色小球函数，将生成的小球添加到balls小球数组
	function addBalls(item) {
		var num = item.num;
		var numMatrix = digit[num]; //根据传过来的参数，从digit数组中确定需要产生彩色小球的具体数字对应的0、1数组
		// 遍历该数字数组的所有行和列，在该0、1数组含有1的位置生成一个ball对象，并将其添加到balls数组中
		for (var y = 0; y < numMatrix.length; y++) {
			for (var x = 0; x < numMatrix[y].length; x++) {
				if (numMatrix[y][x] == 1) {
					// 设置ball的offsetX、offsetY、有color数组随机出来的颜色、下坠速度差异g、x和y方向的初始速度
					var ball = {
						offsetX: item.offsetX + RADIUS + RADIUS * 2 * x,
						offsetY: 30 + RADIUS + RADIUS * 2 * y,
						color: colors[Math.floor(Math.random() * colors.length)],
						g: 1.5 + Math.random(),
						vx: Math.pow(-1, Math.ceil(Math.random() * 10)) * 6 + Math.random(),
						vy: -5
					}
					balls.push(ball);
				}
			}
		}
	}
	
	// 绘制小球函数，遍历小球数组中所有小球，获取圆心位置及填充颜色进行彩色全部彩色小球静止时位置的绘制
	function renderBalls(context) {
		for (var index = 0; index < balls.length; index++) {
			context.beginPath();
			context.fillStyle = balls[index].color;
			context.arc(balls[index].offsetX, balls[index].offsetY, RADIUS, 0, 2 * Math.PI);
			context.fill();
		}
	}
	
	// 赋予彩色小球以运动以及触底反弹，同时将超出页面范围外的小球踢出小球队列
	function updateBalls() {
		var i = 0;
		// 遍历小球数组中的每个小球，将初始x、y方向的速度赋给它的位置，使其开始运动，并对y方向添加额外速度，使小球之间下坠时有差别
		for (var index = 0; index < balls.length; index++) {
			var ball = balls[index];
			ball.offsetX += ball.vx;
			ball.offsetY += ball.vy;
			ball.vy += ball.g;
			
			// 当小球下端触碰到屏幕底部时，让其重新回到屏幕底端并更新其y方向的速度，变为原来的反向并乘以一个碰撞能量损耗系数
			if (ball.offsetY > (WINDOW_HEIGHT - RADIUS)) {
				ball.offsetY = WINDOW_HEIGHT - RADIUS;
				ball.vy = -ball.vy * u;
			}
			// 当小球跳出页面左右时，将当前小球的index交给i
			if (ball.offsetX > RADIUS && ball.offsetX < (WINDOW_WIDTH - RADIUS)) {

				balls[i] = balls[index];
				i++;
			}
		}
		//	根据i，去除出边界的球
		for (; i < balls.length; i++) {
			balls.pop();
		}
	}
	
	// 针对每一个数字进行绘制，并返回小球间距
	function drawSingleNumber(offsetX, offsetY, num, context) {
		var numMatrix = digit[num];//根据参数num获取存储在digit数组中的数字0、1数组
		// 遍历数字数组的所有行和列，在该0、1数组含有1的位置调用Canvas上下文的arc，根据圆心、半径绘制弧形，并填充颜色（之前设置的fillStyle为黑色）
		for (var y = 0; y < numMatrix.length; y++) {
			for (var x = 0; x < numMatrix[y].length; x++) {
				if (numMatrix[y][x] == 1) {
					context.beginPath();
					context.arc(offsetX + RADIUS + RADIUS * 2 * x, offsetY + RADIUS + RADIUS * 2 * y, RADIUS, 0, 2 *
						Math.PI);
					context.fill();
				}
			}
		}
		context.beginPath();//重置路径
		
		// 计算并返回小球元素间距
		offsetX += numMatrix[0].length * RADIUS * 2;
		return offsetX;
	}

	//每50毫秒，清空整个Canvas，调用drawDatetime重新绘制内容
	setInterval(function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawDatetime(context);
	}, 50)
	
}
