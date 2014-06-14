global.BABYLON = BABYLON;

var net = require('net');
var gui = require('nw.gui');
var win = gui.Window.get();

win.title = "Zabylon";

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
				var canvas = document.querySelector('canvas');
				var engine = new BABYLON.Engine(canvas, true);
				var scene = new BABYLON.Scene(engine);

				// Creating a camera looking to the zero point (0,0,0), a light, and a sphere of size 1
				var camera = new BABYLON.ArcRotateCamera('Camera', 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
				var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(0, 0, 10), scene);
				var origin = BABYLON.Mesh.CreateSphere('origin', 10, 1.0, scene);

				scene.activeCamera.attachControl(canvas);

				engine.runRenderLoop(function () {
					scene.render();
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
