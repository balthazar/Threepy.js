global.BABYLON = BABYLON;
global.document = document;

var net = require('net');
var gui = require('nw.gui');
var win = gui.Window.get();
win.title = "Zabylon";
var Game = require('./dist/js/game.js');

var game = new Game();


var client = new net.Socket();

client.on('data', function (data) {
	var res = data.toString().split('\n');
	console.log(res);
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

		$scope.connect = function () {
			client.connect($scope.ui.connectPort, $scope.ui.connectHost, function () {
				client.write('GRAPHIC\n');
			});
			$scope.ui.connected = true;
			$timeout(function () {

				game.init();
				var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(0, 0, 10), game.scene);
				var origin = BABYLON.Mesh.CreateSphere('origin', 10, 1.0, game.scene);

				game.scene.activeCamera.attachControl(game.canvas);

				game.engine.runRenderLoop(function () {
					game.scene.render();
				});

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
