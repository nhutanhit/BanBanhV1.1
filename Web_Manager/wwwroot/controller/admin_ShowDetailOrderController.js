// Show img
mainmodule.controller('ShowDetailOrderController', ['$uibModalInstance', '$http', '$cookies', '$account', '$GetDataPreference', '$cart', '$dao', 'toastr', '$rootScope', '$scope', '$state', 'Id', '$rootScope', 'NgTableParams',
    function ($uibModalInstance, $http, $cookies, $account, $GetDataPreference, $cart, $dao, toastr, $rootScope, $scope, $state, Id, $rootScope, NgTableParams) {

        // var LisrOrderProduct = $cart.getLisrOrderProduct(); 
        $scope.Init = function () {
            $scope.OrderIDReq = {
                Id: Id,
            };

            // danh sách trạng thái 
            $scope.listStatus = [
                {
                    'Name': 'Duyệt đơn hàng',
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
                    'Name': 'Khác Trả hàng',
                    'Value': 5
                }
            ];
        }

        $scope.GetDetailOrder = function () { 
            $GetDataPreference.getListDetailOrderProduct($scope.OrderIDReq, function (res) {
 
                switch (res.data.ReturnCode) {
                    case 0:
                        toastr.error("Không tìm thấy đơn hàng này ");
                        break;
                    case 1:
                        $rootScope.listDetailOrderProduct = [];
                        $rootScope.listDetailOrderProduct = res.data.Data;
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

        $scope.Init();
        $scope.GetDetailOrder();

        // Cập nhật trạng thái
        $scope.Update = function (Status) {
            if (Status === undefined || Status === null || Status === "") {
                toastr.error("Vui lòng chọn trạng thái cho đơn hàng");
                return;
            }
            else {  // cập nhật stt
                $scope.Req = {
                    MaDonHang: $scope.OrderIDReq.Id,
                    TinhTrangDonHang: Status,
                };

             
                $cart.UpdateStatustOrder($scope.Req, function (res) {
                     
                    switch (res.data.ReturnCode) {
                        case 1: 
                            toastr.success("Cập nhật trạng thái thành công"); 
                            $scope.Close(); 
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
          
        // Đóng  form
        $scope.Close = function () {
            $uibModalInstance.close(); 
            window.location.reload();
        }
    }]);