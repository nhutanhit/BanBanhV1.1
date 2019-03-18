mainmodule.controller('userMainController', ['$scope', '$state', '$cookies', '$uibModal', 'Idle', 'Keepalive', '$rootScope', '$uibModal', '$GetDataPreference', '$cart', '$account',
    function ($scope, $state, $cookies, $uibModal, Idle, Keepalive, $rootScope, $uibModal, $GetDataPreference, $cart, $account) {

        $scope.Title = "Trang chủ";
        // khởi tạo các list trả về từ cache
        $rootScope.listProduct = [];
            // 
        // get list Product
        $scope.getCache = function () {
            $GetDataPreference.getDataProduct({}, function (res) {

                if (res.data.ReturnCode === 1) {
                    //$scope.listProduct = res.data.Data;
                    //$rootScope.Product = res.data.Data;    
                    $rootScope.listProduct = res.data.Data;

                }
            }, function () { });
        }
        $scope.getCache();
     //   $rootScope.search = null; 
        $scope.init = function () {
          
            // show các sản phẩm trong giỏ hàng 
            var myListCart = $cart.getListCar();
            $scope.ShowListCart = false;
            if (myListCart !== undefined) {
                $scope.ShowListCart = true;
                $scope.myListCart = [];
                // lấy hình anh 
                $scope.HinhAnh = $rootScope.listProduct;
                //  $scope.myListCart = myListCart; 
                // show hinh anh
                for (var j = 0; j < myListCart.length; j++) {
                    for (var k = 0; k < $scope.HinhAnh.length; k++) {
                        if (myListCart[j].MaSanPham === $scope.HinhAnh[k].MaSanPham) {
                            myListCart[j].HinhAnh = $scope.HinhAnh[k].HinhAnh;
                        }
                    }
                }
                $rootScope.myCartProduct = myListCart;    // List Cart chính thức.  


            }
        }
        $scope.init();




        // quản lý các chuyển hướng sang các trang 
        // chuyển sang trang admin login
        $scope.gotoAdminLogin = function () {
            $state.go('AdminLogin');

        }
        $scope.gotoCart = function () {  // chuyển sang trang xem giỏ hàng. 
            $state.go('Cart');

        }

        $rootScope.accountUserInfo = null;
        $rootScope.ShowAccountUserInfo = false;

        // get thong tin account login 
        var accountUser = $account.getUserAccountInfo();
        if (accountUser != undefined) { // da login roi. 
            $rootScope.ShowAccountUserInfo = true;
            $rootScope.accountUserInfo = accountUser[0].HoTenKH;
        }

        $scope.logout = function () {
            $cookies.remove("UserAccountInfo");
            $state.reload();
        }

        var myCartProduct = $rootScope.myCartProduct;

        // Show chi tiết sp 
        //$scope.usershowDetailProduct = function (Id) { 
        //    var modalInstance = $uibModal.open({
        //        animation: true,
        //        ariaLabelledBy: 'modal-title',
        //        ariaDescribedBy: 'modal-body',
        //        templateUrl: '/wwwroot/views/common/user/DetailProduct.html',
        //        controller: 'DetailProductController',
        //        controllerAs: 'content',
        //        size: 'mm',
        //        resolve: {
        //            Id: function () {
        //                return Id;
        //            },
        //        }
        //    });
        //    modalInstance.result.then(function () {

        //    });
        //}
        // Show  Detail Order
        $scope.usershowDetailProduct = function (Id) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/common/user/userDetailProduct.html',
                controller: 'DetailProductController',
                controllerAs: 'content',
                size: 'mm',
                resolve: {
                    Id: function () {
                        return Id;
                    },
                }
            });
            modalInstance.result.then(function () {

            });
        }


        // Show màng hình User Login
        $scope.UserLogin = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/pages/account/userLogin.html',
                controller: 'userLoginController',
                controllerAs: 'content',
                size: 'mm',
            });
            modalInstance.result.then(function () {

            });
        }


    }]);

//
