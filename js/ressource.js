module.exports = function Ressource(block, type, quantity) {

	var self = this;
	var game = block.map.game;

	this.block = block;
	this.type = type;
	this.quantity = quantity;

	this.set = function (quantity) {
		self.quantity = quantity;
	};

	this.addOne = function () {
		self.quantity++;
	};

	this.removeOne = function () {
		self.quantity--;
	};

	this.add = function (quantity) {
		self.quantity += quantity;
	}

	this.remove = function (quantity) {
		self.quantity -= quantity;
	}

	this.reset = function () {
		self.quantity = 0;
	};

};