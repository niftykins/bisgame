HUD = function(game) {
	this.game = game;

	this.font = 'Minecraftia';
	this.fill = '#FFF';

	this.title = {
		style: {font: '50px ' + this.font, fill: this.fill},
		pos: {x: 14, y: 5}
	};
	this.secondary = null;
};

HUD.prototype = {
	preload: function() {
		this.game.load.image('border', 'assets/border.png');
		this.game.load.image('titleBackground', 'assets/title_place.png');
		this.game.load.bitmapFont('pixelFont', 'assets/fonts/font_0.png', 'assets/fonts/font.fnt');
	},

	create: function(mode) {
		mode = mode || 'play';

		this._create[mode].call(this);

		this.game.add.sprite(0, 0, 'border');
	},

	update: function(mode) {
		this._update[mode || 'play'].call(this);
	},

	setText: function(which, text) {
		this[which].text.setText(text);
	},

	_create: {
		title: function() {
			var t = this.title;

			t.text = this.game.add.bitmapText(t.pos.x, t.pos.y, "BEST IN SLOT", t.style);

			this.game.add.sprite(8, 64, 'titleBackground');

			this.secondary = this.game.add.bitmapText(400, 115, "CLICK TO PLAY", {
				font: '30px ' + this.font, fill: this.fill
			});
			this.secondary.anchor = new Phaser.Point(0.5, 0.5);
		},

		play: function() {
			var t = this.title;

			t.text = this.game.add.bitmapText(t.pos.x, t.pos.y, "GET EXPLORING", t.style);
		}
	},

	_update: {
		title: function() {
			this.secondary.scale.setTo(1 + 0.1 * Math.sin(game.time.now / 100), 1 + 0.1 * Math.cos(game.time.now / 100));
		},

		play: function() {

		}
	}, 

	// remove reference to variables for garbage collection
	clean: function() {
		this.secondary = null;
		this.title.text = null;
	}
};