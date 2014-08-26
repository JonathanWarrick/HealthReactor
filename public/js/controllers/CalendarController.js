angular.module('wellness.calendar', [])

.controller('CalendarController', function($scope, Datepicker) {
  $scope.dates = [
    {name: "Sun Aug 24 2014"},
    {name: "Mon Aug 25 2014"},
    {name: "Tue Aug 26 2014"},
    {name: "Wed Aug 27 2014"},
    {name: "Thu Aug 28 2014"},
    {name: "Fri Aug 29 2014"},
    {name: "Sat Aug 30 2014"}
  ];

  // $scope.myDate = $scope.dates[0];
  $scope.logDate = function() {
    console.log($scope.myDate);
  }

  $scope.getDate = function() {
    console.log('get date called using myDate', $scope.myDate);
    Datepicker.getDate($scope.myDate)
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
      console.log(response);
      return response;
    });
  };
  return {
    getDate: getDate
  };
});