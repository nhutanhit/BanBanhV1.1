// Check đơn hàng
mainmodule.controller('CheckOrderController', ['$http', '$cookies', '$account', '$cart', '$dao','NgTableParams' ,'toastr', '$rootScope', '$scope', '$state', '$rootScope',
    function ($http, $cookies, $account, $cart, $dao, NgTableParams,toastr, $rootScope, $scope, $state, $rootScope) {

       
        var account = $account.getUserAccountInfo();
        //$scope.isLoginShow = true;  
        //if (account === "" || account === undefined || account === null) {
        //    $scope.isLoginShow = false;
        //    return; 
        //}
        $scope.Init = function () {
            $scope.searchModel  = {
                MaDonHang: null, 
            }
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
                    'Name': 'Hết hàng',
                    'Value': 4
                },
                {
                    'Name': 'Khách trả hàng',
                    'Value': 5
                },
                {
                    'Name': 'Khách hủy đơn hàng',
                    'Value': 6
                }
            ];

        }

        // // get các sản phẩm khác hàng đã mua
        //$scope.getOrderCart = function () {
        //    $cart.GetOrderCart({}, function (res) {
        //        debugger
        //        switch (res.data.ReturnCode) {
        //            case 0:
        //                toastr.error("Không tìm thấy đơn hàng này ");
        //                break;
        //            case 1:

        //                $scope.listCart = [];
        //                $scope.listCart = res.data.Data;
        //                if ($scope.listCart.length === 0) {
        //                    toastr.success("Không có đơn hàng nào !");
        //                    return; 
        //                }
        //                for (var i = 0; i < $scope.listCart.length; i++) {
        //                    if ($scope.listCart[i].TinhTrangDonHang === "0") {
        //                        $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[0].Name;
        //                    }
        //                    if ($scope.listCart[i].TinhTrangDonHang === "1") {
        //                        $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[1].Name;
        //                    }
        //                    if ($scope.listCart[i].TinhTrangDonHang === "2") {
        //                        $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[2].Name;
        //                    }
        //                    if( $scope.listCart[i].TinhTrangDonHang === "3") {
        //                        $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[3].Name;
        //                    }
        //                    if ($scope.listCart[i].TinhTrangDonHang === "4") {
        //                        $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[4].Name;
        //                    }
        //                    if ($scope.listCart[i].TinhTrangDonHang === "5") {
        //                        $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[5].Name;
        //                    }
        //                }   
        //                $scope.tableParams = new NgTableParams({}, { dataset: $scope.listCart });
        //                break;
        //            case -1:
        //                toastr.error("Có lỗi trong quá trình xử lý");
        //                break;
        //            case -2:
        //                toastr.error("Không thể kết nối với Server");
        //                break;
        //        }
        //    }); 
        //}
        $scope.Init();
        //$scope.getOrderCart(); 

        // tìm kiếm đơn hàng. 
        $scope.Search = function (searchModel) {
            $scope.searchModel = {
                MaDonHang: searchModel.MaDonHang,
            }
            if ($scope.searchModel.MaDonHang === null || $scope.searchModel.MaDonHang === "" || $scope.searchModel.MaDonHang === undefined) {
                toastr.error("Vui lòng nhập mã đơn hàng");
                return; 
            }
            $cart.SearchCheckOrderCart($scope.searchModel, function (res) {
                $scope.tableParams = new NgTableParams({}, { dataset: null });
                switch (res.data.ReturnCode) {
                    case 0:
                        toastr.error("Không tìm thấy đơn hàng này ");
                        break;
                    case 1: 
                        $scope.listCart = [];
                        $scope.listCart = res.data.Data;
                        if ($scope.listCart.length === 0) {
                            toastr.success("Không tìm thấy đơn hàng, Vui lòng kiểm tra lại");
                            return;
                        }
                        for (var i = 0; i < $scope.listCart.length; i++) {
                            if ($scope.listCart[i].TinhTrangDonHang === "0") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[0].Name;
                            }
                            if ($scope.listCart[i].TinhTrangDonHang === "1") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[1].Name;
                            }
                            if ($scope.listCart[i].TinhTrangDonHang === "2") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[2].Name;
                            }
                            if ($scope.listCart[i].TinhTrangDonHang === "3") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[3].Name;
                            }
                            if ($scope.listCart[i].TinhTrangDonHang === "4") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[4].Name;
                            }
                            if ($scope.listCart[i].TinhTrangDonHang === "5") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[5].Name;
                            }
                            if ($scope.listCart[i].TinhTrangDonHang === "6") {
                                $scope.listCart[i].TinhTrangDonHang = $scope.listStatus[6].Name;
                            }
                        }
                        $scope.tableParams = new NgTableParams({}, { dataset: $scope.listCart });
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

    }]);