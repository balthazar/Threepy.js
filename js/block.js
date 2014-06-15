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
		self.mesh = BABYLON.Mesh.CreateBox('Block', 0.9, game.scene);
		self.mesh.position = new BABYLON.Vector3(self.center.x, 0, self.center.y);
		self.mesh.scaling = 0.3;

		console.log(self.center);

		self.mesh.onclick = function (e, object) {
			console.log(e);
			console.log(object);
			console.log(this);
		};
	}
	initBlock();
};