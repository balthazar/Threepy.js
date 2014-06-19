global.THREE = THREE;
global.document = document;

var gui = require('nw.gui');
var Game = require('./js/game.js');
var Socket = require('./js/socket.js');

var win = gui.Window.get();
win.title = "Threepy.js";
win.width = 2000;
win.height = 1000;

var game = new Game();
var socket = new Socket(game);

angular.module('zabylonApp', [])
	.controller('zabylonCtrl', function ($scope, $timeout) {

		$scope.ui = {
			connected  : false,
			connectHost: '127.0.0.1',
			connectPort: 4040
		};

		$scope.selectedInfos = null;

		$scope.ressourcesNames = [
			'Nourriture', 'Linemate', 'Deraumère', 'Sibur', 'Mendiane', 'Phiras', 'Thystame'
		];

		$scope.connect = function () {

			socket.connect($scope.ui.connectHost, $scope.ui.connectPort);
			$scope.ui.connected = true;
			$timeout(function () {

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
