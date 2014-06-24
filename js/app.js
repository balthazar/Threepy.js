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
var intervalId;
var timerId;

angular.module('threepyApp', [])
	.controller('threepyCtrl', function ($scope, $timeout, $interval) {

		$scope.ui = {
			connected  : false,
			connectHost: '127.0.0.1',
			connectPort: 4040,
			rangeSpeed : 50,
			serverSpeed: 50,
			msg        : ''
		};

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

					$scope.ui.rangeSpeed = socket.speed;

					game.run();

					intervalId = $interval(function () {
						$scope.ui.serverSpeed = socket.speed;
						$scope.selectedInfos = game.selected;
						$scope.resume = game.resume;
						if (!socket.connected) {
							$scope.disconnect('Lost connection with the server !');
						}
					}, 100);
				}
				else {
					$scope.ui.msg = 'Error during server connection.';
				}

			}, 100);
		};

		$scope.$watch('ui.rangeSpeed', function (newVal) {
			$timeout.cancel(timerId);
			timerId = $timeout(function () {
				socket.changeTime(newVal);
				$scope.serverSpeed = newVal;
			}, 500);
		});

		$scope.disconnect = function (msg) {
			socket.client.destroy();

			stats = new Stats();
			game = new Game(stats);
			socket = new Socket(game);

			$scope.ui.connected = false;
			$scope.ui.msg = (msg) ? msg :'';
			$interval.cancel(intervalId);
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
