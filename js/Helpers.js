Helpers = {

	// returns a range in the form of [start .. stop]
	// taken from underscore.js
	range: function(start, stop, step) {
		if (arguments.length <= 1) {
			stop = start || 0;
			start = 0;
		}
		step = arguments[2] || 1;

		var length = Math.max(Math.ceil((stop - start) / step), 0);
		var idx = 0;
		var range = new Array(length);

		while(idx < length) {
			range[idx++] = start;
			start += step;
		}

		return range;
	},

	// animation requres an array of frames, we have a row and a length
	frameRange: function(length, row, cols) {
		var offset = row * cols;
		return this.range(offset, length + offset);
	},

	createKeys: function(game) {
		return {
			up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
			left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
			w: game.input.keyboard.addKey(Phaser.Keyboard.W),
			a: game.input.keyboard.addKey(Phaser.Keyboard.A),
			s: game.input.keyboard.addKey(Phaser.Keyboard.S),
			d: game.input.keyboard.addKey(Phaser.Keyboard.D)
		};
	}
};