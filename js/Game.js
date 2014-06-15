var Map = require('./map.js');

module.exports = function Game() {

	var self = this;
	var window = global.window;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	this.scene = scene;
	this.map = null;

	document.body.appendChild(renderer.domElement);

	camera.position.z = 5;
	camera.position.x = 5;
	camera.position.y = 5;

	this.createMap = function (width, height) {
		self.map = new Map(self, width, height);
	};

	this.run = function () {
		render();
	};

	var render = function () {

		window.requestAnimationFrame(render);
		renderer.render(scene, camera);
	};
};
