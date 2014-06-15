module.exports = function Block(map, x, y) {

	var self = this;

	var game = map.game;

	this.x = x;
	this.y = y;
	this.map = map;
	this.mesh = null;

	this.center = {
		x: this.x - (map.width / 2),
		y: this.y - (map.height / 2)
	};

	function initBlock() {
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial({color: 0x0000ff});
		self.mesh = new THREE.Mesh(geometry, material);
		game.scene.add(self.mesh);
		game.objects.push(self.mesh);
		self.mesh.position.x = self.center.x + (0.1 * x);
		self.mesh.position.y = self.center.y + (0.1 * y);
	}
	initBlock();
};