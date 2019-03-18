'use strict';
mainmodule.service('$GetDataPreference', ['$dao', function ($dao) {
    this.getDataProduct = function (request, success, finish) {
        $dao.call({
            operater: 'GetDataPreference/GetDataProduct',
            data: request
        }, success, finish)
    };

    this.getOrderProduct = function (request, success, finish) {
        $dao.call({
            operater: 'GetOrder/GetOrderProduct',
            data: request
        }, success, finish)
    };
    // chi tiết đon hàng của khách hàng
    this.getListDetailOrderProduct = function (request, success, finish) {
        $dao.call({
            operater: 'GetDetailOrderProduct/GetOrderProduct',
            data: request
        }, success, finish)
    };
    // tìm kiếm đon hàng của khách hàng
    this.searchOrderProduct = function (request, success, finish) {
        $dao.call({
            operater: 'SearchOrderProduct/Search',
            data: request
        }, success, finish)
    };

    // Thêm sản phẩm 
    this.AddProduct = function (request, success, finish) {
        $dao.call({
            operater: 'AdminProductManager/AddProduct',
            data: request
        }, success, finish)
    }; 

}]);