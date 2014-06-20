module.exports = function Ressource(block, type, quantity) {

	var self = this;
	var game = block.map.game;

	this.block = block;
	this.type = type;
	this.quantity = quantity;
	this.mesh = null;

	this.set = function (quantity) {
		self.quantity = quantity;
		self.reload();
	};

	this.remove = function (quantity) {
		self.quantity -= quantity;
	};

	this.reset = function () {
		self.quantity = 0;
	};

	this.reload = function () {
		if (self.mesh) {
			game.scene.remove(self.mesh);
		}

		var geometry = new THREE.CylinderGeometry(0, 0.05, self.quantity * (0.1), 8, 1);
		var material = new THREE.MeshLambertMaterial({ color: game.colors[self.type], shading: THREE.FlatShading });

		self.mesh = new THREE.Mesh(geometry, material);
		self.mesh.rotation.x = 1.60;
		self.mesh.position.z += 0.51;
		self.mesh.position.x = self.block.center.x - 0.3 + (type * 0.1);
		self.mesh.position.y = self.block.center.y - 0.4;
		game.scene.add(self.mesh);
	};

	self.reload();

};