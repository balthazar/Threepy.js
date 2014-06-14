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

angular.module('zabylonApp', [])
	.controller('zabylonCtrl', function ($scope) {

		$scope.ui = {
			connected  : false,
			connectHost: '127.0.0.1',
			connectPort: 4040
		};

		$scope.connect = function () {
			client.connect($scope.ui.connectPort, $scope.ui.connectHost, function () {
				client.write('GRAPHIC\n');
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
