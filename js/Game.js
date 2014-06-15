var Map = require('./map.js');

module.exports = function Game() {

	var self = this;
	var window = global.window;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

	var light = new THREE.PointLight(0xffffff, 100, 100);
	light.position.set(30, -30, 10);
	scene.add(light);
	var light2 = new THREE.PointLight(0xffffff, 100, 100);
	light2.position.set(-30, -30, -50);
	scene.add(light2);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
	directionalLight.position.set(0, 0, 100).normalize();
	scene.add(directionalLight);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	this.scene = scene;
	this.map = null;

	document.body.appendChild(renderer.domElement);

	camera.position.z = 5;

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
