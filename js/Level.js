
Level = function(game) {

	this.game = game;

	this.platforms = null;
	this.stars = null;
};

Level.prototype = {

	rand: function(min, max) { 
		// Returns a random int between min(inclusive) and max(inclusive)
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	preload: function() {
		this.game.load.image('sky', 'assets/images/sky.png');
    	this.game.load.image('ground', 'assets/images/platform.png');
    	this.game.load.image('star', 'assets/images/star.png');
	},

	create: function() {

		// add background for this level
		this.game.add.sprite(0, 0, 'sky');

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

 		//  The platforms group
    	this.platforms = this.game.add.group();
    	this.platforms.enableBody = true;
    	this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
    	
    	// Prevent platforms from colliding with the player
    	// from every direction but the top
    	this.platforms.setAll('body.allowCollision.down', false);
    	this.platforms.setAll('body.allowCollision.right', false);
    	this.platforms.setAll('body.allowCollision.left', false); 

	    // Create the ground
	    this.ground = this.platforms.create(0, game.world.height - 64, 'ground');
	    this.ground.scale.setTo(2, 2); // Stretch to fill screen
	    this.ground.body.immovable = true;

	    // Create a start ledge
	    this.start_ = this.platforms.create(-180, 300, 'ground');
	    this.start_.scale.setTo(0.5, 0.5);
	    this.start_.body.immovable = true;

	    //  Create multiple ledges
	    this.platforms.createMultiple(100, 'ground');

	    // create a group for stars
	    this.stars = this.game.add.group();
	    this.stars.enableBody = true;
	    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
	    this.stars.createMultiple(10, 'star');

	    this.timer = this.game.time.events.loop(1000, this.createNewLedge, this);
	    this.timer1 = this.game.time.events.loop(10000, this.createNewStar, this);
	},

	createNewStar: function() {
		var star = this.stars.getFirstDead();

		var x = this.rand(400,750);
		var y = this.rand(100, 300);

		star.reset(x,y);

		star.body.gravity.y = 0;

		star.checkWorldBounds = true;

		star.outOfBoundsKill = true;
	},

	createNewLedge: function () {
		// Get the first dead pipe of the group
		var ledge = this.platforms.getFirstDead();

		var x = 750;
		var y = this.rand(250, 450);

		ledge.reset(x, y);

		// Make the length of the ledge be variable
		ledge.scale.setTo(0.5, this.rand(0.5, 1));

		// move ledge to the left
		ledge.body.velocity.x = -200;

		// fall away when stepped on
		ledge.body.immovable = false;

		// kill it when it's no longer visible
		ledge.checkWorldBounds = true;
		ledge.outOfBoundsKill = true;
	},


	update: function() {
		this.game.physics.arcade.overlap(this.stars, this.platforms);
	}

};