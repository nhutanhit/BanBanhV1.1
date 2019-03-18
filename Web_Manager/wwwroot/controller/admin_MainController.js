mainmodule.controller('adminMainController', ['$scope', '$state', '$account', '$cookies', '$uibModal', 'Idle', 'Keepalive', '$rootScope', '$cart', 'toastr',
    function ($scope, $state, $account, $cookies, $uibModal, Idle, Keepalive, $rootScope, $cart, toastr) {

        // get $account login

        var account = $account.getAdminAccountInfo();
        if (account === null || account === undefined || account === "") {
            toastr.error("Vui lòng đăng nhập!");
            $state.go('AdminLogin');
            return;
        }
        $scope.init = function () {
            $scope.title = 'Quản lý đơn hàng';


        }

        $scope.init();



        $scope.gotoOrderManager = function () {
            $scope.title = 'Quản lý đơn hàng';
            $state.go('Admin.OrderManager');
        }
        $scope.gotoProductManager = function () {
            $scope.title = 'Quản lý sản phẩm';
            $state.go('Admin.ProductManager');
        }


    }]); 
          //  .config(function (IdleProvider, KeepaliveProvider) {
        //    IdleProvider.idle(1);
        //    IdleProvider.timeout(1500000);
        //    //KeepaliveProvider.interval(1);
        //});

//mainmodule.controller('logoutcontroller', ['$scope', '$state', '$cookies', '$uibModalInstance', 'data', function ($scope, $state, $cookies, $uibModalInstance, data) {
//    $scope.title = '';
//    var account = $cookies.getObject("AcountInfo");
//    $scope.username = account.UserName;
//    $scope.data = 'Bạn có muốn đăng xuất?';
//    $scope.dataRemove = 'Vui lòng đăng nhập lại';

//    $scope.yes = function () {
//        $uibModalInstance.close();
//        $cookies.remove("AcountInfo");
//        $state.go('login');
//    }

//    $scope.no = function () {
//        $uibModalInstance.close();
//    }

//    $scope.yesRemove = function () {
//        $uibModalInstance.close();
//        $cookies.remove("AcountInfo");
//        $state.go('login');
//    }
//}]);

//mainmodule.controller('sessioncontroller', ['$scope', '$state', '$cookies', '$uibModalInstance', 'data', function ($scope, $state, $cookies, $uibModalInstance, data) {
//    $scope.title = '';
//    var account = $cookies.getObject("AcountInfo");
//    $scope.username = account.UserName;

//    $scope.data = 'Vui lòng đăng nhập lại';

//    $scope.yes = function () {
//        $uibModalInstance.close();
//        $cookies.remove("AcountInfo");
//        $state.go('login');
//    }
//}]);