Game.End = function (game) {
	
};

Game.End.prototype = {
	create: function () {
		label1 = game.add.text(stageSize.width /2, stageSize.height / 2 -20, 'Game Over!', { font: '30px Arial', fill: '#fff' });
		label1.setTo(0.5, 0.5);

		game.state.start('Menu');
	}	
};