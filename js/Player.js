Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.data = {};
	this.last = null;
};

Player.prototype = {
	preload: function() {
		this.game.load.spritesheet('player', 'assets/will.png', 53, 80);
		this.game.load.text('playerJSON', 'assets/will.json');
	},
	create: function(mode) {
		// parse the info about this sprite
		this.data = JSON.parse(this.game.cache.getText('playerJSON'));

		this._create[mode || 'play'].call(this);
	},
	update: function(mode) {
		this._update[mode || 'play'].call(this);
	},

	fillAnimations: function() {
		var sprite = this.sprite, data = this.data;
		for(var prop in data.animations) {
			var anim = data.animations[prop];
			var frames = Helpers.frameRange(anim.length, anim.row, data.cols);

			sprite.animations.add(prop, frames, anim.speed || 2, true);
		}
	},

	_create: {
		title: function() {
			this.sprite = this.game.add.sprite(45, 130, 'player', 4);

			this.fillAnimations();

			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.play('idle');
		},

		play: function() {
			this.sprite = this.game.add.sprite(this.game.width/2, 120, 'player', 4);

			this.fillAnimations();

			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.play('idle');
		}
	},

	_update: {
		title: function() {
			var speed = 85;
			var s = this.sprite, v = s.body.velocity;
			
			v.x = 0;

			if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				v.x = -speed;
				s.animations.play('walk');
				s.scale.x = -1;
				this.last = 'left';
			} else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				v.x = speed;
				s.animations.play('walk');
				s.scale.x = 1;
				this.last = 'right';
			} else {
				s.animations.play('idle'); // either dir
			}
		},

		play: function() {

		}
	}, 

	// remove reference to variables for garbage collection
	clean: function() {
		
	}
};