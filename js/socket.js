var net = require('net');

module.exports = function Socket(game) {

	var self = this;

	var client = new net.Socket();

	this.client = client;
	this.game = game;
	this.connected = false;
	this.speed = null;
	this.win = null;

	process.on('uncaughtException', function (e) {
		if (e.code === 'ECONNREFUSED') {
			self.connected = false;
		}
	});

	self.client.on('data', function (data) {
		var res = data.toString().split('\n');
		for (var i in res) {
			var parse = res[i].split(' ');
			var cmd = parse[0];
			if (cmd === 'msz') {
				game.createMap(parse[1], parse[2]);
			}
			else if (cmd === 'bct') {
				game.map.getBlock(parse[1], parse[2]).setRessources(parse);
			}
			else if (cmd === 'tna') {
				game.addTeam(parse[1]);
			}
			else if (cmd === 'pnw') {
				game.newPlayer(parse);
			}
			else if (cmd === 'ppo') {
				game.movePlayer(parse);
			}
			else if (cmd === 'plv') {
				game.changeLevel(parse);
			}
			else if (cmd === 'enw') {
				game.newEgg(parseInt(parse[1].substr(1)), parseInt(parse[2].substr(1)), parseInt(parse[3]), parseInt(parse[4]));
			}
			else if (cmd === 'pdi') {
				game.removePlayer(parse);
			}
			else if (cmd === 'pic') {
				game.map.launchElevate(parse);
			}
			else if (cmd === 'pie') {
				game.map.resultElevate(parse);
			}
			else if (cmd === 'eht') {
				game.hatchEgg(parseInt(parse[1].substr(1)));
			}
			else if (cmd === 'ebo') {
				game.removeEgg(parseInt(parse[1].substr(1)));
			}
			else if (cmd === 'edi') {
				game.moldyEgg(parseInt(parse[1].substr(1)));
			}
			else if (cmd === 'pbc') {
				game.broadcast(parseInt(parse[1].substr(1)));
			}
			else if (cmd === 'sgt') {
				self.speed = parseInt(parse[1]);
			}
			else if (cmd === 'seg') {
				self.win = parse[1];
			}
		}
	});

	self.client.on('end', function () {
		self.connected = false;
	});

	this.connect = function (host, port) {
		self.client.connect(port, host, function () {
			self.connected = true;
			self.client.write('GRAPHIC\n');
		});
	};

	this.changeTime = function (newTime) {
		if (newTime >= 1 && newTime <= 100) {
			self.client.write('sst '+ newTime +'\n');
		}
	};

};
