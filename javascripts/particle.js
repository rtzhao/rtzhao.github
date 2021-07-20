/*  particles.js官方提供的经典背景配置文件
相关具体参数的调整先暂时不展开讲解*/ 
particlesJS("particles-js", {
	"particles": {
	  "number": {
	    "value": 80,
	    "density": {
	      "enable": true,
	      "value_area": 800
	    }
	  },
	  "color": {
	    "value": "#ffffff"
	  },
	  "shape": {
	    "type": "polygon",
	    "stroke": {
	      "width": 0,
	      "color": "#000000"
	    },
	    "polygon": {
	      "nb_sides": 5
	    },
	    "image": {
	      "src": "img/github.svg",
	      "width": 100,
	      "height": 100
	    }
	  },
	  "opacity": {
	    "value": 0.5,
	    "random": false,
	    "anim": {
	      "enable": false,
	      "speed": 1,
	      "opacity_min": 0.1,
	      "sync": false
	    }
	  },
	  "size": {
	    "value": 3,
	    "random": true,
	    "anim": {
	      "enable": false,
	      "speed": 40,
	      "size_min": 0.1,
	      "sync": false
	    }
	  },
	  "line_linked": {
	    "enable": true,
	    "distance": 150,
	    "color": "#ffffff",
	    "opacity": 0.4,
	    "width": 1
	  },
	  "move": {
	    "enable": true,
	    "speed": 6,
	    "direction": "none",
	    "random": false,
	    "straight": false,
	    "out_mode": "out",
	    "bounce": false,
	    "attract": {
	      "enable": false,
	      "rotateX": 600,
	      "rotateY": 1200
	    }
	  }
	},
	"interactivity": {
	  "detect_on": "canvas",
	  "events": {
	    "onhover": {
	      "enable": true,
	      "mode": "repulse"
	    },
	    "onclick": {
	      "enable": true,
	      "mode": "push"
	    },
	    "resize": true
	  },
	  "modes": {
	    "grab": {
	      "distance": 400,
	      "line_linked": {
	        "opacity": 1
	      }
	    },
	    "bubble": {
	      "distance": 400,
	      "size": 40,
	      "duration": 2,
	      "opacity": 8,
	      "speed": 3
	    },
	    "repulse": {
	      "distance": 200,
	      "duration": 0.4
	    },
	    "push": {
	      "particles_nb": 4
	    },
	    "remove": {
	      "particles_nb": 2
	    }
	  }
	},
	"retina_detect": false
});

var count_particles, stats, update;
// 创建stats对象，设置位置为左上角绝对位置，并以子节点的形式添加到body的末尾
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

// 获取文档中id为js-count-particles的第一个元素count_particles
count_particles = document.querySelector('.js-count-particles');
update = function() {
	stats.begin();
	stats.end();
	// 当粒子存在冰洁数组不为空时，将数组长度赋给count_particles
	if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
		count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
	}
	// 下一次重绘之前更新动画帧所调用的函数
	requestAnimationFrame(update);
};
requestAnimationFrame(update);
