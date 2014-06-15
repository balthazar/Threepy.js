var Block = require('./block.js');

module.exports = function Map(game, width, height) {

	var self = this;

	this.blocks = [];
	this.game = game;
	this.width = width;
	this.height = height;

	var initMap = function () {
		for (var i = 0; i < height; i++) {
			console.log('loop');
			self.blocks[i] = [];
			console.log('oooooo');
			for (var j = 0; j < width; j++) {
				console.log('loop 2');
				self.blocks[i][j] = new Block(self, i, j);
			}
		}
	};
	initMap();
};