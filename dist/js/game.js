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
		engine = new BABYLON.Engine(canvas, true);
		scene = new BABYLON.Scene(engine);
		camera = new BABYLON.ArcRotateCamera('Camera', 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

		scene.activeCamera.attachControl(canvas);
	};

	this.createMap = function (width, height) {
		var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(0, 0, 10), scene);
		var origin = BABYLON.Mesh.CreateSphere('origin', 10, 1.0, scene);
		//this.map = new Map(self, width, height);
		this.run();
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
