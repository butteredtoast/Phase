Game = {};

var stageSize = {width: 800, height: 600};
var centerPoint = {x: stageSize.width / 2, y: stageSize.height / 2 };
var death = 3;
var score = 0;

function rand(num) {return Math.floor(Math.random() * num) };

Game.Boot = function (game) {};

Game.Boot.prototype = {
	preload: function () {
		game.stage.backgroundColor = "#0099ff";
		game.load.image('loading', 'assets/images/loading.png');
		game.load.image('loading2', 'assets/images/loading2.png');
	},

	create: function () {
		game.state.start('Load');
	}
};

Game.Load = function (game) {};

Game.Load.prototype = {
	preload: function () {
			
		label = game.add.text(Math.floor(stageSize.width /2)+0.5, Math.floor(stageSize.height / 2)-150+0.5, 'loading... ', {font: '30px Arial', fill: '#2c3e50'});
		label.anchor.setTo(0.5, 0.5);

		preloading2 = game.add.sprite(stageSize.width /2, stageSize.height/2 + 19, 'loading2');
		preloading2.anchor.setTo(0.5, 0.5);
		preloading2.x -= preloading2.width / 2;

		preloading = game.add.sprite(stageSize.width /2, stageSize.height / 2+19, 'loading');
		preloading.anchor.setTo(0.5, 0.5);
		preloading.x -= preloading.width / 2;

		game.load.setPreloadSprite(preloading);

		
		game.load.image('enemy', 'assets/images/enemy_frame1.png');
		game.load.spritesheet('player', 'assets/images/dude.png', 36, 48);
		game.load.image('platform', 'assets/images/platform.png');
		game.load.image('shuriken', 'assets/images/shuriken.png');
		game.load.image('power_up', 'assets/images/star.png');
		game.load.audio('hit', 'assets/sound/hit.wav');
		game.load.audio('jump', 'assets/sound/jump.wav');
	},

	create: function () {
		game.state.start('Menu');
	}

}; 