module.exports = function Player(team, player) {

	var self = this;

	this.nb = player.nb;
	this.level = player.level;
	this.coords = {
		x: player.x,
		y: player.y,
		o: player.o
	};
	this.team = team;
	this.mesh = null;

	team.game.players.push(self);

	var loader = new THREE.OBJMTLLoader();
	loader.load('obj/sonic.obj', 'obj/sonic.mtl', function (object) {
		object.scale.x = 0.03;
		object.scale.y = 0.03;
		object.scale.z = 0.03;
		object.rotation.x = 1.5;
		object.position.z = 0.5;
		object.position.x = self.coords.x;
		object.position.y = self.coords.y;
		self.mesh = object;
		team.game.scene.add(object);
	});

};