var game = new Phaser.Game(532, 188, Phaser.CANVAS, 'canvas', {preload: preload, create: create}, false, false);

var HUD, hud;
var Player, player;
var border;

var States = {
	title: {
		autostart: true,
		create: function() {
			hud.create('title');
			player.create('title');
		},
		update: function() {
			hud.update('title');
			player.update('title');
		}
	},
	play: {
		create: function() {

		},
		update: function() {

		}
	},

	combat: {
		create: function() {

		},
		update: function() {

		}
	}
};

function preload() {
	hud = new HUD(game);
	hud.preload();

	player = new Player(game);
	player.preload();
}

function create() {
	game.stage.backgroundColor = '#333333';
	game.stage.disableVisibilityChange = true;

	for(var name in States) {
		var state = States[name];
		game.state.add(name, state, state.autostart || false);
	}
}
