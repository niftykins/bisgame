Weapon = function(game, weapon, owner) {
	this.game = game;
	this.owner = owner;
	this.sprite = null;
	this.data = {};
	this.last = null;

	this.current = weapon || null;

	this.weapons = {
		"sword1": {
			file: "combat_sword_1"
		}
	};
};

Weapon.prototype = {
	preload: function() {
		for(var prop in this.weapons) {
			var weapon = this.weapons[prop];
			this.game.load.spritesheet(prop, 'assets/' + weapon.file + '.png', 100, 100);
			// FIXME do we need this since it's just the same as will's combat one?
			//this.game.load.text(prop + 'JSON', 'assets/' + weapon.file + '.json');
		}
	},

	create: function(mode) {
		// make sure the weapon we're trying to use is real
		if(!(this.current in this.weapons))
			this.current = 'sword1';

		// if we don't already have data about this weapon get it
		if(!(this.current in this.data))
				//this.data[this.current] = JSON.parse(this.game.cache.getText(this.current + 'JSON'));
				this.data[this.current] = JSON.parse(this.game.cache.getText('playerCombatJSON'));

		this._create[mode || 'explore'].call(this);
	},

	update: function(mode) {
		this.sprite.x = this.owner.x;
		this.sprite.y = this.owner.y;

		this._update[mode || 'explore'].call(this);
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

	setWeapon: function(name, mode) {
		this.sprite.destroy();

		this.current = name;
		this.create(mode);
	},

	play: function(name, loop) {
		this.sprite.play(name, null, loop);
	},

	_create: {
		title: function() {

		},

		explore: function() {

		},

		combat: function() {
			this.sprite = this.game.add.sprite(this.owner.x, this.owner.y, this.current, 4);

			this.fillAnimations(this.current);

			this.sprite.anchor.setTo(0.5, 0.5);
			this.sprite.play('idle');
		}
	},

	_update: {
		title: function() {

		},

		explore: function() {

		},

		combat: function() {

		}
	}, 

	// remove reference to variables for garbage collection
	clean: function() {
		
	}
};