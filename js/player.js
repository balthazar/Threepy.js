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

	team.game.players.push(self);

};