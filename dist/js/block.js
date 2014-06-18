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

	console.log('1111');
	function initBlock() {
		console.log('ok');
		console.log(game);
		self.mesh = BABYLON.Mesh.CreateBox('Block', 0.9, game.scene);
		console.log('oui!');
		self.mesh.position = new BABYLON.Vector3(self.position.x, 0, self.position.y);
		console.log('non');
		self.mesh.scaling = 0.3;

		self.mesh.onclick = function (e, object) {
			console.log(e);
			console.log(object);
			console.log(this);
		};
	}
	initBlock();
};