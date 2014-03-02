Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.data = {};
	this.weapon = null;

	this.health = 100;
	this.maxHealth = 150;

	this.mana = 35;
	this.maxMana = 60;

	this.armour = 0;

	this.keys = {};

	this.pos = {};
};

Player.prototype = {
	preload: function() {
		this.game.load.spritesheet('player', 'assets/will.png', 53, 80);
		this.game.load.spritesheet('playerCombat', 'assets/will_combat.png', 100, 100);
		this.game.load.text('playerJSON', 'assets/will.json');
		this.game.load.text('playerCombatJSON', 'assets/will_combat.json');
	},

	create: function(mode) {
		// parse the info about this sprite
		this.data.explore = JSON.parse(this.game.cache.getText('playerJSON'));
		this.data.combat = JSON.parse(this.game.cache.getText('playerCombatJSON'));

		this._create[mode || 'explore'].call(this);

		this.sprite.health = this.health;
	},

	update: function(mode) {
		if(this.weapon)
			this.weapon.update();

		this.sprite.health = this.health;
		this.pos.x = this.sprite.x;
		this.pos.y = this.sprite.y;

		this._update[mode || 'explore'].call(this);
	},

	render: function(mode) {
		this._render[mode || 'explore'].call(this);
	},

	fillAnimations: function(mode) {
		var sprite = this.sprite, data = this.data[mode];
		for(var prop in data.animations) {
			var anim = data.animations[prop];
			var frames = Helpers.frameRange(anim.length, anim.row, data.cols);
			var loop = anim.loop === false ? false : true;

			sprite.animations.add(prop, frames, anim.speed || 2, loop);
		}
	},

	play: function(name, withWeapon, loop) {
		if(typeof withWeapon === 'undefined') withWeapon = true;
		this.sprite.play(name, null, loop);

		if(withWeapon && this.weapon)
			this.weapon.play(name, loop);
	},

	damage: function(hit) {
		hit -= this.armour;

		if(hit < 0) hit = 0;

		this.health -= hit;

		if(this.health <= 0)
			this.kill();
		else
			this.play('hurt');
	},

	kill: function() {
		this.play('die');
	},

	_create: {
		title: function() {
			this.sprite = this.game.add.sprite(45, 130, 'player', 4);

			this.fillAnimations('explore');

			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.play('idle');
		},

		explore: function() {
			this.keys = Helpers.createKeys(this.game);

			this.sprite = this.game.add.sprite(this.pos.x, 120, 'player', 4);
			this.game.camera.follow(this.sprite);

			this.fillAnimations('explore');

			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.play('idle');
		},
		combat: function() {
			this.sprite = this.game.add.sprite(70, 120, 'playerCombat', 4);

			this.fillAnimations('combat');

			this.sprite.anchor.setTo(0.5, 0.5);

			this.sprite.events.onAnimationComplete.add(function(s, a) {
				if(a.name === 'die')
					this.game.state.start('title');
			}, this);

			// FIXME make a group with player + weapon?
			this.weapon = new Weapon(this.game, 'sword1', this.sprite);
			this.weapon.create('combat');

			this.sprite.play('idle');
		}
	},

	_update: {
		title: function() {

		},

		explore: function() {
			var v = this.sprite;

			if(this.keys.left.isDown || this.keys.a.isDown) {
				v.scale.x = -1;
				v.x += -2;
				this.play('walk', false);
			} else if(this.keys.right.isDown || this.keys.d.isDown) {
				v.scale.x = 1;
				v.x += 2;
				this.play('walk', false);
			} else {
				this.play('idle', false);
			}
		},

		combat: function() {
			var a = this.sprite.animations.currentAnim;
			if(a && a.isFinished) {
				this.play('idle', true);
			}
		}
	},

	_render: {
		explore: function() {
			this.game.debug.renderSpriteCorners(this.sprite, false, false);
		}
	},

	// remove reference to variables for garbage collection
	clean: function() {
		this.data = {};
		this.sprite = null;
		this.keys = {};
	}
};