var Game = function () {

	this.init = function () {
		var canvas = document.querySelector('canvas');
		var engine = new BABYLON.Engine(canvas, true);
		var scene = new BABYLON.Scene(engine);
	}
};

module.exports = Game;