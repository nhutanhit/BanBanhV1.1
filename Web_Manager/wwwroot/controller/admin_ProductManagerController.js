mainmodule.controller('admin_ProductManagerController', ['$scope', '$state', '$cookies', '$account', '$GetDataPreference', '$cart', 'NgTableParams', '$interval', '$uibModal', 'Idle', 'Keepalive', '$cookies', '$rootScope', '$alert', 'toastr',
    function ($scope, $state, $cookies, $account, $GetDataPreference, $cart, NgTableParams, $interval, $uibModal, Idle, Keepalive, $cookies, $rootScope, $alert, toastr) {

        $scope.init = function () {
            $scope.title = "Quản Lý Sản Phẩm";
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
            //$scope.searchModel = {
            //    MaDonHang: null,
            //    Value: null
            //}
        }
        // get DataPreference 
        $scope.getCache = function () { // get những sản phẩm còn bán thôi
            $scope.tableParams = new NgTableParams({}, { dataset: null });
            $GetDataPreference.getDataProduct({}, function (res) {
            
                if (res.data.ReturnCode === 1) {
                    $rootScope.listProduct = []; 
                    $rootScope.listProduct = res.data.Data; 
                    $scope.CountOrderProduct = $rootScope.listProduct.length;
                    $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listProduct  });
                }
            }, function () { });

        }
        $scope.getCache(); 

        $scope.gotoAddNewProduct = function () {
            $state.go('Admin.AddNewProduct'); 
        }
        //$scope.getCache = function () {
        //    $GetDataPreference.getOrderProduct({}, function (res) {
        //        $scope.tableParams = new NgTableParams({}, { dataset: null });
        //        $scope.searchModel.MaDonHang = null;

        //        switch (res.data.ReturnCode) {
        //            case 0:
        //                toastr.error("Bạn Không có đơn hàng nào ");
        //                break;
        //            case 1:
        //                $rootScope.listOrderProduct = [];
        //                $rootScope.listOrderProduct = res.data.Data;
        //                $scope.CountOrderProduct = $rootScope.listOrderProduct.length;
        //                for (var i = 0; i < $rootScope.listOrderProduct.length; i++) {
        //                    if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "0") {
        //                        $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[0].Name;
        //                    }
        //                    if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "1") {
        //                        $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[1].Name;
        //                    }
        //                    if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "2") {
        //                        $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[2].Name;
        //                    }
        //                    if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "3") {
        //                        $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[3].Name;
        //                    }
        //                    if ($rootScope.listOrderProduct[i].TinhTrangDonHang === "5") {
        //                        $rootScope.listOrderProduct[i].TinhTrangDonHang = $scope.listStatus[5].Name;
        //                    }
        //                }     //  $cookies.putObject("LisrOrderProduct", $scope.listOrderProduct ); 
        //                $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listOrderProduct });
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
        //$scope.getCache();
        // 2s gọi hàm push 
        $scope.init();
        $scope.CheckDataEntity = function (request) {
            if (request === null || request === undefined || request === "") {
                return true;
            } else {
                return false
            }
        }
        // tìm kiếm đơn hàng. 
        //$scope.search = function () {
        //    $scope.tableParams = new NgTableParams({}, { dataset: null });
        //    if ($scope.CheckDataEntity($scope.searchModel.MaDonHang) === true && $scope.CheckDataEntity($scope.searchModel.Value) === true) {
        //        $scope.getCache();      // không nhập gì lấy ra các hóa đơn/ 0, 
        //    } else {
        //        // tìm
        //        $GetDataPreference.searchOrderProduct($scope.searchModel, function (res) {
        //            switch (res.data.ReturnCode) {
        //                case 0:
        //                    toastr.error("Không tìm thấy kết quả!");
        //                    break;
        //                case 1:
        //                    $rootScope.listDetailOrderProduct = [];
        //                    $rootScope.listDetailOrderProduct = res.data.Data;
        //                    $scope.CountOrderProduct = $rootScope.listDetailOrderProduct.length;
        //                    for (var i = 0; i < $rootScope.listDetailOrderProduct.length; i++) {
        //                        if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "0") {
        //                            $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[0].Name;
        //                        }
        //                        if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "1") {
        //                            $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[1].Name;
        //                        }
        //                        if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "2") {
        //                            $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[2].Name;
        //                        }
        //                        if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "3") {
        //                            $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[3].Name;
        //                        }
        //                        if ($rootScope.listDetailOrderProduct[i].TinhTrangDonHang === "5") {
        //                            $rootScope.listDetailOrderProduct[i].TinhTrangDonHang = $scope.listStatus[4].Name;
        //                        }
        //                    }
        //                    $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listDetailOrderProduct });
        //                    break;
        //                case -1:
        //                    toastr.error("Có lỗi trong quá trình xử lý");
        //                    break;
        //                case -2:
        //                    toastr.error("Không thể kết nối với Server");
        //                    break;
        //            }
        //        });
        //    }
        //} 




        // Show  Detail Order
        $scope.adminshowdetailproduct = function (id) {  
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/wwwroot/views/common/admin/ShowDetailProduct.html',
                controller: 'AdminDetailProductController',
                controllerAs: 'content',
                size: 'mm',
                resolve: {
                    Id: function () {
                        return id;
                    },
                }
            });
            modalInstance.result.then(function () {

            });
        }


    }]);

