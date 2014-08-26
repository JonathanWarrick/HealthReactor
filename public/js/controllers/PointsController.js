angular.module('wellness.points', [])

.controller('PointsController', function($scope, $http, Initiatives) {
	$scope.wellnessInitiatives = Initiatives.wellnessInitiatives;
  
  $scope.waterPoints = $scope.wellnessInitiatives[0];
  $scope.stairsPoints = $scope.wellnessInitiatives[1];
  $scope.yogaPoints = $scope.wellnessInitiatives[2];
  $scope.workoutPoints = $scope.wellnessInitiatives[3];
  $scope.walkPoints = $scope.wellnessInitiatives[4];
  $scope.meditatePoints = $scope.wellnessInitiatives[5];
	
  $scope.calculateTotalPoints = function() {
		var points = 0;
		$scope.wellnessInitiatives.forEach(function(initiative) {
      initiative.currentValue = initiative.total();
			points += initiative.currentValue;
		});
		$scope.totalPoints = points;
    var submissionInformation = {
      username: 'testUser6',
      waterPoints: $scope.waterPoints.currentValue,
      stairsPoints: $scope.stairsPoints.currentValue,
      yogaPoints: $scope.yogaPoints.currentValue,
      workoutPoints: $scope.workoutPoints.currentValue,
      walkPoints: $scope.walkPoints.currentValue,
      meditatePoints: $scope.meditatePoints.currentValue,
      totalPoints: $scope.totalPoints
    };
    console.log(submissionInformation)
    $http({
      method: 'POST',
      url: 'api/submitPoints',
      data: submissionInformation
    });
	};
})

.factory('Initiatives', function() {
	var wellnessInitiatives = wellnessInitiativesArray;
	return {
		wellnessInitiatives: wellnessInitiatives
	}
})

.directive('counter', function() {
    return {
        restrict: 'A',
        scope: { value: '=value' },
        template: '<a href="javascript:;" class="counter-minus" ng-click="minus()">-</a>\
                  <input type="text" class="counter-field" ng-model="value" ng-change="changed()" ng-readonly="readonly">\
                  <a  href="javascript:;" class="counter-plus" ng-click="plus()">+</a>',
        link: function( scope , element , attributes ) {
            // Make sure the value attribute is not missing.
            if ( angular.isUndefined(scope.value) ) {
                throw "Missing the value attribute on the counter directive.";
            }
            
            var min = angular.isUndefined(attributes.min) ? null : parseInt(attributes.min);
            var max = angular.isUndefined(attributes.max) ? null : parseInt(attributes.max);
            var step = angular.isUndefined(attributes.step) ? 1 : parseInt(attributes.step);
            
            element.addClass('counter-container');
            
            // If the 'editable' attribute is set, we will make the field editable.
            scope.readonly = angular.isUndefined(attributes.editable) ? true : false;
            
            /**
             * Sets the value as an integer.
             */
            var setValue = function( val ) {
                scope.value = parseInt( val );
            }
            
            // Set the value initially, as an integer.
            setValue( scope.value );
            
            /**
             * Decrement the value and make sure we stay within the limits, if defined.
             */
            scope.minus = function() {
                if ( min && (scope.value <= min || scope.value - step <= min) || min === 0 && scope.value < 1 ) {
                    setValue( min );
                    return false;
                }
                setValue( scope.value - step );
            };
            
            /**
             * Increment the value and make sure we stay within the limits, if defined.
             */
            scope.plus = function() {
                if ( max && (scope.value >= max || scope.value + step >= max) ) {
                    setValue( max );
                    return false;
                }
                setValue( scope.value + step );
            };
            
            /**
             * This is only triggered when the field is manually edited by the user.
             * Where we can perform some validation and make sure that they enter the
             * correct values from within the restrictions.
             */
            scope.changed = function() {
                // If the user decides to delete the number, we will set it to 0.
                if ( !scope.value ) setValue( 0 );
                
                // Check if what's typed is numeric or if it has any letters.
                if ( /[0-9]/.test(scope.value) ) {
                    setValue( scope.value );
                }
                else {
                    setValue( scope.min );
                }
                
                // If a minimum is set, let's make sure we're within the limit.
                if ( min && (scope.value <= min || scope.value - step <= min) ) {
                    setValue( min );
                    return false;
                }
                
                // If a maximum is set, let's make sure we're within the limit.
                if ( max && (scope.value >= max || scope.value + step >= max) ) {
                    setValue( max );
                    return false;
                }
                
                // Re-set the value as an integer.
                setValue( scope.value );
            };
        }
    }
});

var wellnessInitiative = function(name, description, pointsValue, counterType) {
	this.name = name;
  this.description = description;
	this.pointsValue = pointsValue;
	this.counterType = counterType;
	this.quantity = 0; 
  this.currentValue = 0;
};

wellnessInitiative.prototype.total = function() {
	this.currentValue = this.pointsValue * this.quantity;
  return this.currentValue;
};

var waterInitiative = new wellnessInitiative("water", "Drank Some Water!", 2, "counter");
var stairsInitiative = new wellnessInitiative("stairs", "Took Some Stairs!", 2, "counter");
var yogaInitiative = new wellnessInitiative("yoga", "Did Some Yoga!", 15, "checkbox");
var workoutInitiative = new wellnessInitiative("workout", "Got A Workout In!", 15, "checkbox");
var walkInitiative = new wellnessInitiative("walk", "Walked To/From Hack Reactor!", 10, "checkbox");
var meditateInitiative = new wellnessInitiative("meditate", "Found Inner Peace!", 10, "checkbox");

var wellnessInitiativesArray = [
  waterInitiative, 
  stairsInitiative, 
  yogaInitiative, 
  workoutInitiative,
  walkInitiative,
  meditateInitiative
];
