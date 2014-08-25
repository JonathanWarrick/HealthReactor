angular.module('wellness.points', [])

.controller('PointsController', function($scope, Initiatives) {
	$scope.wellnessInitiatives = Initiatives.wellnessInitiatives;
	$scope.calculateTotalPoints = function() {
		var total = 0;
		$scope.wellnessInitiatives.forEach(function(initiative) {
			total += initiative.total();
		});
		return total;
	}
	$scope.totalPoints = $scope.calculateTotalPoints();
})

.factory('Initiatives', function() {
	var wellnessInitiatives = wellnessInitiativesArray;
	return {
		wellnessInitiatives: wellnessInitiatives
	}
});

var wellnessInitiative = function(name, pointsValue, counterType) {
	this.name = name;
	this.pointsValue = pointsValue;
	this.counterType = counterType;
	this.quantity = 0; 
};

wellnessInitiative.prototype.total = function() {
	return this.pointsValue * this.quantity;
};

var waterInitiative = new wellnessInitiative("water", 2, "counter");
var stairsInitiative = new wellnessInitiative("stairs", 2, "counter");
var yogaInitiative = new wellnessInitiative("yoga", 15, "checkbox");
var workoutInitiative = new wellnessInitiative("workout", 15, "checkbox");
var walkInitiative = new wellnessInitiative("walk", 10, "checkbox");

var wellnessInitiativesArray = [
  waterInitiative, 
  stairsInitiative, 
  yogaInitiative, 
  workoutInitiative,
  walkInitiative
];
