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
		var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		self.mesh = new THREE.Mesh(geometry, material);
		game.scene.add(self.mesh, self.center.x, 0, self.center.y);
		self.mesh.position.x = self.center.x + (0.5 * x);
		self.mesh.position.y = self.center.y + (0.5 * y);

		self.mesh.onclick = function (e, object) {
			console.log(e);
			console.log(object);
			console.log(this);
		};

	}
	initBlock();
};