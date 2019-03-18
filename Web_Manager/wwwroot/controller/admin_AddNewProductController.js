mainmodule.controller('admin_AddNewProductController', ['$scope', '$state', '$cookies', '$account', '$GetDataPreference', '$cart', 'NgTableParams', '$interval', '$uibModal', 'Idle', 'Keepalive', '$cookies', '$rootScope', '$alert', 'toastr',
    function ($scope, $state, $cookies, $account, $GetDataPreference, $cart, NgTableParams, $interval, $uibModal, Idle, Keepalive, $cookies, $rootScope, $alert, toastr) {

        $scope.init = function () {
            $scope.title = "Thêm mới sản phẩm";
            $scope.emailFormat = /^[a-z]+[a-z0-9._-]+@[a-z0-9]+\.[a-z.-]{2,5}$/;

            $scope.isCheckName = false;
            $scope.isCheckGiaBan = false;
            $scope.isCheckSoLuongTon = false;
            $scope.isCheckMoTa = false;
            $scope.isCheckimgUrl = false;
            $scope.isCheckMaThuongHieu = false;

            // img 
            $scope.ImageModel = {
                CHAN_DUNG: {
                    ImageName: 1,
                    ImageData: {
                        compressed: {
                            dataURL: null
                        }
                    },
                },
            }
            // Khai báo
            $scope.reqModel = { 
                TenSanPham: null,
                GiaBan: null,
                GiaThiTruong: null,
                MoTa: null, 
                SoLuongTon: null,
                TrangThai: null,
                HinhAnh: null, 
                MaThuongHieu: null,
                SoLuongTon: 1,
            };

            // danh sách trạng thái 
            $scope.listStatus = [ 
                {
                    'Name': 'Sản phẩm mới',
                    'TrangThai': 1
                },
                
            ];
            // Thương hiệu 
            $scope.listThuongHieu = [
                {
                    'Name': 'Đồng Khánh',
                    'MaThuongHieu': 1
                },
                {
                    'Name': 'Xuân Lan',
                    'MaThuongHieu': 2
                },

            ];
           

            //Khởi tạo Cache  
            //$scope.searchModel = {
            //    MaDonHang: null,
            //    Value: null
            //}
        }
        // get DataPreference 
        //$scope.getCache = function () { // get những sản phẩm còn bán thôi
        //    $scope.tableParams = new NgTableParams({}, { dataset: null });
        //    $GetDataPreference.getDataProduct({}, function (res) {
        //        debugger
        //        if (res.data.ReturnCode === 1) {
        //            $rootScope.listProduct = [];
        //            $rootScope.listProduct = res.data.Data;
        //            $scope.CountOrderProduct = $rootScope.listProduct.length;
        //            $scope.tableParams = new NgTableParams({}, { dataset: $rootScope.listProduct });
        //        }
        //    }, function () { });

        //}
        // $scope.getCacheListThuongHieu();

     
        // 2s gọi hàm push 
        $scope.init();
        $scope.CheckDataEntity = function (request) {
            $scope.count = 0 
            if (request.TenSanPham === null || request.TenSanPham === undefined || request.TenSanPham === "") {
                $scope.isCheckName = true; 
                $scope.count = 1;  
            } if (request.GiaBan === null || request.GiaBan === undefined || request.GiaBan === "") {
                $scope.isCheckGiaBan = true;
                $scope.count = 1; 
            } if (request.SoLuongTon === null || request.SoLuongTon === undefined || request.SoLuongTon === "") {
                $scope.isCheckSoLuongTon = true;
                $scope.count = 1; 
            } if (request.MoTa === null || request.MoTa === undefined || request.MoTa === "") {
                $scope.isCheckMoTa = true;
                $scope.count = 1; 
            } if (request.HinhAnh === null || request.HinhAnh === undefined || request.HinhAnh === "") {
                $scope.isCheckimgUrl = true;
                $scope.count = 1;   
            } if (request.MaThuongHieu === null || request.MaThuongHieu === undefined || request.MaThuongHieu === "") {
                $scope.isCheckMaThuongHieu = true;
                $scope.count = 1; 
            }
            if ($scope.count === 1) {
                return false;
            } else {
                return true; 
            }
        }
        // add produc 
        $scope.AddProduct = function (imgUrl) {
            $scope.reqModel.HinhAnh = imgUrl; 
            $scope.CheckDataEntity($scope.reqModel); 
            if ($scope.CheckDataEntity($scope.reqModel) === false) {
                return;
            }
           // if ($scope.CheckDataEntity($scope.reqModel.MoTa) === true) {
            //    $scope.isClickedSendAppraisal = true; 
            //} if ($scope.CheckDataEntity($scope.reqModel.SoLuongTon) === true) {
            //    $scope.isClickedSendAppraisal = true; 
            //} if ($scope.CheckDataEntity(imgUrl) === true) {
            //    $scope.isClickedSendAppraisal = true;
            //    return  
            //}
          
            // thêm sản phẩm
            $alert.showConfirmUpdateNewProfile($rootScope.initMessage('Bạn muốn thêm sản phẩm này'), function () {
                $GetDataPreference.AddProduct($scope.reqModel, function (res) { 
                    switch (res.data.ReturnCode) {
                        case -1:
                            toastr.error("Có lỗi trong quá trình sử lý");
                            break;
                        case 1:  
                            $state.go('Admin.ProductManager');
                            toastr.success("Đã thêm thành công"); 
                            $state.reload();    
                            break;
                        case -2:
                            toastr.success("Không thể kết nối đến server");
                            break;


                    }
                });
            });  

        }; 

        // xóa hình
        $scope.removeImage = function () {
            $scope.ImageModel.CHAN_DUNG.ImageData.compressed.dataURL = ""; 
        }


    }]);


