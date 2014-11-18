

Player = function(game) {

	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.alive = false;
};

Player.prototype = {

	preload: function () {
		this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
		this.alive = true;

		this.game.load.audio('jump', 'assets/sound/jump.wav');
		this.game.load.audio('eatStar', 'assets/sound/ShurikenPowerUp.wav');
	},

	create: function (lives) {
		// Jump sound
		this.jump_s = game.add.audio('jump');

		//Assign a default number of player lives of none is given
		this.lives = typeof lives != undefined ? lives : 3;

		this.star_s = this.game.add.audio('eatStar');

		this.sprite = game.add.sprite(0, 32, 'dude');

		this.game.physics.arcade.enable(this.sprite);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.sprite.body.bounce.y = 0.2;
	    this.sprite.body.gravity.y = 500;
	    

	    // prevent collision detection from all directions but up
		// this.sprite.body.checkCollision.left = false;
		this.sprite.body.checkCollision.right = false;
		this.sprite.body.checkCollision.up = false;

	    
	    // Kill the player if he falls out of the game world
	    this.sprite.body.checkWorldBounds = true;
	    // this.sprite.body.collideWorldBounds = false;
		this.sprite.body.outOfBoundsKill = true;

	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	collectStar: function(player, star) {
	    // Removes the star from the screen
	    this.star_s.play('', 0, 0.4);
	    star.kill();

	    //  Add and update the score
	    hud.score += 10;
	},

	deductLife: function(player, missile){
		hud.lives -= 1;

		hud.lives === 0? this.shutdown: hud.lives += 1;
		//else
		//	game.state.start('Menu');
	},

	collide: function (player, ledge) {
		ledge.body.velocity.y =  30;
	},

	shutdown: function () {
		// End game
		this.sprite.kill();
		game.world.removeAll();
	},

	jump: function () {
		this.sprite.body.velocity.x = 0;

	    if(this.cursors.left.isDown)
	    {
	    	this.sprite.body.velocity.x = -250;

	    	this.sprite.animations.play('left');
	    }
	    else if(this.cursors.right.isDown)
	    {
	    	this.sprite.body.velocity.x = 250;

	    	this.sprite.animations.play('right');
	    }
	    else
	    {
	    	this.sprite.animations.stop();
	    	this.sprite.frame = 4;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (this.cursors.up.isDown && this.sprite.body.touching.down)
	    {
	        this.sprite.body.velocity.y = -500;
	        this.jump_s.play('', 0, 0.2);
	    }
	},

	update: function() {

		//  Collide the player and the stars with the platforms
    	this.game.physics.arcade.collide(this.sprite, level.platforms); // , this.collide, null, this);

    	this.game.physics.arcade.overlap(this.sprite, level.stars, this.collectStar, null, this);

    	this.game.physics.arcade.collide(this.sprite, level.start_);

    	this.game.physics.arcade.collide(this.sprite, level.ground, this.deductLife, null, this);

    	// this.game.physics.arcade.collide(this.sprite, missile.missiles, this.deductLife, null, this);

    	// this.game.physics.arcade.collide(this.sprite, missile.missiles, missile.explode, null, this);

    	this.jump();


	}

};