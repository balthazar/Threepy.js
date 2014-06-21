module.exports = function Egg(block, nb, color) {

	var self = this;
	var game = block.map.game;

	this.nb = nb;
	this.alive = true;
	this.block = block;
	this.color = color;
	this.mesh = null;
	this.outline = null;

	this.kill = function () {
		self.alive = false;
	};

	var initEgg = function () {

		var geometry = new THREE.SphereGeometry(0.06, 32, 32);
		var material = new THREE.MeshBasicMaterial({ color: self.color });
		self.mesh = new THREE.Mesh(geometry, material);
		self.mesh.position.x = self.block.center.x + 0.3;
		self.mesh.position.y = self.block.center.y + 0.3;
		self.mesh.position.z = 0.55;
		self.mesh.scale.z = 1.4;

		var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
		self.outline = new THREE.Mesh(geometry, outlineMaterial);
		self.outline.position = self.mesh.position;
		self.outline.scale.z = 1.4;
		self.outline.scale.multiplyScalar(1.1);
		game.scene.add(self.mesh);
		game.scene.add(self.outline);
	};

	initEgg();

};
