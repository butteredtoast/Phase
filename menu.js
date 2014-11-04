Game.Menu = function (game) { };

Game.Menu.prototype = {
	create: function () {
		game.add.sprite(0,0, 'background');
		label = game.add.text(centerPoint.x, centerPoint.y, 'Press UP or RIGHT key to advance to the game', {font: '50px, Arial', fill: '#fff', anchor: 'center'});
		this.cursor = game.input.keyboard.createCursorKeys();
	},

	update: function () {
		if (this.cursor.up.isDown)
			game.state.start('Play');
		else if (this.cursor.right.isDown)
		 	game.state.start('Play');

		/*	else if (this.cursor.down.isDown)
		 *		game.state.start('Exit');
		 *  
		 *  else if (this.cursor.left.isDown)
		 *		game.state.start('Exit');
		 */
	}
};