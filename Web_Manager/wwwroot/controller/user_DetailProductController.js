// Show img
mainmodule.controller('DetailProductController', ['$uibModalInstance', '$http', '$cookies', '$account', '$cart', '$dao', 'toastr', '$rootScope', '$scope', '$state', 'Id', '$rootScope',
    function ($uibModalInstance, $http, $cookies, $account, $cart, $dao, toastr, $rootScope, $scope, $state, Id, $rootScope) {
        // Khai báo xem chi tiết sản phẩm 
        $scope.DetailProduct = {
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
                    $scope.DetailProduct.MaSanPham = Product[i].MaSanPham;
                    $scope.DetailProduct.TenSanPham = Product[i].TenSanPham;
                    $scope.DetailProduct.GiaBan = Product[i].GiaBan;
                    $scope.DetailProduct.GiaThiTruong = Product[i].GiaThiTruong;
                    $scope.DetailProduct.SoLuongTon = Product[i].SoLuongTon;
                    $scope.DetailProduct.MoTa = Product[i].MoTa;
                    $scope.DetailProduct.TrangThai = Product[i].TrangThai;
                    $scope.DetailProduct.HinhAnh = Product[i].HinhAnh;
                    $scope.DetailProduct.NgayNhapHang = Product[i].NgayNhapHang;
                    $scope.DetailProduct.MaThuongHieu = Product[i].MaThuongHieu;
                    $scope.DetailProduct.ThanhToanTrucTuyen = Product[i].ThanhToanTrucTuyen;
                    return;
                }
            }
        }
        $scope.getDetailProduct($scope.Id);


        //  ********************* Thêm sản phẩm vào  Giỏ hàng   *********************
        // Click giảm tăng số lượng sản phẩm cho trang chi tiết sản phẩm. 
        $scope.DownQuantity = function () {
            if ($scope.DetailProduct.SoLuong > 1 || $scope.DetailProduct.SoLuong !== 1) {
                $scope.DetailProduct.SoLuong--;
            }
        };
        $scope.UpQuantity = function () {
            $scope.DetailProduct.SoLuong++;
        };
        // kiểm tra sp đã có trong giỏ hàng chưa 
        $scope.KiemTraGioHang = function (maSanPham) {
            var myListCart = $cart.getListCar() // lấy ds sản phẩm trong giỏ hàng cookies 
            var count = 0; 
            for (var i = 0; i < myListCart.length; i++) {
                if (myListCart[i].MaSanPham === maSanPham) {
                    count++; 
                } 
            }
            if (count >= 1) {
                return true;
            } else {
                return false; 
            }
        }
         
        // $cookies lưu trữ các sản phẩm mà KH đã chọn khi click vào button thêm vào giỏ hàng.   
        $scope.AddProductToCart = function (Product) {
             
            // khai báo thông tin lưu vào giỏ hàng.  
            $rootScope.isLoading = true;
            var giohang = $cart.KiemTraGioHang();  //  kiểm tra giỏ hàng. 
            $scope.CartProduct = {
                MaSanPham: Product.MaSanPham,
                TenSanPham: Product.TenSanPham,
                GiaBan: Product.GiaBan,
                SoLuong: Product.SoLuong,
                HinhAnh: null 
            };
            // nếu chưa có giỏ hàng thì khởi tạo giỏ hàng push thông tin vào. 
            if (giohang === true) {
                //   lưu  thông tin vào cookies giỏ hàng
                $scope.myListCart = [];
                $scope.myListCart.push($scope.CartProduct); // chuyển sang ArrayList .
                $cookies.putObject("myListCartInfo", $scope.myListCart);
                $rootScope.isLoading = false; 
                $scope.Close(); 
                toastr.success("Đã thêm sản phẩm vào giỏ hàng");
            }
            else {
                // Kiểm tra sản phẩm này đã có trong giỏ hàng chưa. 
                if ($scope.KiemTraGioHang(Product.MaSanPham) === true) {
                    $scope.ItemsCart = []; 
                    $scope.ItemsCart = $cart.getListCar() // lấy ds sản phẩm trong giỏ hàng 
                    for (var i = 0; i < $scope.ItemsCart.length; i++) {
                        if ($scope.ItemsCart[i].MaSanPham === Product.MaSanPham) { 
                            $scope.ItemsCart[i].SoLuong += Product.SoLuong; 
                        } 
                    }
                    $cookies.putObject("myListCartInfo", $scope.ItemsCart);  // cookies
                    $rootScope.isLoading = false;
                    $scope.Close(); 
                    toastr.success("Đã thêm sản phẩm vào giỏ hàng"); 

                } else {
                    // Giỏ hàng đã có rồi thì sẽ push vào cookies
                    var myListCart = $cart.getListCar() // lấy ds sản phẩm trong giỏ hàng cookies
                    myListCart.push($scope.CartProduct); // push ds  mới vào giỏ hàng. 
                    $cookies.putObject("myListCartInfo", myListCart);  // cookies
                    $rootScope.isLoading = false;
                    $scope.Close(); 
                    $state.reload();    
                    toastr.success("Đã thêm sản phẩm vào giỏ hàng");
                }
                  
            }
        };

        // Mua hang ngay. 
        $scope.AddgoToCart = function (Product) {
            $scope.AddProductToCart(Product);
            $state.go('Cart'); 
        }


        // Đóng  form
        $scope.Close = function () {
            $state.go('User');
            $uibModalInstance.close();
           
        }
    }]);