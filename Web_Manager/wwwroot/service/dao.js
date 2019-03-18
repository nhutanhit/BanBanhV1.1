'use strict';
mainmodule.service('$dao', ['$http', '$cookies', '$state', '$rootScope', '$interval', '$translate', 'toastr', function ($http, $cookies, $state, $rootScope, $interval, $translate, toastr) {

    $rootScope.initMessage = function (strTranslate) {
        return $translate.instant(strTranslate);
    }

    this.call = function (request, success, finish) {
        $rootScope.isLoading = true;
        $http({
            method: "POST",
            url: "/api/" + request.operater,
            data: request.data,
        }).then(function mySucces(response) {
            $rootScope.isLoading = false;
            $rootScope.$emit('showLoading', false);
            if (response.data.ReturnCode == 0) {
                toastr.error('Không thể kết nối đến server!');
            }
            //User Inconrrect
            else if (response.data.ReturnCode == -1000) {
                toastr.error($rootScope.initMessage('AccountNameInconrect'));
            }
            //Password incorrect
            else if (response.data.ReturnCode == -1001) {
                toastr.error($rootScope.initMessage('PasswordIncorrect'));
            }
            //User is delete
            else if (response.data.ReturnCode == -1002) {
                toastr.error($rootScope.initMessage('AccountDelete'));
            }
            //Lost Session

            else if (response.data.ReturnCode == -1003) {
                toastr.error($rootScope.initMessage('SessionInconrect'));

                $cookies.remove('AccountInfo');
                $state.go('login');
            }
            //Not Permission
            else if (response.data.ReturnCode == -1004) {
                toastr.error($rootScope.initMessage('AccountNotPermission'));
            }
            //ID card incorect
            else if (response.data.ReturnCode == -1005) {
                toastr.error($rootScope.initMessage('AccountNotPermission'));
            }
            else {
                success(response);
            }

            if (finish) {
                finish();
            }
        }, function myError(response) {
            if (response.status == 401) {
                //Lost Session
                $cookies.remove('AccountInfo');
                $state.go('login');
            }
            else {
                error(response);
            }
            if (finish) {
                finish();
            }
        });
    };
}]);
