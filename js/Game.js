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

	//camera
	var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.y = -9;
	camera.position.z = 9;
	camera.rotation.x = 0.75;

	var projector = new THREE.Projector();
	var raycaster;

	//Controls
	var controls = new THREE.OrbitControls(camera);
	var mouse = new THREE.Vector2();
	var isMouseDown;

	// lights
	scene.add(new THREE.AmbientLight(0x444444));

	var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
	light1.position.set(1, 1, 1);
	scene.add(light1);

	var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
	light2.position.set(0, -1, 0);
	scene.add(light2);

	//hoverOutline
	var outlineMesh = null;

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

		var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
		projector.unprojectVector(vector, camera);
		raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

		if (isMouseDown) {
			//camera.position.x = camera.position.x * Math.cos(0.02) + camera.position.z * Math.sin(0.02);
			//camera.position.y = camera.position.y * Math.cos(0.02) - camera.position.z * Math.sin(0.02);
		    //camera.lookAt(scene.position);
		    //console.log(camera);
		}

		camera.rotation.y = 0;
		camera.rotation.z = 0;

		var intersects = raycaster.intersectObjects(self.objects);

		if (intersects.length > 0) {
			var object = intersects[0].object;

			if (outlineMesh) {
				scene.remove(outlineMesh);
				outlineMesh = null;
			}
			outlineMesh = new THREE.BoxHelper(object);
			outlineMesh.material.color.set(0xffffff);
			outlineMesh.material.linewidth = 3;

			scene.add(outlineMesh);
		}

		window.requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	var windowResize = function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	var mouseDown = function (event) {

		event.preventDefault();
		isMouseDown = true;

		var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);

		raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		var intersects = raycaster.intersectObjects(self.objects);

		if (intersects.length > 0) {
			intersects[0].object.material.color.setHex(Math.random());
		}
	};

	var mouseMove = function (event) {

		event.preventDefault();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	};

	var mouseUp = function (event) {
		event.preventDefault();
		isMouseDown = false;
	};

	//listeners
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
	document.addEventListener('mousemove', mouseMove, false);
	window.addEventListener('resize', windowResize, false);
};
