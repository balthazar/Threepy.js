global.THREE = THREE;
global.document = document;

var net = require('net');
var gui = require('nw.gui');
var Game = require('./js/game.js');

var win = gui.Window.get();
win.title = "Threepy.js";
win.width = 2000;
win.height = 1000;

var client = new net.Socket();
var game;

client.on('data', function (data) {
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
		console.log(parse);
	}
});

//Error caught
process.on('uncaughtException', function (e) {
	console.log(e);
});

angular.module('zabylonApp', [])
	.controller('zabylonCtrl', function ($scope, $timeout) {

		$scope.ui = {
			connected  : false,
			connectHost: '127.0.0.1',
			connectPort: 4040
		};

		$scope.selectedInfos = 'none';

		$scope.connect = function () {
			client.connect($scope.ui.connectPort, $scope.ui.connectHost, function () {
				client.write('GRAPHIC\n');
			});
			$scope.ui.connected = true;
			$timeout(function () {

				game = new Game();
				game.run();

				setInterval(function () {
					$scope.$apply(function () {
						$scope.selectedInfos = game.selected;
					});
				}, 100);

			});
		};

		$scope.minimize = function () {
			win.minimize();
		};

		$scope.toggleFull = function () {
			win.toggleFullscreen();
		};

		$scope.quit = function () {
			gui.App.quit();
		};

	});
