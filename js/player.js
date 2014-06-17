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

	this.center = team.game.map.getRealCenter(player.x, player.y);

	team.game.players.push(self);

	this.setOrientation = function () {
		self.mesh.rotation.y = (self.coords.o === 1) ? 3 : self.mesh.rotation.y;
		self.mesh.rotation.y = (self.coords.o === 2) ? 2 : self.mesh.rotation.y;
		self.mesh.rotation.y = (self.coords.o === 3) ? 1 : self.mesh.rotation.y;
		self.mesh.rotation.y = (self.coords.o === 4) ? 4 : self.mesh.rotation.y;
	};

	var loader = new THREE.OBJMTLLoader();
	loader.load('obj/sonic.obj', 'obj/sonic.mtl', function (object) {
		object.scale.x = 0.03;
		object.scale.y = 0.03;
		object.scale.z = 0.03;
		object.rotation.x = 1.5;
		object.position.z = 0.5;
		object.position.x = self.center.x;
		object.position.y = self.center.y;
		self.mesh = object;
		self.setOrientation();
		team.game.scene.add(object);
	});

};