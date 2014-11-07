
HUD = function(game) {
	this.game = game;
	this.score = 0;
	this.scoreText = null;
};

HUD.prototype = {

	create: function() {
		var style = { font: '32px Arial', fill: '#ffffff', align: 'center'};
		this.scoreText = this.game.add.text(16, 16, 'score: 0', style);
	},

	update: function () {
		this.scoreText.setText("score: " +this.score);
	}

};