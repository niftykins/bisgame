Combat = function(game, player) {
	this.game = game;
	this.player = player;

	this.positions = [
		{ x: -1, y: -1 },
		{ x: 420, y: 120 },
		{ x: 350, y: 120 }
	];

	this.spells = {
		"magic_fire_1": null
	};
};

Combat.prototype = {
	preload: function() {
		for(var spell in this.spells) {
			this.game.load.spritesheet(spell, 'assets/combat_' + spell + '.png', 100, 100);
			this.game.load.text(spell, 'assets/combat_' + spell + '.json');
		}
	},

	create: function() {
		for(var prop in this.spells) {
			this.spells[prop] = JSON.parse(this.game.cache.getText(prop));
		}
	},

	action: function(which) {
		this.positions[0].x = this.player.sprite.x;
		this.positions[0].y = this.player.sprite.y;

		switch(which) {
			case 'sword':
				this.player.play('swing', true);
				break;
			case 'magic':
				this.player.play('cast', true);
				this.spell('magic_fire_1', 0, 2);
				break;
			case 'defend':
				this.player.play('defend', true);
				break;
			case 'item':
				//this.player.play('', true);
				this.game.state.previous = this.game.state.current;
				this.game.state.start('inventory');
				break;
			case 'run':
				this.game.state.start('explore');
				break;
		}
	},

	// positions: 1: player, 2: right enemy, 3: left enemy
	spell: function(which, from, to) {
		from = this.positions[from];
		to = this.positions[to];

		var vel = 400;
		if(from.x < to.x) vel = vel;
		else vel = -vel;

		var s = new Spell(this.game, which, from.x, from.y, to.x, vel);
		this.game.add.existing(s);
	}
};


// FIXME fix animation creation
Spell = function(game, which, x, y, ex, vel) {
	Phaser.Sprite.call(this, game, x, y, which);

	this.game = game;

	this.anchor.setTo(0.5, 0.5);

	this.end = ex;
	this.vel = vel;
	
	this.fillAnimations(which);

	this.play('cast');
};

Spell.prototype = Object.create(Phaser.Sprite.prototype);
Spell.prototype.constructor = Spell;

Spell.prototype.update = function() {
	this.body.velocity.x = 0;
	
	var a = this.animations.currentAnim;
	if(a && (a.isFinished || a.name !== 'cast')) {
		if(this.x < this.end) {
			this.play('travel');
			this.body.velocity.x = this.vel;
		} else {
			this.play('hit', null, false, true);
		}
	}
};

Spell.prototype.fillAnimations = function(which) {
	var data = this.game.combat.spells[which];
	for(var prop in data.animations) {
		var anim = data.animations[prop];
		var frames = Helpers.frameRange(anim.length, anim.row, data.cols);
		var loop = anim.loop === false ? false : true;

		this.animations.add(prop, frames, anim.speed || 2, loop);
	}
};
