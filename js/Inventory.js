Inventory = function(game) {
	this.game = game;
	this.dataCols = null;

	this.items = {};

	this.current = {}; // list of current items
};

Inventory.prototype = {
	preload: function() {
		this.game.load.spritesheet('items', 'assets/items.png', 38, 38);
		this.game.load.text('items', 'assets/items.json');
	},

	create: function() {
		var data = JSON.parse(this.game.cache.getText('items'));
		this.items = data.items;
		this.dataCols = data.cols;

		this.add('potion_health', 2);
		this.add('potion_mana', 2);
		this.add('potion_rejuvenation', 1);
	},

	add: function(item, amount) {
		amount = amount || 1;

		if(!this.items[item]) return;

		if(!this.current[item])
			this.current[item] = 0;

		this.current[item] += amount;
	},

	take: function(item, amount) {
		amount = amount || 1;

		if(!this.current[item] || !this.items[item]) return;

		this.current[item] -= amount;

		if(this.current[item] <= 0)
			delete this.current[item];

		console.log('Used %d %s', amount, item);
	}
};