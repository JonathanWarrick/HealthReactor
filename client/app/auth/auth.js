// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('WellnessApp')
  .controller('AuthController', function ($scope, $window, $state, Auth) {
    $scope.user = {};

    $scope.userLogin = function () {
      Auth.login({
        username: $scope.username,
        password: $scope.password
      })
      .then(function (token) {
        $window.localStorage.setItem('healthreactor', token);
        $state.go('pointsTracker');
      })
      .catch(function (error) {
        console.error(error);
      });
    };

    $scope.userSignup = function () {
      Auth.signup({
        username: $scope.username,
        password: $scope.password
      })
      .then(function (token) {
        // $window.localStorage.setItem('healthreactor', token);
        $state.go('login');
      })
      .catch(function (error) {
        console.error(error);
      });
    };
  });
