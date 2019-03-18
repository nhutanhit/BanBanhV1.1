mainmodule.controller('admin_OrderManagerManager', ['$scope', '$state', '$cookies', '$account', '$GetDataPreference', '$cart', 'NgTableParams', '$interval', '$uibModal', 'Idle', 'Keepalive', '$cookies', '$rootScope', '$alert', 'toastr',
    function ($scope, $state, $cookies, $account, $GetDataPreference, $cart, NgTableParams, $interval, $uibModal, Idle, Keepalive, $cookies, $rootScope, $alert, toastr) {
        

        var account = $account.getAdminAccountInfo();
        if (account === null || account === undefined || account === "") {
            toastr.error("Vui lòng đăng nhập!");
            $state.go('AdminLogin');
            return;
        }
        $scope.init = function () {
            $scope.title = "Quản Lý Đơn Hàng";
            // danh sách trạng thái 
            $scope.listStatus = [
                {
                    'Name': 'Đơn hàng chờ duyệt',
                    'Value': 0
                },
                {
                    'Name': 'Đã duyệt',
                    'Value': 1
                },
                {
                    'Name': 'Đang giao',
                    'Value': 2
                },
                {
                    'Name': 'Đã giao',
                    'Value': 3
                }, 
                {
                    'Name': 'Khách trả hàng',
                    'Value': 5
                }
            ];
 
            //Khởi tạo Cache  
            $scope.searchModel = {
                MaDonHang: null,
                Value: null
            }
        }
        // get DataPreference
        $scope.getCache = function () {
            $GetDataPreference.getOrderProduct({}, function (res) {
                $scope.tableParams = new NgTableParams({}, { dataset: null }); 
                $scope.searchModel.MaDonHang = null; 

                switch (res.data.ReturnCode) {
                    case 0:
                        toastr.error("Bạn Không có đơn hàng nào ");
                        break;
                    case 1:
                        $rootScope.listOrderProduct = [];
                        $rootScope.listOrderProduct = res.data.Data;
                        $scope.CountOrderProduct = $rootScope.listOrderProduct.length;
                        for (var i = 0; i < $rootScope.listOrderProduct.length; i++) {
                            if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "0") {
                                $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[0].Name;
                            }
                            if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "1") {
                                $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[1].Name;
                            }
                            if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "2") {
                                $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[2].Name;
                            }
                            if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "3") {
                                $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[3].Name;
                            }
                            if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "5") {
                                $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[5].Name;
                            }
                        }     //  $cookies.putObject("LisrOrderProduct", $scope.listOrderProduct ); 
                        $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listOrderProduct });
                        break;
                    case -1:
                        toastr.error("Có lỗi trong quá trình xử lý");
                        break;
                    case -2:
                        toastr.error("Không thể kết nối với Server");
                        break;

                }
            });

        }
        $scope.getCache();
        // 2s gọi hàm push
        //$interval(function () {
        //    console.log("get data");
        //    if ($scope.searchModel.Value === 0 || $scope.searchModel.MaDonHang !== "" || $scope.searchModel.MaDonHang !== undefined || $scope.searchModel.MaDonHang !== null) { // dang nhap lieu de tim kiem
        //        $scope.getCache();
        //    }
        //}, 2000);


        $scope.init();
        $scope.CheckDataEntity = function (request) {
            if (request === null || request === undefined || request === "") {
                return true;
            } else {
                return false
            }
        }
        // tìm kiếm đơn hàng. 
        $scope.search = function () {
            $scope.tableParams = new NgTableParams({}, { dataset: null }); 
            if ($scope.CheckDataEntity($scope.searchModel.MaDonHang) === true && $scope.CheckDataEntity($scope.searchModel.Value) === true) {
                $scope.getCache();      // không nhập gì lấy ra các hóa đơn/ 0, 
            } else {
                // tìm
                $GetDataPreference.searchOrderProduct($scope.searchModel, function (res) {
                    switch (res.data.ReturnCode) {
                        case 0:
                            toastr.error("Không tìm thấy kết quả!");
                            break;
                        case 1:
                            $rootScope.listDetailOrderProduct = [];
                            $rootScope.listDetailOrderProduct = res.data.Data;
                            $scope.CountOrderProduct = $rootScope.listDetailOrderProduct.length;
                            for (var i = 0; i < $rootScope.listDetailOrderProduct.length; i++) {
                                if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "0") {
                                    $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[0].Name;
                                }
                                if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "1") {
                                    $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[1].Name;
                                }
                                if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "2") {
                                    $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[2].Name;
                                }
                                if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "3") {
                                    $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[3].Name;
                                }
                                if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "5") {
                                    $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[4].Name;
                                }
                            }
                            $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listDetailOrderProduct });
                            break;
                        case -1:
                            toastr.error("Có lỗi trong quá trình xử lý");
                            break;
                        case -2:
                            toastr.error("Không thể kết nối với Server");
                            break;
                    }
                });
            }
        }



        // Ham tinh tong so luong  record.
        $scope.TongSoLuong = function () {

        }


        

        // Show  Detail Order
        $scope.showDetailOrder = function (Id) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/common/admin/ShowDetailOrder.html',
                controller: 'ShowDetailOrderController',
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


    }]);

