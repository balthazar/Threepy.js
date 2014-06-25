var Map = require('./map.js');
var Team = require('./team.js');

module.exports = function Game(stats) {

	var self = this;
	var window = global.window;
	var requestId = null;

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
	this.eggs = [];
	this.colors = [
		new THREE.Color(0x0080FF),
		new THREE.Color(0x009900),
		new THREE.Color(0xFF33FF),
		new THREE.Color(0xFF3333),
		new THREE.Color(0xFF9933),
		new THREE.Color(0x6600CC),
		new THREE.Color(0x66FFFF)
	];

	this.teamColor = [
		new THREE.Color(0x1A2B91),
		new THREE.Color(0x006000),
		new THREE.Color(0x2B2B2B),
		new THREE.Color(0xB50083),
		new THREE.Color(0x930E13),
		new THREE.Color(0x650BCF),
		new THREE.Color(0xBEDAFF),
		new THREE.Color(0x4C3000),
		new THREE.Color(0x008BC6),
		new THREE.Color(0xE2C600)
	];

	//tools for better view
	this.selected = null;
	this.resume = null;

	this.createMap = function (width, height) {
		self.map = new Map(self, width, height);
	};

	this.addTeam = function (name) {
		self.teams.push(new Team(self, name));
	};

	this.broadcast = function (numPlayer) {
		var player = self.getPlayer(numPlayer);
		if (player) {
			var geometry = new THREE.SphereGeometry(0.2 + (player.level * 0.02), 8, 8);
			var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
			var broadcastMesh = new THREE.Mesh(geometry, material);
			broadcastMesh.position = player.mesh.position.clone();
			broadcastMesh.position.z += 0.6 + (player.level * 0.2);
			broadcastMesh.scale.z = 0.1;
			scene.add(broadcastMesh);
			setTimeout(function () {
				scene.remove(broadcastMesh);
			}, 10);
		}
	};

	var aggregateByLevel = function (players) {
		var res = [],
			tmp = {};
		for (var i = 0; i < players.length; i++) {
			if (!tmp[players[i].level]) {
				tmp[players[i].level] = [];
			}
			tmp[players[i].level].push(players[i]);
		}
		for (var level in tmp) {
			res.push({ level: level, nb: tmp[level].length });
		}
		return res;
	};

	this.reloadData = function () {
		self.resume = {
			teams: self.teams.map(function (e) {
				return {
					name: e.name,
					color: self.teamColor[self.teams.indexOf(e) % 10].getHexString(),
					levels: aggregateByLevel(e.players)
				};
			})
		};
	};

	/*
	** Player
	 */
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

		self.reloadData();
	};

	this.getPlayer = function (number) {
		return self.players[self.players.map(function (e) {
			return e.nb;
		}).indexOf(number)];
	};

	this.movePlayer = function (array) {
		var player = self.getPlayer(parseInt(array[1].substr(1)));
		if (player) {
			player.moveTo(parseInt(array[2]), parseInt(array[3]), parseInt(array[4]));
		}
	};

	this.changeLevel = function (array) {
		var player = self.getPlayer(parseInt(array[1].substr(1)));
		if (player) {
			player.setLevel(parseInt(array[2]));
		}
		self.reloadData();
	};

	this.removePlayer = function (array) {
		var player = self.getPlayer(parseInt(array[1].substr(1)));
		if (player) {
			player.kill();
		}
	};

	/*
	** Egg
	 */
	this.newEgg = function (nb, player, x, y) {
		var block = self.map.blocks[y][x];
		var chicken = self.getPlayer(player);
		var color = self.teamColor[self.teams.indexOf(chicken.team) % 10];
		if (block) {
			block.addEgg(nb, color);
		}
	};

	this.getEgg = function (num) {
		return self.eggs[self.eggs.map(function (e) {
			return e.nb;
		}).indexOf(num)];
	};

	this.hatchEgg = function (num) {
		var egg = self.getEgg(num);
		if (egg) {
			egg.mesh.scale.multiplyScalar(1.5);
			egg.outline.scale.multiplyScalar(1.5);
		}
	};

	this.removeEgg = function (num) {
		var egg = self.getEgg(num);
		if (egg) {
			self.eggs.splice(self.eggs.map(function (e) {
				return e.nb;
			}).indexOf(num), 1);
			egg.block.eggs.splice(egg.block.eggs.map(function (e) {
				return e.nb;
			}).indexOf(num), 1);

			scene.remove(egg.outline);
			scene.remove(egg.mesh);
		}
	};

	this.moldyEgg = function (num) {
		var egg = self.getEgg(num);
		if (egg) {
			egg.mesh.material.color.setHex(0x486325);
			setTimeout(function () {
				self.removeEgg(num);
			}, 10000);
		}
	};

	this.run = function () {

		if (!document.getElementsByTagName('canvas').length) {
			document.body.appendChild(renderer.domElement);
		}

		stats.setMode(1);
		if (!document.getElementById('stats')) {
			document.body.appendChild(stats.domElement);
		}
		render();
	};

	this.stop = function () {
		if (requestId) {
			window.cancelAnimationFrame(requestId);
			requestId = null;
		}
	};

	var render = function () {

		var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
		projector.unprojectVector(vector, camera);
		raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

		if (self.map) {
			self.map.launchAnimation();
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

		requestId = window.requestAnimationFrame(render);
		renderer.render(scene, camera);
		stats.update();
	};

	var windowResize = function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	var mouseDown = function (event) {

		var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);

		raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		var intersects = raycaster.intersectObjects(self.objects);

		if (intersects.length > 0) {
			if (oldSelected) {
				oldSelected.material.color.set(0x0000FF);
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

				obj.material.color.set(0x4848FC);
				oldSelected = obj;
			}
		}
	};

	var mouseMove = function (event) {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	};

	//listeners
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mousemove', mouseMove, false);
	window.addEventListener('resize', windowResize, false);
};

