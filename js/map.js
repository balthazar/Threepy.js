var Block = require('./block.js');

module.exports = function Map(game, width, height) {

	var self = this;

	this.blocks = [];
	this.game = game;
	this.width = width;
	this.height = height;

	var initMap = function () {
		for (var i = 0; i < height; i++) {
			self.blocks[i] = [];
			for (var j = 0; j < width; j++) {
				self.blocks[i][j] = new Block(self, i, j);
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