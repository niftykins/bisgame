World = function(game) {
	this.game = game;

	this.map = null;
	this.layers = [];

};

World.prototype = {
	preload: function() {
		this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tileset', 'assets/tileset.png');
	},

	create: function() {
		this.layers = [];

		var data = this.game.cache.getTilemapData('map').data;
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tileset');

		data.layers.forEach(function(layer, index) {
			var l = this.map.createLayer(index, 516, 116);
			l.resizeWorld();
			l.centerOn(516/2+8, 116/2+64);
			this.layers.push(l);
		}, this);
	}
};