module.exports = function Map(game, width, height) {

	this.blocks = [];
	this.game = game;
	this.width = width;
	this.height = height;

	this.initMap = function () {
		for (var i = 0; i < height; i++) {
			this.blocks[i] = [];
			for (var j = 0; j < width; j++) {
				this.block[i][j] = new Block(this, i, j);
			}
		}
	};
};