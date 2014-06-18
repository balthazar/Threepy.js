var Block = require('./block.js');

module.exports = function Map(game, width, height) {

	var self = this;

	this.blocks = [];
	this.game = game;
	this.width = width;
	this.height = height;

	var initMap = function () {
		for (var y = 0; y < height; y++) {
			self.blocks[y] = [];
			for (var x = 0; x < width; x++) {
				self.blocks[y][x] = new Block(self, x, y);
			}
		}
	};
	initMap();

	this.getBlock = function (x, y) {
		return self.blocks[y][x];
	};

	this.getRealCenter = function (x, y) {
		return self.blocks[y][x].center;
	};
};