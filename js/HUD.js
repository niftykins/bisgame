HUD = function(game) {
	this.game = game;

	this.font = 'Minecraftia';
	this.fill = '#FFF';

	this.title = {
		style: {font: '50px ' + this.font, fill: this.fill},
		pos: {x: 14, y: 5}
	};
	this.secondary = null;
	this.health = {};
	this.mana = {};

	this.combatButtonNames = ['sword', 'magic', 'defend', 'item', 'run'];
};

HUD.prototype = {
	preload: function() {
		// always
		this.game.load.image('border', 'assets/border.png');
		this.game.load.bitmapFont('pixelFont', 'assets/fonts/font_0.png', 'assets/fonts/font.fnt');

		// title
		this.game.load.image('titleBackground', 'assets/title_bg.png');

		// combat / explore ui
		this.game.load.spritesheet('combatButtons', 'assets/combat_buttons.png', 36, 36);
		this.game.load.image('healthBar', 'assets/healthbar.png');
		this.game.load.image('manaBar', 'assets/manabar.png');

		// inventory
		this.game.load.image('inventory', 'assets/inventory.png');
	},

	create: function(mode) {
		mode = mode || 'play';

		this._create[mode].call(this);

		this.game.add.sprite(0, 0, 'border');
	},

	update: function(mode) {
		this._update[mode || 'play'].call(this);
	},

	render: function(mode) {
		this._render[mode || 'play'].call(this);
	},

	updateBar: function(which) {
		var bar = this[which].bar;
		var text = this[which].text;
		var current = player[which];

		var max;
		if(which === 'health') max = player.maxHealth;
		else if(which === 'mana') max = player.maxMana;

		bar.scale.x = current / max * 100;
		text.setText(current + '/' + max);
	},

	createBars: function() {
		// health and mana bars
		var style = {font: '18px ' + this.font, fill: this.fill};
		this.health.bar = this.game.add.sprite(517, 15, 'healthBar');
		this.health.bar.anchor.setTo(1, 0);
		this.health.text = this.game.addText(515, 13, '', style);
		this.health.text.anchor.setTo(1, 0);

		this.mana.bar = this.game.add.sprite(517, 35, 'manaBar');
		this.mana.bar.anchor.setTo(1, 0);
		this.mana.text = this.game.addText(515, 32, '', style);
		this.mana.text.anchor.setTo(1, 0);

		var empty = this.game.add.sprite();
		empty.addChild(this.health.text);
		empty.addChild(this.mana.text);

		this.updateBar('health');
		this.updateBar('mana');
	},

	_create: {
		title: function() {
			var t = this.title;
			t.text = this.game.addText(t.pos.x, t.pos.y, "BEST IN SLOT", t.style);

			this.game.add.sprite(8, 64, 'titleBackground');

			this.secondary = this.game.addText(400, 115, "CLICK TO PLAY", {
				font: '30px ' + this.font, fill: this.fill
			});
			this.secondary.anchor = new Phaser.Point(0.5, 0.5);
		},

		explore: function() {
			var button = this.game.add.sprite(20, 14, 'combatButtons', 3);
			button.input.start(0, true);
			button.events.onInputUp.add(function() {
				this.game.state.start('inventory');
			}, this);

			this.createBars();
		},

		combat: function() {
			// create the combat move buttons
			var x = 20, i = 0;
			this.combatButtonNames.forEach(function(name) {
				var button = this.game.add.sprite(x, 14, 'combatButtons', i);

				button.name = name;
				button.input.start(0, true);

				button.events.onInputUp.add(function(me) {
					this.game.combat.action(me.name);
				}, this);

				x += 50;
				i++;
			}, this);

			// background
			this.game.add.sprite(8, 64, 'titleBackground');

			this.createBars();
		},

		inventory: function() {
			var empty = this.game.add.sprite();
			var t = this.title;
			t.text = this.game.addText(t.pos.x, t.pos.y, 'INVENTORY', t.style);
			empty.addChild(t.text);

			var close = this.game.add.sprite(480, 14, 'combatButtons', 5);
			close.input.start(0, true);
			close.events.onInputUp.add(function() {
				this.game.state.start(this.game.previousState);
			}, this);

			this.game.add.sprite(8, 64, 'inventory');

			var x = 178, y = 79, i = 0;
			var current = this.game.inventory.current;
			var all = this.game.inventory.items;
			for(var name in current) {
				var pos = all[name].pos + all[name].row * this.game.inventory.dataCols;
				var item = this.game.add.sprite(x, y, 'items', pos);
				item.name = name;
				item.input.start(0, true);

				item.events.onInputUp.add(function(me) {
					this.game.state.start(this.game.previousState);
					this.game.inventory.take(me.name);
					player.play('consume');
				}, this);

				i++;
				x += 43;
			}
		}
	},

	_update: {
		title: function() {
			this.secondary.scale.setTo(1 + 0.1 * Math.sin(game.time.now / 100), 1 + 0.1 * Math.cos(game.time.now / 100));
		},

		explore: function() {

		},

		combat: function() {
			// FIXME seems like a waste to update these every time, call only wen take damage
			this.updateBar('health');
			this.updateBar('mana');
		}
	},

	_render: {
		combat: function() {
			//this.game.debug.renderRectangle(this.health.bar, '#CF3F52');
			//this.game.debug.renderRectangle(this.mana.bar, '#246D8F');
		}
	},

	// remove reference to variables for garbage collection
	clean: function() {
		this.secondary = null;
		this.title.text = null;
		this.health = {};
		this.mana = {};
	}
};