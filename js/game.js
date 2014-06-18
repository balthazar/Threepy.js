var Map = require('./map.js');
var Team = require('./team.js');

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
	camera.position.z = 9;
	camera.position.y = -9;
	camera.rotation.x = 0.75;
	camera.lookAt(scene.position);

	var projector = new THREE.Projector();
	var raycaster;

	//Controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
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

	//hoverOutline && selectedBox
	var oldOutline = null;
	var oldSelected = null;

	/*
	 ** End Three config
	 */

	this.scene = scene;
	this.map = null;
	this.teams = [];
	this.players = [];
	this.objects = [];
	this.colors = [
		new THREE.Color(0x0080FF),
		new THREE.Color(0x009900),
		new THREE.Color(0xFF33FF),
		new THREE.Color(0xFF3333),
		new THREE.Color(0xFF9933),
		new THREE.Color(0x6600CC),
		new THREE.Color(0x66FFFF)
	];

	this.selected = null;

	this.createMap = function (width, height) {
		self.map = new Map(self, width, height);
	};

	this.addTeam = function (name) {
		self.teams.push(new Team(self, name));
	};

	this.newPlayer = function (array) {
		var player = {
			nb   : parseInt(array[1].substr(1)),
			x    : parseInt(array[2]),
			y    : parseInt(array[3]),
			o    : parseInt(array[4]),
			level: parseInt(array[5])
		};

		self.teams[self.teams.map(function (e) {
			return e.name;
		}).indexOf(array[6])].addPlayer(player);
	};

	this.movePlayer = function (array) {
		var player = self.players[self.players.map(function (e) {
			return e.nb;
		}).indexOf(parseInt(array[1].substr(1)))];
		if (player) {
			player.moveTo(parseInt(array[2]), parseInt(array[3]), parseInt(array[4]));
		}
	};

	this.run = function () {

		document.body.appendChild(renderer.domElement);
		render();
	};

	var render = function () {

		var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
		projector.unprojectVector(vector, camera);
		raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

		if (isMouseDown) {
			/*
			camera.position.x = camera.position.x * Math.cos(0.02) + camera.position.z * Math.sin(0.02);
			camera.position.y = camera.position.y * Math.cos(0.02) - camera.position.z * Math.sin(0.02);
			camera.lookAt(scene.position);
			console.log(camera);
			*/
		}

		camera.rotation.y = 0;
		camera.rotation.z = 0;

		var intersects = raycaster.intersectObjects(self.objects);

		if (intersects.length > 0) {
			var object = intersects[0].object;

			if (oldOutline) {
				oldOutline.material.color.set(0x000000);
			}
			object.outline.material.color.set(0xffffff);
			oldOutline = object.outline;
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

		var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);

		raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		var intersects = raycaster.intersectObjects(self.objects);

		if (intersects.length > 0) {
			if (oldSelected) {
				oldSelected.material.color.set(0x0000ff);
			}
			var obj = intersects[0].object;
			var block = null;
			if (obj.coords) {
				block = self.map.getBlock(obj.coords.x, obj.coords.y);
			}
			if (block) {
				self.selected = {
					x  : block.x,
					y  : block.y,
					res: block.ressources.map(function (e) {
						return { type: e.type, quantity: e.quantity };
					})
				};

				obj.material.color.set(0x00ff00);
				oldSelected = obj;
			}
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

