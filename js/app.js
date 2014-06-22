global.THREE = THREE;
global.document = document;

var gui = require('nw.gui');
var Game = require('./js/game.js');
var Socket = require('./js/socket.js');
var stats = new Stats();

var win = gui.Window.get();
win.title = "Threepy.js";
win.width = 2000;
win.height = 1000;
win.moveTo(300, 200);

var game = new Game(stats);
var socket = new Socket(game);

angular.module('threepyApp', [])
	.controller('threepyCtrl', function ($scope, $timeout) {

		$scope.ui = {
			connected  : false,
			connectHost: '127.0.0.1',
			connectPort: 4040,
			msg        : ''
		};

		$scope.serverTime

		$scope.selectedInfos = null;

		$scope.ressourcesNames = [
			'Nourriture', 'Linemate', 'Deraumère', 'Sibur', 'Mendiane', 'Phiras', 'Thystame'
		];

		$scope.connect = function () {

			socket.connect($scope.ui.connectHost, $scope.ui.connectPort);
			$scope.ui.msg = 'Processing authentification...';

			$timeout(function () {

				if (socket.connected) {

					$scope.ui.connected = true;
					$scope.ui.msg = '';

					game.run();

					setInterval(function () {
						$scope.$apply(function () {
							$scope.selectedInfos = game.selected;
							$scope.resume = game.resume;
						});
					}, 100);
				}
				else {
					$scope.ui.msg = 'Error during server connection.';
				}

			}, 100);
		};

		$scope.disconnect = function () {
			stats = new Stats();
			game = new Game(stats);
			socket = new Socket(game);
			$scope.ui.connected = false;
			$scope.ui.msg = '';
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
