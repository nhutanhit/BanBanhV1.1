'use strict';
mainmodule.service('$account', ['$dao', '$cookies', '$state', function ($dao, $cookies, $state) {

    this.AdminLogin = function (request, success, finish) {
        $dao.call({
            operater: 'adminAccount/AdminLogin',
            data: request
        }, success, finish)
    };

    this.UserLogin = function (request, success, finish) {
        $dao.call({
            operater: 'UserAccount/UserLogin',
            data: request
        }, success, finish)
    };

    this.getUserAccountInfo = function () {
        return $cookies.getObject('UserAccountInfo');
    }
     
    this.getAdminAccountInfo = function () {
        return $cookies.getObject('AdminAccountInfo');
    }

    this.KiemTraUserLogin = function () {
        if (getUserAccountInfo() === null || getUserAccountInfo() === undefined || getUserAccountInfo() === "") {
            return true;
        } else {
            return false;
        }
    }


    //this.ChangePassword = function (request, success) {
    //    $dao.call({
    //        operater: 'account/ChangePassword',
    //        data: request
    //    }, success)
    //}

    //this.getAccountInfo = function () {
    //    return $cookies.getObject('AccountInfo');
    //}
    //this.RemoveAccountInfo = function () {
    //    $cookies.remove("AccountInfo");
    //}

    //this.getAccountOld = function () {
    //    return $cookies.getObject('AcountOld');
    //}
   
    //this.RemoveAcountOld = function () {
    //    $cookies.remove("AcountOld");
    //}

    //this.getIsChangePassword = function () {s
    //    return $cookies.getObject('IsChangePassword');
    //}
}]);