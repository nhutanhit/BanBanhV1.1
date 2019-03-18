mainmodule.controller('404controller', ['$scope', '$state', '$timeout', 'toastr', function ($scope, $state, $timeout, toastr) {

    $scope.goToDashboard = function () {
        $state.go('main');

    }
}]);
