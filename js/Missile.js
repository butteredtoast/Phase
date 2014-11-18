Missile = function(game) {
    this.game = game;
        
    // Define constants that affect motion
    this.SPEED = 150; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame

};

Array.range = function(start, end, step) {
    var A = [];
    if (typeof a == 'number'){
        A[0] = a;
        step = step || 1;
        while(a+step<=b){
            A[A.length]= a += step;
        }
    }
};


Missile.prototype = {
    preload: function () {
        this.game.load.image('missile', 'assets/images/rocket.png');
        this.game.load.spritesheet('smoke', 'assets/images/smoke.png');

        this.game.load.spritesheet('explosion', 'assets/images/explosion1.png', 128, 128);

        this.game.load.audio('hit', 'assets/sound/bomb.ogg');
        
    },
    
    create: function () {
        this.missiles = this.game.add.group();
        this.explosions = this.game.add.group();

        this.boom_s = game.add.audio('hit');

        this.smokeemission = this.game.add.group();

        this.launchMissile();

        this.timer = this.game.time.events.loop(2000, this.launchMissile, this);
    },

    launchMissile: function () {
        this.missile = this.missiles.getFirstDead();
        
        // If there aren't any missiles, create a new one
        if (this.missile === null) {
            this.missile = this.game.add.sprite(this.game.rnd.integerInRange(30, this.game.width), this.game.rnd.integerInRange(30, 100), 'missile');
            this.game.physics.arcade.enable(this.missile);
            this.missiles.add(this.missile);

            var smoke = this.game.add.emitter(0,0,100);
            smoke.gravity = 0;
            smoke.setXSpeed(0,0);
            smoke.setYSpeed(-80, -50); // make smoke drift upwards

            //make particles fade after a sec
            smoke.setAlpha(1,0, 1000, Phaser.Easing.Linear.InOut);

            // make particles
            smoke.makeParticles('smoke');

            // start emitting one at a time
            smoke.start(false, 3000, 50);

            //create a point object to hold the pos of the smoke emitter relative
            // to the center of the missile

            smokePos = new Phaser.Point(this.width/2, 0);

            var p = smokePos.rotate(0,0, this.missile.rotation);

            // Position the smoke emitter at the new coordinates relative to 
            // the center of the missile
            smoke.x = this.missile.x - p.x;
            smoke.y = this.missile.y - p.y;

        }

        // this.missile.revive();
        this.missile.reset(this.game.rnd.integerInRange(30, this.game.width), this.game.rnd.integerInRange(30, 100));

        
        return this.missile;
    },
    

    explode: function (missile, object) {
        var explosion = this.game.add.sprite(missile.x, missile.y, 'explosion');
        explosion.anchor.setTo(0.5, 0,5);

        // Add an animation for the explosion that kills the sprite when
        // the animation is complete
        var animation = explosion.animations.add('boom', [4], 60, false);
        animation.killOnComplete = true;

        // set position of the explosion
        explosion.x = missile.x;
        explosion.y = missile.y;

        // set rotation of explosion at random for a little variety
        // explosion.angle = this.game.rnd.integerInRange(0,360);

        // Play the animation
        explosion.animations.play('boom');
        this.boom_s.play('', 0, 0.3);
        missile.kill();


    },

    deductLife: function(player, missile){
        hud.lives -= 1;

        hud.lives === 0? this.shutdown: hud.lives = 0;
    },

    move: function (missile, player) {
        x = player.sprite.x;
        y = player.sprite.y;
        
        // Calculate the angle between the player and the missile
        var targetAngle = this.game.math.angleBetween(missile.x, missile.y, x, y);
        
        // Gradually aim the missile towards the player
        if (missile.rotation !== targetAngle) {
            // Calculate the distance between the current angle and the targetAngle
            var delta = targetAngle - missile.rotation;
            
            // for efficient turns, keep it between -180 and 180
            if (delta > Math.PI) delta -= Math.PI * 2;
            if (delta < -Math.PI) delta += Math.PI * 2;
            
            if (delta > 0) {
                // Turn clockwise
                missile.angle += this.TURN_RATE;
                
            } 
            else {
            // Turn counter-clockwise
                missile.angle -= this.TURN_RATE;
            }
            
            // Just set angle to target angle if they are close
            if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
                missile.rotation = targetAngle;
            }

        }
        
        missile.body.velocity.x = Math.cos(missile.rotation) * this.SPEED;
        missile.body.velocity.y = Math.sin(missile.rotation) * this.SPEED;
        
        
    },
    
    update: function () {

        this.move(this.missile, player);

        // this.game.physics.arcade.collide(this.missile, level.ground, this.explode, null, this);
        this.game.physics.arcade.collide(this.missile, level.platforms, this.explode, null, this);
        this.game.physics.arcade.collide(this.missile, player.sprite, this.explode, null, this);
        this.game.physics.arcade.collide(this.missile, player.sprite, this.deductLife, null, this);
        
    }
};