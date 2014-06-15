var Map = require('./map.js');

module.exports = function Game() {

	var self = this;
	var window = global.window;

	/*
	** Three
	 */
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 10;

	//custom controls
	controls = new THREE.OrbitControls(camera);

	// lights
	var light = new THREE.PointLight(0xffffff, 100, 100);
	light.position.set(30, -30, 10);
	scene.add(light);
	var light2 = new THREE.PointLight(0xffffff, 100, 100);
	light2.position.set(-30, -30, -50);
	scene.add(light2);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
	directionalLight.position.set(0, 0, 100).normalize();
	scene.add(directionalLight);

	document.body.appendChild(renderer.domElement);

	this.scene = scene;
	this.map = null;
	this.objects = [];

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

	var windowResize = function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	var checkClicked = function (event) {

		event.preventDefault();

		projector = new THREE.Projector();

		var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);

		var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		var intersects = raycaster.intersectObjects(self.objects);

		if (intersects.length > 0) {
			console.log(intersects[0].object);
			intersects[0].object.material.color.setHex(Math.random());
		}
	};

	document.addEventListener('mousedown', checkClicked, false);

	window.addEventListener('resize', windowResize, false);
};
