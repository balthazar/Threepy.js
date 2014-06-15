var Map = require('./map.js');

module.exports = function Game() {

	var self = this;

	var canvas = document.querySelector('canvas');
	var engine = new BABYLON.Engine(canvas, true);
	var scene = new BABYLON.Scene(engine);
	var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
	var window = global.window;

	this.scene = scene;
	this.engine = engine;
	this.map = null;

	scene.activeCamera.attachControl(canvas);
	//self.camera2 = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);

	this.createMap = function (width, height) {
		var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(0, 0, 10), scene);
		//var mesh = BABYLON.Mesh.CreateBox('Block', 0.9, scene);
		self.map = new Map(self, width, height);
		console.log(self.scene);
	};

	this.run = function () {
		engine.runRenderLoop(function () {
			scene.render();
		});
	};

	window.onresize = function () {
		engine.resize();
	};
};
