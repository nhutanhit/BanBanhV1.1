'use strict';
mainmodule.service('$cart', ['$dao', '$cookies', '$state',
    function ($dao, $cookies, $state) {
        // giỏ hàng. 
        var ListCart = null;
        this.KiemTraGioHang = function () {
            ListCart = this.getListCar();   // get giỏ hàng
            if (ListCart === "" || ListCart === null || ListCart === undefined) {
                return true;
            } else {
                return false;
            }

        }
        this.getListCar = function () {  // hàm lấy giỏ hàng của KH
            return $cookies.getObject('myListCartInfo');
        }

        this.getLisrOrderProduct = function () {  // hàm lấy đơn hàng của KH
            return $cookies.getObject('LisrOrderProduct');
        }

        this.DatHang = function (request, success, finish) {
            $dao.call({
                operater: 'Cart/AddCart',
                data: request
            }, success, finish)
        };

        //this.RemoveListCart = function () {
        //    $cookies.remove("myListCartInfo");
        //}

        // Cập nhật lại stt cho đơn hàng 
        this.UpdateStatustOrder = function (request, success, finish) {
            $dao.call({
                operater: 'AdminUpdateStatus/UpdateStatus',
                data: request
            }, success, finish)
        };

        // lấy sản phẩm mà KH Đã đặt hàng.  
        this.GetOrderCart = function (request, success, finish) {
            $dao.call({
                operater: 'CheckOrderCart/getCheckOrderCart',
                data: request
            }, success, finish)
        };


        // tìm kiếm đơn hàng
        this.SearchCheckOrderCart = function (request, success, finish) {
            $dao.call({
                operater: 'CheckOrderCart/SearchCheckOrder',
                data: request
            }, success, finish)
        };

        // xoa sản phẩm không bán nữa. 
        // Cập nhật lại stt cho đơn hàng 
        this.DeleteProduct = function (request, success, finish) {
            $dao.call({
                operater: 'AdminDeleteProduct/DeleteProductInListProduct',
                data: request
            }, success, finish)
        };


    }]);