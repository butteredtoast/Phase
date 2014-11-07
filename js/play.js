Game.Play = function (game) {

};

var player;
var cursors;
var enemies;
var powerup;
var platforms;

Game.Play.prototype = {
	
	preload: function () {
		game.load.spritesheet('player', 'assets/images/dude.png', 35, 48);
	},

	create: function () {
		// bind all direction keys
		cursors = game.input.keyboard.createCursorKeys();

		// enable the arcade physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// add a background
		game.add.sprite('sky');

		// load player
		player = game.add.sprite(32, game.world.height - 300, 'player');

		// Enable physics on the player
		game.physics.arcade.enable(player);

		// player physics properties
		player.body.bounce.y = 0;
		player.body.gravity = 200;
		player.collideWorldBounds = true;
		
		// Allow player to walk in one direction. For now
		player.animations.add('right', [5,6,7,8], 10, true);
		player.animations.add('left', [0,1,2,3], 10, true);

		// Create groups of enemies
		// enemies = game.add.group();
		// enemies.createMultiple(40, 'enemy');
		// enemies.setAll('outofBoundsKill', true);
		// enemyTime = 0;

		// Spawn enemies at random intervals
		// Falling at an angle towards the player
		// Collision with the player leads to his death

		// ************************************************
		// Enemy logic here
		// ************************************************

		// platforms on which the player will jump on to avoid death
		platforms = game.add.group();

		// enable physics for all objects in the platform group
		platforms.enableBody = true;

		// first platform from which the player begins his journey
		this.startLedge = platforms.create(32, game.world.height - 200, 'platform');
		this.startLedge.body.immovable = true;

		// Spawn power ups every x distanc(?)
		powerup = game.add.group();
		powerup.createMultiple(10, 'pu_shuriken');

		// Spawn platforms for the player to jump on
		// Moving right to left in perpetuity and at different heights
		
		//this.labelScore = game.add.text(30, 30, 'score: 0', {font: '50px Arial', fill: '#fff'});
		this.score = 0;
		this.bestScore = 0;
		
		//this.kill_s = game.add.audio('kill');
		this.jump_s = game.add.audio('jump');
		// player_s = game.add.audio('coin');
		this.dead_s = game.add.audio('dead');

		//game.add.audio('music').play('', 0, 1, true);
	},

	collectPower: function () {},

	// these next two functions have similar logic, but for the object.
	// rewrite it as one function that takes an object and a time value
	// spawnNew: function (object, time) {},
	// newEnemy: function () {},

	// newPower: function () {},


	update: function () {
		// Set the player and the powerups on the platforms
		game.physics.arcade.collide(player, this.startLedge);
		// game.physics.arcade.collide(powerup, platforms);
		
		// Check for collision between player and enemy.
		// game.physics.arcade.overlap(player, enemy, playerHit, null, this);

		// Check to see if the player has collided with a powerup. 
		// If so, collect_powerup
		// game.physics.arcade.overlap(player, powerup, collectPower, null, this);

		
	}
};