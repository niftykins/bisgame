var game = new Phaser.Game(532, 188, Phaser.CANVAS, 'canvas', {preload: preload, create: create}, false, false);

var hud;
var player;

var States = {
	title: {
		autostart: true,
		create: function() {
			hud.create('title');
			player.create('title');
			this.game.world.setAll('fixedToCamera', true);
		},
		update: function() {
			hud.update('title');
			player.update('title');

			if(this.game.input.activePointer.isDown) {
				hud.clean();
				player.clean();
				this.game.state.start('explore');
			}
		}
	},

	explore: {
		shutdown: function(game) {
			game.previousState = game.state.current;
		},
		create: function() {
			hud.create('explore');
			this.game.map.create();
			player.create('explore');
			this.game.world.setAll('fixedToCamera', true);
			player.sprite.fixedToCamera = false;
		},
		update: function() {
			player.update('explore');
		},
		render: function() {
			//player.render('explore');
		}
	},

	combat: {
		shutdown: function(game) {
			game.previousState = game.state.current;
			player.weapon = null;
		},
		create: function() {
			hud.create('combat');
			player.create('combat');
			this.game.world.setAll('fixedToCamera', true);
		},

		update: function() {
			hud.update('combat');
			player.update('combat');
		}
	},

	inventory: {
		create: function() {
			hud.create('inventory');
			this.game.world.setAll('fixedToCamera', true);
		},

		update: function() {

		}
	}
};

function preload() {
	// convenience aliasing
	this.game.addText = this.game.add.bitmapText;

	this.game.stage.scale.width *= 2;
	this.game.stage.scale.height *= 2;
	this.game.stage.scale.setSize();

	this.game.map = new World(this.game);
	this.game.map.preload();

	hud = new HUD(this.game);
	hud.preload();

	player = new Player(this.game);
	player.preload();

	var weapon = new Weapon(this.game);
	weapon.preload(); // just load

	this.game.combat = new Combat(this.game, player);
	this.game.combat.preload();

	this.game.inventory = new Inventory(this.game);
	this.game.inventory.preload();
}

function create() {
	this.game.stage.backgroundColor = '#333333';
	this.game.stage.disableVisibilityChange = true;

	this.game.combat.create();
	this.game.inventory.create();

	for(var name in States) {
		var state = States[name];
		game.state.add(name, state, state.autostart || false);
	}
}
