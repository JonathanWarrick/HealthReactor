angular.module('WellnessApp')
  .controller('MainController', function($scope) {
  	$scope.person1 = {
      name: 'Jonathan', 
      age: 29
    };
    $scope.person2 = {
      name: 'Alana', 
      age: 29
    };
    $scope.format = 'M/d/yy h:mm:ss a';
    $scope.field1 = {
      name: 'Username'
    };
    $scope.field2 = {
        name: 'Password'
      };
  })
  // ***note: jwStuff becomes jw-stuff in the html!***
  .directive('jwStuff', function() {
    return {
      restrict: 'E', // restrict to element only (only <jw-stuff></jw-stuff> works!)
      scope: {
        personInfo: '=info'
      },
      template: 'Name: {{personInfo.name}}<br/>Age: {{personInfo.age}}'
    };
  })
  .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
    // links our directive to the DOM to directly modify it
    // scope is an Angular object scope
    // elemet is the jqLite-wrapped element that the directive matches
    // attrs ia hash object with key-value pairs of normalized attribute names and their corresponding attribute values
    function link(scope, element, attrs) {
      // create format and timeoutID variables
      var format;
      var timeoutId;

      function updateTime() {
        // links to our element and updates it with a new date
        element.text(dateFilter(new Date(), format));
      }

      // the element has a my-current-time attribute, which has a value (the time) that it's watching
      // this is used when the format value is changed to a new format
      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      // destroy is triggered when a DOM node that has been compiled with Angular's 
      // compiler is destroyed or when an Angular scope is destroyed
      // Good practice for avoiding memory leaks
      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function() {
        updateTime(); // update DOM
      }, 1000);
    }

    return {
      link: link
    };
  }])
  .directive('ig', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        fid: '@',
        fieldInfo: '=info'
      },
      template: 
        '<material-input-group>' +
          '<label for="{{fid}}">{{fieldInfo.name}}</label>' +
          '<material-input id="{{fid}}" type="text" ng-model="data.description">' +
        '</material-input-group>'
    };
  });