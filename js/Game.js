var Map = require('./map.js');

module.exports = function Game() {

	var self = this;

	var canvas = null;
	var engine = null;
	var scene = null;
	var camera = null;
	var window = global.window;

	this.scene = scene;
	this.engine = engine;
	this.map = null;

	this.init = function () {

		canvas = document.querySelector('canvas');
		self.engine = new BABYLON.Engine(canvas, true);
		self.scene = new BABYLON.Scene(self.engine);
		self.camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), self.scene);
		//self.camera2 = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);

		self.scene.activeCamera.attachControl(canvas);
	};

	this.createMap = function (width, height) {
		var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(0, 0, 10), self.scene);
		this.map = new Map(self, width, height);
		this.run();
	};

	this.run = function () {
		self.engine.runRenderLoop(function () {
			self.scene.render();
		});
	};

	window.onresize = function () {
		engine.resize();
	};
};
