var Player = require('./player.js');

module.exports = function Team(game, name) {

	var self = this;

	this.game = game;
	this.name = name;
	this.players = [];

	this.addPlayer = function (player) {
		this.players.push(new Player(self, player));
	};

};