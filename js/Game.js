module.exports = function Game() {

	this.canvas = null;
	this.engine = null;
	this.scene = null;
	this.camera = null;

	this.init = function () {

		this.canvas = document.querySelector('canvas');
		this.engine = new BABYLON.Engine(this.canvas, true);
		this.scene = new BABYLON.Scene(this.engine);
		this.camera = new BABYLON.ArcRotateCamera('Camera', 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
	}
};
