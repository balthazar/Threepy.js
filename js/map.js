var Block = require('./block.js');

module.exports = function Map(game, width, height) {

	var self = this;

	this.blocks = [];
	this.game = game;
	this.width = width;
	this.height = height;

	this.getBlock = function (x, y) {
		return self.blocks[y][x];
	};

	this.getRealCenter = function (x, y) {
		return self.blocks[y][x].center;
	};

	this.launchAnimation = function () {
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x ++) {
				self.blocks[y][x].elevateAnim();
			}
		}
	};

	this.launchElevate = function (array) {
		self.blocks[array[2]][array[1]].elevate = true;
	};

	this.resultElevate = function (array) {
		self.blocks[array[2]][array[1]].elevateResult(parseInt(array[3]));
	};

	var initMap = function () {
		for (var y = 0; y < height; y++) {
			self.blocks[y] = [];
			for (var x = 0; x < width; x++) {
				self.blocks[y][x] = new Block(self, x, y);
			}
		}
	};

	initMap();
};