// upload hình 

mainmodule.directive('ngImageCompress', ['$q',
    function ($q) {

        var URL = window.URL || window.webkitURL;

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';

            var resizeArea = document.getElementById(resizeAreaId);

            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
                document.body.appendChild(resizeArea);
            }

            return resizeArea;
        };

        /**
         * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
         * @param {Image} sourceImgObj The source Image Object
         * @param {Integer} quality The output quality of Image Object
         * @return {Image} result_image_obj The compressed Image Object
         */

        var jicCompress = function (sourceImgObj, options) {

            var outputFormat = options.resizeType;
            var quality = options.resizeQuality * 100 || 70;
            var mimeType = '';
            if (outputFormat !== undefined && outputFormat === 'png') {
                mimeType = 'image/png';
            } else if (outputFormat !== undefined && (outputFormat === 'jpg' || outputFormat === 'jpeg' || outputFormat === 'image/jpg' || outputFormat === 'image/jpeg')) {
                mimeType = 'image/jpeg';
            } else {
                mimeType = outputFormat;
            }


            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;

            var height = sourceImgObj.height;
            var width = sourceImgObj.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            var cvs = document.createElement('canvas');
            cvs.width = width; //sourceImgObj.naturalWidth;
            cvs.height = height; //sourceImgObj.naturalHeight;
            var ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
            var newImageData = cvs.toDataURL(mimeType, quality / 100);
            var resultImageObj = new Image();
            resultImageObj.src = newImageData;
            return resultImageObj.src;

        };

        var resizeImage = function (origImage, options) {
            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;
            var quality = options.resizeQuality || 0.7;
            var type = options.resizeType || 'image/jpg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round(height *= maxWidth / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round(width *= maxHeight / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            //draw image on canvas
            var ctx = canvas.getContext('2d');
            ctx.drawImage(origImage, 0, 0, width, height);

            // get the data from canvas as 70% jpg (or specified type).
            return canvas.toDataURL(type, quality);
        };

        var createImage = function (url, callback) {
            var image = new Image();
            image.onload = function () {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };


        return {
            restrict: 'A',
            scope: {
                image: '=',
                resizeMaxHeight: '@?',
                resizeMaxWidth: '@?',
                resizeQuality: '@?',
                resizeType: '@?'
            },
            link: function postLink(scope, element, attrs) {

                var doResizing = function (imageResult, callback) {
                    createImage(imageResult.url, function (image) {
                        //var dataURL = resizeImage(image, scope);
                        var dataURLcompressed = jicCompress(image, scope);
                        // imageResult.resized = {
                        // 	dataURL: dataURL,
                        // 	type: dataURL.match(/:(.+\/.+);/)[1]
                        // };
                        imageResult.compressed = {
                            dataURL: dataURLcompressed,
                            type: dataURLcompressed.match(/:(.+\/.+);/)[1]
                        };
                        callback(imageResult);
                    });
                };

                var applyScope = function (imageResult) {
                    scope.$apply(function () {
                        if (attrs.multiple) {
                            scope.image.push(imageResult);
                        } else {
                            scope.image = imageResult;
                        }
                    });
                };


                element.bind('click', function (evt) {
                    $("#file1").val(""); 
                    if (attrs.multiple) {
                        scope.image = [];
                    }

                    var files = evt.target.files;
                    for (var i = 0; i < files.length; i++) {
                        if (scope.resizeType === undefined || scope.resizeType == '') {
                            scope.resizeType = files[i].type;
                        }
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function (imageResult) {
                                applyScope(imageResult);
                            });
                        } else { //no resizing
                            applyScope(imageResult);
                        }
                    }
                });

                element.bind('change', function (evt) {
                    //when multiple always return an array of images
                    if (attrs.multiple) {
                        scope.image = [];
                    }

                    var files = evt.target.files;
                    for (var i = 0; i < files.length; i++) {
                        if (scope.resizeType === undefined || scope.resizeType == '') {
                            scope.resizeType = files[i].type;
                        }
                        //create a result object for each file in files
                        var imageResult = {
                            file: files[i],
                            url: URL.createObjectURL(files[i])
                        };

                        fileToDataURL(files[i]).then(function (dataURL) {
                            imageResult.dataURL = dataURL;
                        });

                        if (scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                            doResizing(imageResult, function (imageResult) {
                                applyScope(imageResult);
                            });
                        } else { //no resizing
                            applyScope(imageResult);
                        }
                    }
                });
            }
        };
    }
]);
