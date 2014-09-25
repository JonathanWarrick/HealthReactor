angular.module('wellness.points', [])

.controller('PointsController', function($scope, $http, Initiatives, Datepicker) {
	$scope.wellnessInitiatives = Initiatives.wellnessInitiatives;
  
  $scope.waterQuantity = $scope.wellnessInitiatives[0].quantity;
  $scope.stairsQuantity = $scope.wellnessInitiatives[1].quantity;
  $scope.yogaQuantity = $scope.wellnessInitiatives[2].quantity;
  $scope.workoutQuantity = $scope.wellnessInitiatives[3].quantity;
  $scope.walkQuantity = $scope.wellnessInitiatives[4].quantity;
  $scope.meditateQuantity = $scope.wellnessInitiatives[5].quantity;
	
  $scope.calculateTotalPoints = function() {
		var points = 0;
		$scope.wellnessInitiatives.forEach(function(initiative) {
      initiative.currentValue = initiative.total();
			points += initiative.currentValue;
		});
		$scope.totalPoints = points;
    var submissionInformation = {
      username: 'testUser6',
      waterQuantity: $scope.waterQuantity,
      stairsQuantity: $scope.stairsQuantity,
      yogaQuantity: $scope.yogaQuantity,
      workoutQuantity: $scope.workoutQuantity,
      walkQuantity: $scope.walkQuantity,
      meditateQuantity: $scope.meditateQuantity,
      totalPoints: $scope.totalPoints
    };
    console.log(submissionInformation)
    $http({
      method: 'POST',
      url: 'api/submitPoints',
      data: submissionInformation
    });
	};

  $scope.dates = [
    {name: "Sun Aug 24 2014"},
    {name: "Mon Aug 25 2014"},
    {name: "Tue Aug 26 2014"},
    {name: "Wed Aug 27 2014"},
    {name: "Thu Aug 28 2014"},
    {name: "Fri Aug 29 2014"},
    {name: "Sat Aug 30 2014"},
    {name: "Sun Aug 31 2014"}
  ];

  $scope.myDate = $scope.dates[0];
  
  $scope.now = new Date(Date.now()).toDateString();
  $scope.today = {
    name: $scope.now
  };

  $scope.getDateOnPageLoad = function() {
    console.log('called getDate on page initialization');
    Datepicker.getDate($scope.today)
    .then(function(response) {
      if(response.data.length !== 0) {
        $scope.wellnessInitiatives[0].quantity = response.data[0]['waterQuantity'];
        $scope.wellnessInitiatives[1].quantity = response.data[0]['stairsQuantity'];
        $scope.wellnessInitiatives[2].quantity = response.data[0]['yogaQuantity'];
        $scope.wellnessInitiatives[3].quantity = response.data[0]['workoutQuantity'];
        $scope.wellnessInitiatives[4].quantity = response.data[0]['walkQuantity'];
        $scope.wellnessInitiatives[5].quantity = response.data[0]['meditateQuantity'];
        console.log('done changing shit');
      }
    });
  }

  $scope.getDate = function() {
    console.log('get date called using myDate', $scope.myDate);
    Datepicker.getDate($scope.myDate)
    .then(function(response) {
      if(response.data.length !== 0) {
        $scope.wellnessInitiatives[0].quantity = response.data[0]['waterQuantity'];
        $scope.wellnessInitiatives[1].quantity = response.data[0]['stairsQuantity'];
        $scope.wellnessInitiatives[2].quantity = response.data[0]['yogaQuantity'];
        $scope.wellnessInitiatives[3].quantity = response.data[0]['workoutQuantity'];
        $scope.wellnessInitiatives[4].quantity = response.data[0]['walkQuantity'];
        $scope.wellnessInitiatives[5].quantity = response.data[0]['meditateQuantity'];
        console.log('done changing shit');
      } else {
        $scope.wellnessInitiatives.forEach(function(initiative) {
          initiative.quantity = 0;
        });
      }
    });
  }
})

.factory('Initiatives', function() {
	var wellnessInitiatives = wellnessInitiativesArray;
	return {
		wellnessInitiatives: wellnessInitiatives
	}
})

.factory('Datepicker', function($http) {
  var getDate = function(date) {
    return $http({
      method: 'POST', 
      url: 'api/dateScores',
      data: date
    })
    .success(function(response) {
      console.log('here are the results', response);
      return response;
    });
  };
  return {
    getDate: getDate
  };
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