// Show chi tiet san pham 

// Show img
mainmodule.controller('AdminDetailProductController', ['$uibModalInstance', '$http', '$cookies', '$account', '$cart', '$dao', 'toastr', '$rootScope', '$scope', '$state', 'Id', '$rootScope', '$alert','NgTableParams',
    function ($uibModalInstance, $http, $cookies, $account, $cart, $dao, toastr, $rootScope, $scope, $state, Id, $rootScope, $alert, NgTableParams) {
        // Khai báo xem chi tiết sản phẩm 
        $rootScope.DetailProduct = {
            MaSanPham: null,
            TenSanPham: null,
            GiaBan: null,
            MoTa: null,
            GiaThiTruong: null,
            SoLuongTon: null,
            TrangThai: null,
            HinhAnh: null,
            NgayNhapHang: null,
            MaThuongHieu: null,
            ThanhToanTrucTuyen: null,
            GiamGia: null,
            TietKiem: null,
            SoLuong: 1,
        };

        $scope.Id = Id;
        var Product = $rootScope.listProduct;
        // hàm get DetailProduct  
        $scope.getDetailProduct = function (maSanPham) {
            for (var i = 0; i < Product.length; i++) {
                if (Product[i].MaSanPham === maSanPham) {
                    $rootScope.DetailProduct.MaSanPham = Product[i].MaSanPham;
                    $rootScope.DetailProduct.TenSanPham = Product[i].TenSanPham;
                    $rootScope.DetailProduct.GiaBan = Product[i].GiaBan;
                    $rootScope.DetailProduct.GiaThiTruong = Product[i].GiaThiTruong;
                    $rootScope.DetailProduct.SoLuongTon = Product[i].SoLuongTon;
                    $rootScope.DetailProduct.MoTa = Product[i].MoTa;
                    $rootScope.DetailProduct.TrangThai = Product[i].TrangThai;
                    $rootScope.DetailProduct.HinhAnh = Product[i].HinhAnh;
                    $rootScope.DetailProduct.NgayNhapHang = Product[i].NgayNhapHang;
                    $rootScope.DetailProduct.MaThuongHieu = Product[i].MaThuongHieu;
                    $rootScope.DetailProduct.ThanhToanTrucTuyen = Product[i].ThanhToanTrucTuyen;
                    return;
                }
            }
        } 
        $scope.getDetailProduct($scope.Id);   
        $scope.DeleteProduct = function (MaSanPham) {
            $scope.accReq = {
                MaSanPham: MaSanPham , 
            }
            $alert.showConfirmAddNew('Sản phẩm này sẽ không bán nữa!', function () {  
                $cart.DeleteProduct( MaSanPham, function (res) { 
                    switch (res.data.ReturnCode) {
                        case 0:
                            toastr.error("Thất bại");
                            break;
                        case 1:
                            toastr.success("Đã xóa thành công"); 
                            $scope.Close(); 
                            $scope.getCache(); 
                            break;
                    }
                });
            });
        }
        // get những sản phẩm còn bán thôi
        $scope.getCache = function () { 
            $scope.tableParams = new NgTableParams({}, { dataset: null });
            $GetDataPreference.getDataProduct({}, function (res) {

                if (res.data.ReturnCode === 1) {
                    $rootScope.listProduct = [];
                    $rootScope.listProduct = res.data.Data;
                    $scope.CountOrderProduct = $rootScope.listProduct.length;
                    $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listProduct });
                }
            }, function () { });

        } 
        // Đóng  form
        $scope.Close = function () { 
            $uibModalInstance.close(); 
        }
    }]);