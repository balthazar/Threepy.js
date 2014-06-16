var Ressource = require('./ressource.js');

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

	this.ressources = [];

	this.setRessources = function (array) {
		for (var i = 3; i < 10; i++) {
			self.ressources[i - 3].set(parseInt(array[i]));
		}
	};

	function initBlock() {

		//graphic
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshPhongMaterial({color: 0x0000ff, wireframe:false});
		self.mesh = new THREE.Mesh(geometry, material);
		game.scene.add(self.mesh);
		self.mesh.coords = {
			x: x,
			y: y
		};
		game.objects.push(self.mesh);
		self.mesh.position.x = self.center.x + (0.0 * x);
		self.mesh.position.y = self.center.y + (0.0 * y);

		//ressources
		for (var i = 0; i < 7; i++) {
			self.ressources[i] = new Ressource(self, i, 0);
		}
	}
	initBlock();
};