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

  $scope.myDate = $scope.dates[0];

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
      console.log('here are the results', response);
      return response;
    });
  };
  return {
    getDate: getDate
  };
});


// On points page coming up, need to perform a get request for user logged-in.
  // If user has already submitted point for that given day
    // return points page with pre-populated totals
  // Else
    // return points page with zeroes
// On user selecting date with date picker, new get request is sent out
  // same logic as above PLUS within date window logic 
  // after a week is over, can't submit points (you're too late!)

// This requires a re-work of my user model








