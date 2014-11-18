
HUD = function(game) {
	this.game = game;
	this.score = 0;
	this.lives = 3;
	this.scoreText = null;
	this.livesText = null;
};

HUD.prototype = {

	create: function(player) {
		var style = { font: '32px Arial', fill: '#ffffff', align: 'center'};
		this.scoreText = this.game.add.text(16, 16, 'score: 0', style);
		this.livesText =this.game.add.text(game.width - 200, 16, 'lives: 3', style);
	},

	update: function () {
		this.scoreText.setText("score: " +this.score);
		this.livesText.setText("lives: " +this.lives);
	}

};