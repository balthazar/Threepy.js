module.exports = function Ressource(block, type, quantity) {

	var self = this;
	var game = block.map.game;

	this.block = block;
	this.type = type;
	this.quantity = quantity;
	this.mesh = null;

	var geometry = new THREE.CylinderGeometry(0, 0.05, 1.1, 8, 1);
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading });

	self.mesh = new THREE.Mesh(geometry, material);
	self.mesh.rotation.x = 1.5;
	self.mesh.position.z = 0.55;
	self.mesh.position.x = self.block.center.x;
	self.mesh.position.y = self.block.center.y;
	game.scene.add(self.mesh);

	this.set = function (quantity) {
		self.quantity = quantity;
	};

	this.addOne = function () {
		self.quantity++;
	};

	this.removeOne = function () {
		self.quantity--;
	};

	this.add = function (quantity) {
		self.quantity += quantity;
	}

	this.remove = function (quantity) {
		self.quantity -= quantity;
	}

	this.reset = function () {
		self.quantity = 0;
	};

};