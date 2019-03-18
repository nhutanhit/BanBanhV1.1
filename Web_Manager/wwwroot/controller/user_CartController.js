mainmodule.controller('user_CartController', ['$scope', '$state', '$cookies', '$account', '$cart', '$uibModal', 'Idle', 'Keepalive', '$cookies', '$rootScope', '$alert', 'toastr'
    , function ($scope, $state, $cookies, $account, $cart, $uibModal, Idle, Keepalive, $cookies, $rootScope, $alert, toastr) {
         
        //  biến chung  
        var userAccountInfo = $cookies.getObject('UserAccountInfo');
        var myListCart = $cart.getListCar();   // get list  product in list Cart
        // lấy hình anh s 
       
        $scope.HinhAnh = $rootScope.listProduct; 
        // kiểm tra đã có sản phẩm nào chưa.  
        $scope.isLoading = true;
        $scope.init = function () {
            $scope.Title = "Giỏ hàng";
            // show các sản phẩm trong giỏ hàng  
            $scope.ShowListCart = false;
            if (myListCart !== undefined) {
                $scope.ShowListCart = true;
                $scope.myListCart = [];
                $scope.myListCart = myListCart;
            }

            if ($cart.KiemTraGioHang() === true) {
                $scope.imgNullCartProduct = true;
            } else { // chưa
                // khai báo các giá trị đưa lên giao diện cho người dùng xem .  
                $rootScope.myCartProduct = [];
                $rootScope.TongSoLuong = 0;
                $rootScope.TongSoTien = 0;
                $scope.TongSoLuongSP = 0;
                // tính thổng tổng lượng & tổng giá tiền 
                for (var i = 0; i < myListCart.length; i++) {
                    $rootScope.TongSoLuong += myListCart[i].SoLuong;
                    $rootScope.TongSoTien += myListCart[i].GiaBan * myListCart[i].SoLuong;
                }
              
                for (var j = 0; j < myListCart.length; j++) {
                    for (var k = 0; k < $scope.HinhAnh.length; k++) {
                        if (myListCart[j].MaSanPham === $scope.HinhAnh[k].MaSanPham) {
                            myListCart[j].HinhAnh = $scope.HinhAnh[k].HinhAnh; 
                        }
                    }
                } 
                $rootScope.myCartProduct = myListCart;    // List Cart chính thức.  
                if ($rootScope.TongSoLuong === 0) {
                    $scope.imgNullCartProduct = true;
                }
            }
            $scope.isLoading = false;
        }

        $scope.init();

        // Xóa sản phẩm. 
        $scope.deleteProduct = function (index) {
            $alert.showConfirmAddNew('Bỏ sản phẩm này ra khỏi giỏ hàng của bạn!', function () {
                $scope.myCartProduct.splice(index, 1);
                $cookies.putObject("myListCartInfo", $scope.myCartProduct);  // cập nhật lại sản phẩm.
                $scope.init();
            });
        }
        // Click giảm tăng số lượng sản phẩm cho trang chi tiết sản phẩm. 
        $scope.DownQuantity = function (maSanPham) {
            for (var i = 0; i < myListCart.length; i++) {
                if (myListCart[i].MaSanPham === maSanPham) {
                    if (myListCart[i].SoLuong > 1 || $scope.DetailProduct.SoLuong !== 1) {
                        myListCart[i].SoLuong--;
                        $cookies.putObject("myListCartInfo", myListCart);  // cập nhật lại sản phẩm.
                    }
                }
            }
            $scope.init();

        };
        $scope.UpQuantity = function (maSanPham) {
            for (var i = 0; i < myListCart.length; i++) {
                if (myListCart[i].MaSanPham === maSanPham) {
                    myListCart[i].SoLuong++;
                    $cookies.putObject("myListCartInfo", myListCart);  // cập nhật lại sản phẩm. 
                }
            }
            $scope.init();
        };

        //************************* THANH TOÁN *****************************

        // thông tin người mua hàng. 
        $scope.showUserAccountInfo = false;
       
        if (userAccountInfo !== undefined) {
            $scope.showUserAccountInfo = true;
            $scope.UserInfo = {
                MaKH: userAccountInfo[0].MaKH,
                HoTenKH: userAccountInfo[0].HoTenKH,
                DienThoaiKH: userAccountInfo[0].DienThoaiKH,
                Email: userAccountInfo[0].Email,
                DiaChiGiaoHang: userAccountInfo[0].DiaChiKH,
            }
        }


        // Thông tin giỏ hàng . 
        $scope.Pay = function () {
            if (userAccountInfo === "" || userAccountInfo === undefined || userAccountInfo === null) {
                $scope.UserLogin();
                toastr.error("Vui lòng đăng nhập để tiếp tục mua hàng!");
                //$alert.showConfirmAddNew('Vui lòng đăng nhập để tiếp tục mua hàng!', function () {
                //    $scope.UserLogin();  
                //});

            } else {
                $state.go('Pay');
            }

        }

        // check null 
        $scope.CheckNull = function (input) {
            if (input === "" || input === null || input === undefined) {
                return true
            }
            return false;
        }
        $scope.UserInfoReq = {
            HoTenKH2: null,
            DienThoaiKH2: null,
            DiaChiGiaoHang2: null,
            IsOtherAddress: false
        }

        $scope.DatHang = function (UserInfoReq) {
            // kiểm tra đã login chưa.   
            // alert("da login " + IsOtherAddress);  
            // Cập nhật lại thông tin giao hàng. 
            // kiểm tra có oder ĐC khác hông . 

            if ($scope.UserInfoReq.IsOtherAddress === true) {
                // check null   
                if ($scope.CheckNull($scope.UserInfoReq.HoTenKH2) === true) {
                    toastr.error("Vui lòng nhập họ tên người nhận!");
                    return;
                }
                if ($scope.CheckNull($scope.UserInfoReq.DienThoaiKH2) === true) {
                    toastr.error("Vui lòng nhập số điện thoại người nhận!");
                    return;
                }
                if ($scope.CheckNull($scope.UserInfoReq.DiaChiGiaoHang2) === true) {
                    toastr.error("Vui lòng nhập địa chỉ giao hàng!");
                    return;
                }
                // cập nhật thông tin người mua hàng,   
                userAccountInfo[0].HoTenKH = UserInfoReq.HoTenKH2;
                userAccountInfo[0].DienThoaiKH = UserInfoReq.DienThoaiKH2;
                userAccountInfo[0].DiaChiGiaoHang = UserInfoReq.DiaChiGiaoHang2;
                $cookies.putObject("UserAccountInfo", userAccountInfo);
                $scope.ThanhToan();

            } else {
                $scope.ThanhToan();
            }

        }
        // Dat hàng
        $scope.ThanhToan = function () {
            $cart.DatHang({}, function (res) {
               
                switch (res.data.ReturnCode) {
                    case 0: {
                        toastr.error("Có lỗi trong quá trình xử lý!");
                        break;
                    }
                    case 1: {
                        toastr.success("Đơn hàng của bạn đang xử lý.");
                        // var removeListCart = $cart.RemoveListCart(); // remove prduct in list Cart
                        $state.go('User');
                        //$alert.showConfirmUpdateNewProfile('Đơn hàng của bạn đang xử lý.', function () {

                        //});

                        break;
                    }
                }
            });
        }


        $scope.goToAddCart = function () {
            $state.go('User');
        }
        // chuyển sang trang admin login
        $scope.gotoAdminLogin = function () {
            $state.go('AdminLogin');

        }
        // chuyển sang trang kiểm tra đơn hàng
        $scope.gotoCheckOderCart = function () {
           
            $state.go('CheckOrderCart');

        }

        // sử dụng lại các chức năng lúc include các
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

