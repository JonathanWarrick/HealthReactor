'use strict';

angular.module('WellnessApp')
  .factory('Initiatives', function() {
  	var initiatives = [
  		yogaInitiative,
  		waterInitiative
  	];

  	return {
  		initiatives: initiatives
  	};
  });

// Create initiative classes
// This would be good practice to do sub-classing

var CheckInitiative = function(name, pointValue) {
	this.name = name;
	this.pointValue = pointValue;
	this.isDone = false;
};

CheckInitiative.prototype.toggleStatus = function() {
	this.isDone = !this.isDone;
};

var CounterInitiative = function(name, pointValue) {
	this.name = name;
	this.pointValue = pointValue;
	this.counter = 0;
};

CounterInitiative.prototype.increaseCounter = function() {
	this.counter++;
};

CounterInitiative.prototype.decreaseCounter = function() {
	this.counter--;
};

var yogaInitiative = new CheckInitiative('Yoga', 15);
var waterInitiative = new CounterInitiative('Water', 2);