'use strict';

angular.module('WellnessApp')
  .factory('Initiatives', function() {
  	var counterInitiatives = [
  		waterInitiative,
  		stairsInitiative
  	];
  	var checkInitiatives = [
  		yogaInitiative,
  		workoutInitiative,
  		meditationInitiative,
  		walkingInitiative
  	];

  	return {
  		counterInitiatives: counterInitiatives,
  		checkInitiatives: checkInitiatives
  	};
  });

// Create initiative classes
// This would be good practice to do sub-classing

var CheckInitiative = function(name, pointValue) {
	this.name = name;
	this.pointValue = pointValue;
	this.pointTotal = 0;
	this.isDone = false;
};

CheckInitiative.prototype.toggleStatus = function() {
	this.isDone = !this.isDone;
};

CheckInitiative.prototype.calculateInitiativePoints = function() {
	if (this.isDone) {
		this.pointTotal = this.pointValue;
	} else {
		this.pointTotal = 0;
	}
};

var CounterInitiative = function(name, pointValue) {
	this.name = name;
	this.pointValue = pointValue;
	this.pointTotal = 0;
	this.counter = 0;
};

CounterInitiative.prototype.increaseCounter = function() {
	this.counter++;
};

CounterInitiative.prototype.decreaseCounter = function() {
	this.counter--;
};

CounterInitiative.prototype.calculateInitiativePoints = function() {
	this.pointTotal = this.pointValue * this.counter;
};

var yogaInitiative = new CheckInitiative('Yoga', 15);
var workoutInitiative = new CheckInitiative('Workout', 10);
var meditationInitiative = new CheckInitiative('Meditation', 10);
var walkingInitiative = new CheckInitiative('Walked to Hack Reactor', 10);
var waterInitiative = new CounterInitiative('Water', 2);
var stairsInitiative = new CounterInitiative('Stairs', 2);