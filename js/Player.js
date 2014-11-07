

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
	},

	create: function () {
		this.sprite = game.add.sprite(0, 32, 'dude');

		this.game.physics.arcade.enable(this.sprite);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.sprite.body.bounce.y = 0.2;
	    this.sprite.body.gravity.y = 500;
	    this.sprite.body.collideWorldBounds = true;

	    
	    // Kill the player if he falls out of the game world
	    this.sprite.checkWorldBounds = true;
		this.sprite.outOfBoundsKill = true;

	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

	    this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	collectStar: function(player, star) {
	    // Removes the star from the screen
	    star.kill();

	    //  Add and update the score
	    hud.score += 10;
	},

	killLedge: function (player, ledge) {
		// Removes the ledge once the player jumps off it
		if (this.cursors.up.isDown && this.sprite.body.touching.down)
	    {
	        ledge.kill();
	    }
	},

	shutdown: function () {
		// End game
		this.player.kill();
		game.world.removeAll();
	},

	update: function() {

		//  Collide the player and the stars with the platforms
    	this.game.physics.arcade.collide(this.sprite, level.platforms);

    	this.game.physics.arcade.overlap(this.sprite, level.stars, this.collectStar, null, this);

    	this.game.physics.arcade.collide(this.sprite, level.start_, this.killLedge);

    	this.game.physics.arcade.collide(this.sprite, level.ground, this.shutdown);

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
	    }
	}

};