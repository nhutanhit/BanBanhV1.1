mainmodule.controller('AdminLoginController', ['$scope', '$state', '$rootScope', '$http', '$cookies', 'toastr', '$dao','$account',
    function ($scope, $state, $rootScope, $http, $cookies, toastr, $dao, $account) {

        //debugger
        ////get cookies 
        //var account = $account.getAccountInfo();

        //// nếu login rồi thì đẩy về trang chủ luôn. 
        //if (account !== "undefined" || account !== null || account !=="") {
        //    $state.go('main');
        //    return;
        //} 

        
    $scope.login = function () { 
      
        if ($scope.AccountName == "undefined" || $scope.AccountName == "" || $scope.AccountName == null)
        {
            toastr.error($rootScope.initMessage('PleaseInputAccountName'));
            return;
        } 

        if ($scope.Password == "undefined" || $scope.Password == "" || $scope.Password == null) {
            toastr.error($rootScope.initMessage('PleaseInputPassword'));
            return;
        } 

        if ($scope.AccountName.length == 0) {
            toastr.error($rootScope.initMessage('PleaseInputAccountName'));
            return;
        }

        if ($scope.Password.length == 0) {
            toastr.error($rootScope.initMessage('PleaseInputPassword'));
            return;
        }

       

        //if ($scope.AccountName !== "undefined")
        //   if ($scope.AccountName.length > 20) {
        //        toastr.error($rootScope.initMessage('LengthAccountOverCharacter'));
        //        return;
        //    }

        //if ($scope.Password !== "undefined")
        //    if ($scope.Password.length > 20) {
        //       toastr.error($rootScope.initMessage('LengthAccountOverCharacter'));
        //      return;
        
        //    }

        
        $scope.accReq = {
            AccountName: $scope.AccountName,
            Password: $scope.Password,
        } 
        $rootScope.AdminInformation = []; 
        $account.AdminLogin($scope.accReq, function (res) {
            
                switch (res.data.ReturnCode) { 
                    case 0:
                        toastr.error($rootScope.initMessage('LoginFail'));
                        break;
                    case 1:  
                        $rootScope.AdminInformation = res.data.Data;
                        $cookies.putObject("AdminAccountInfo", $rootScope.AdminInformation );  // thông tin Admin
                        toastr.success("Login thành công ");
                        $state.go('Admin.OrderManager'); 
                        break;
                }  
        });

        $rootScope.$on('showLoading', function (event, args) {
            $scope.isLoading = args;
        });
    }
}]);
