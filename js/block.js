var Ressource = require('./ressource.js');
var Egg = require('./egg.js');

module.exports = function Block(map, x, y) {

	var self = this;

	var game = map.game;

	this.x = x;
	this.y = y;
	this.map = map;
	this.mesh = null;
	this.outline = null;

	this.elevate = false;

	this.center = {
		y: (this.x - (map.width / 2)) + (0.1 * x),
		x: (this.y - (map.height / 2)) + (0.1 * y)
	};

	this.ressources = [];

	this.setRessources = function (array) {
		for (var i = 3; i < 10; i++) {
			self.ressources[i - 3].set(parseInt(array[i]));
		}
	};

	this.eggs = [];

	this.addEgg = function (nb, color) {
		var newEgg = new Egg(self, nb, color);
		self.eggs.push(newEgg);
		self.map.game.eggs.push(newEgg);
	};

	var elevates = [];
	var elevateEffect = 0;
	var blockEffect = false;
	var elevateMesh = null;
	var elevateRes = -1;

	//elevateShader
	var elevateMaterial = new THREE.ShaderMaterial({
		uniforms: {
			m_MinAlpha       : { type : 'f', value: 0 },
			m_MaxDistance    : { type : 'f', value: 700 },
			m_Color          : { type : 'v4', value: new THREE.Vector4(0, 0, 1, 1) },
			m_CollisionNum   : { type : 'i', value: 1 },
			m_CollisionAlphas: { type : 'f', value: 0.3 },
			m_Collisions     : { type : 'v3', value: new THREE.Vector3(0, -500, 0) }
		},
		vertexShader  : document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
		side          : THREE.FrontSide,
		blending      : THREE.AdditiveBlending,
		transparent   : true,
		name          : 'Elevate'
	});

	this.elevateAnim = function () {

		if (self.elevate) {
			if (elevateEffect < 40 && !blockEffect) {
				elevateMaterial.uniforms.m_Color.value = new THREE.Vector4(!elevateRes, elevateRes === 1, elevateRes === -1, 1 );
				elevateMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.1), elevateMaterial.clone());
				elevateMesh.position.x = self.center.x;
				elevateMesh.position.y = self.center.y;
				elevateMesh.position.z = 0.5;
				elevates.push(elevateMesh);
				map.game.scene.add(elevateMesh);
				elevateEffect++;
			}
			else {
				blockEffect = true;
				elevateEffect -= 2;
				blockEffect = (elevateEffect >= 0);
			}
		}

		for (var i = 0; i < elevates.length; i++) {
			elevates[i].position.z += 0.05;
			elevates[i].material.uniforms.m_CollisionAlphas.value -= 0.01;
			elevates[i].loop = (elevates[i].loop) ? elevates[i].loop + 1 : 1;
			if (elevates[i].loop > 20) {
				map.game.scene.remove(elevates[i]);
				elevates.splice(i, 1);
			}
		}

	};

	this.elevateResult = function (res) {
		elevateRes = res;
		setTimeout(function () {
			self.elevate = false;
			elevateRes = -1;
		}, 1500);
	};

	function initBlock() {

		//graphic
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial({color: 0x0000ff, wireframe: false});
		self.mesh = new THREE.Mesh(geometry, material);
		game.scene.add(self.mesh);
		self.mesh.coords = {
			x: x,
			y: y
		};
		game.objects.push(self.mesh);
		self.mesh.position.x = self.center.x;
		self.mesh.position.y = self.center.y;

		//ressources
		for (var i = 0; i < 7; i++) {
			self.ressources[i] = new Ressource(self, i, 0);
		}

		//outline
		self.outline = new THREE.BoxHelper(self.mesh);
		self.outline.material.color.set(0x000000);
		self.outline.material.linewidth = 3;
		self.mesh.outline = self.outline;
		game.scene.add(self.outline);
	}
	initBlock();
};