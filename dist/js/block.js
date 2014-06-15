module.exports = function Block(map, x, y) {

	this.game = map.game;
	this.x = x;
	this.y = y;
	this.map = map;
	this.mesh = null;
	this.center = {
		x: this.x - (map.width / 2),
		y: this.y - (map.height / 2)
	};

	function initBlock() {
		this.mesh = BABYLON.Mesh.CreateBox('Block', 0.9, game.scene);
		this.mesh.position = new BABYLON.Vector3(this.position.x, 0, this.position.y);
		this.mesh.scaling = 0.3;

		this.mesh.onclick = function (e, object) {
			console.log(e);
			console.log(object);
			console.log(this);
		}
	};
	initBlock();
};