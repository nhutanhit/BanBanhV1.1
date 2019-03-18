// Show img
mainmodule.controller('userLoginController', ['$uibModalInstance', '$http', '$cookies','$account', '$dao', 'toastr', '$rootScope', '$scope', '$state',
    function ($uibModalInstance, $http, $cookies ,$account, $dao, toastr, $rootScope, $scope, $state) {



        // Check DataEntity tra Nulll 
        // check Null 
        $scope.CheckNull = function (req) {
            if (req === "" || req === null || req === undefined) {

            }
        }
         
        $scope.UserLogin = function () {
          //  $rootScope.isLoading = true;
            // Kiểm tra dl 
            if ($scope.UserName === "" || $scope.UserName === null || $scope.UserName === undefined) {
                toastr.error("Vui lòng  nhập tên đăng nhập!"); 
                return; 
            }
            if ($scope.PassWord === "" || $scope.PassWord === null || $scope.PassWord === undefined) {
                toastr.error("Vui lòng  nhập mật khẩu!"); 
                return;
            }

            $scope.UserLoginReq = {
                UserName: $scope.UserName,
                Password: $scope.PassWord,
            }
            $rootScope.UserInformation = []; 
          
            $account.UserLogin($scope.UserLoginReq, function (res) {
                 
                    switch (res.data.ReturnCode) {
                        case 0:
                            toastr.error($rootScope.initMessage('LoginFail'));
                            break;
                        case 1:
                            $rootScope.UserInformation = res.data.Data; 
                            $cookies.putObject("UserAccountInfo", $rootScope.UserInformation);  // thông tin KH
                            $uibModalInstance.close(); 
                            toastr.success("Login thành công ");
                            $state.go('User');
                            $state.reload();
                            //$scope.AccountObj.AccountName = $scope.accReq.AccountName;
                            //$scope.AccountObj.AccountInfo = res.data.Data.AccountInfo;
                            //$scope.AccountObj.Session = res.data.Data.Session;
                            //$scope.AccountObj.IsChangePassword = res.data.Data.AccountInfo.IsChangePassword;

                            //$scope.IsChangePassword.IsChangePassword = res.data.Data.AccountInfo.IsChangePassword; // cập nhật trạng thái PassWord đã change chưa.
                            //$cookies.putObject("IsChangePassword", $scope.IsChangePassword);
                            //$cookies.putObject("AccountInfo", $scope.AccountObj);
                            //$cookies.putObject("AcountOld", $scope.AccountObjOld);  // PassWord Cu  
                            //if (res.data.Data.AccountInfo.IsChangePassword == true) {
                            //    $state.go('ChangePassword');
                            //}
                            //else {
                            //    console.log('login thành công!');
                            //    $state.go('main.gotoProfileManager');
                            //}
                            break;
                        case -1:
                            toastr.error($rootScope.initMessage('AccountNameNotNull'));
                            break;
                       
                    } 

            });

        }
       

        // Đóng 
        $scope.Close = function () {
            $uibModalInstance.close();
        }
    }]);