/// <reference path="../controller/user_cartcontroller.js" />
/// <reference path="../../scripts/ui-utils-ieshiv.min.js" />
//// <reference path="../service/accountService.js" /> 
/// <reference path="../../scripts/bootstrap.min.js" />
mainmodule.config(function ($stateProvider, $urlRouterProvider, $locationProvider, KeepaliveProvider, IdleProvider) {

    $urlRouterProvider.otherwise(function ($injector, $location) {
        //Anh:  Điều hướng sang trang 404    .
        var state = $injector.get('$state');
        var location = $location.path();

        if (location === "") {
            state.go("User");

        }
        else {
            state.go("error404");
        }
    });

    $stateProvider
        // State  User 
        .state('User', {
            url: '/trang-chu',
            templateUrl: '/wwwroot/views/pages/main/user.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        //{
                        //    files: [
                        //        "assest/css/font-awesome.min_user.css",
                        //        "assest/css/bootstrap.min_user.css",
                        //        "assest/css/teamplate_style_user.css",
                        //        "assest/css/style_user.css",   /*< !--layout -->*/
                        //    ]
                        //},
                        //{
                        //    serie: true,
                        //    files: [
                        //        "assest/js/plugin_user.js",
                        //        "assest/js/scripts_user.js",  /*< !--hieu ung show sp-- >*/ 
                        //    ]
                        //}
                    ]).then(function () {
                        return $ocLazyLoad.load('wwwroot/controller/user_MainController.js');
                    });
                }],
            },
            controller: 'userMainController',
        })
        // Page list giỏ hàng. 
        .state('Cart', {
            url: '/checkout-cart',
            templateUrl: '/wwwroot/views/pages/main/user_Cart.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                    ]).then(function () {
                        return $ocLazyLoad.load('wwwroot/controller/user_CartController.js');
                    });
                }],
            },
            controller: 'user_CartController',
        })

        // đặt hàng thành toán . 
        .state('Pay', {
            url: '/Pay-cart',
            templateUrl: '/wwwroot/views/pages/main/user_Pay_Cart.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                    ]).then(function () {
                        return $ocLazyLoad.load('wwwroot/controller/user_CartController.js');
                    });
                }],
            },
            controller: 'user_CartController',
        })

        // kiểm tra đơn hàng . 
        .state('CheckOrderCart', {
            url: '/Kiem-Tra-Don-Hang',
            templateUrl: '/wwwroot/views/pages/main/user_CheckOrderCart.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                    ]).then(function () {
                        return $ocLazyLoad.load('wwwroot/controller/user_CheckOrderCartController.js');
                    });
                }],
            },
            controller: 'CheckOrderController',
        })


        // State  Admin 
        .state('AdminLogin', {
            url: '/admin-dang-nhap',
            templateUrl: '/wwwroot/views/pages/account/adminLogin.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: [
                                "Assest/css/login.css",
                            ]
                        },
                        {
                            serie: true,
                            files: [
                                "Scripts/jquery-2.1.0.min.js",
                                "Scripts/bootstrap.min.js",
                                "Assest/css/util_login.css",
                            ]
                        }]).then(function () {
                            return $ocLazyLoad.load('wwwroot/controller/admin_LoginController.js');
                        });
                }],
            },
            controller: 'AdminLoginController',

        })
        //.state('ChangePassword', {
        //    url: '/thay-doi-mat-khau',
        //    templateUrl: '/wwwroot/views/pages/account/ChangePassword.html',
        //    controller: 'ChangePasswordController',
        //})
        .state('Admin', {
            url: '/Main',
            templateUrl: '/wwwroot/views/pages/main/admin.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: [
                                "Assest/css/main.css",
                                "Assest/css/custom.css"
                            ]
                        },
                        {
                            serie: true,
                            files: [
                                'Scripts/jquery-2.1.0.min.js',     //  ra vô
                                'Scripts/jquery.slimscroll.js',
                                'Assest/js/main.js',
                            ]
                        }]).then(function () {
                            return $ocLazyLoad.load('wwwroot/controller/admin_MainController.js');
                        });
                }],
            },
            controller: 'adminMainController',

        })
        // Quản lý đơn hàng
        .state('Admin.OrderManager', {
            url: '/Quan-Ly-Don-Hang',
            templateUrl: '/wwwroot/views/common/admin/OrderManager.html',
            controller: 'admin_OrderManagerManager',

        })

        // Quản lý sản phẩm
        .state('Admin.ProductManager', {
            url: '/Quan-Ly-San-Pham',
            templateUrl: '/wwwroot/views/common/admin/ProductManager.html',
            controller: 'admin_ProductManagerController',

        })
        // Thêm mới sản phẩm
        .state('Admin.AddNewProduct', {
            url: '/Them-Moi-San-Pham',
            templateUrl: '/wwwroot/views/common/admin/AddNewProduct.html',
            controller: 'admin_AddNewProductController',
            //resolve: {
            //    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            //        return $ocLazyLoad.load([
            //            {
            //                files: [
            //                    "Content/bootstrap.min2.css",
            //                ]
            //            }, {
            //                serie: true,
            //                files: [

            //                ]
            //            }]).then(function () {
            //                return $ocLazyLoad.load('wwwroot/controller/user_CheckOrderCartController.js');
            //            });
            //    }],
            //},
        })

        //.state('main.timeline', {
        //    url: '/timeline',
        //    templateUrl: '/wwwroot/views/pages/dashboard/timeline.html',
        //    controller: 'timelinecontroller',
        //    resolve: {
        //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: [
        //                        "Content/nice-select.min.css",
        //                        "Assest/css/timeline.css"
        //                    ]
        //                }, {
        //                    serie: true,
        //                    files: [
        //                        'Scripts/jquery-2.1.0.min.js',
        //                        'Scripts/jquery-ui-1.12.1.js',
        //                        'Scripts/bootstrap.min.js',
        //                        'Scripts/jquery.easing.min.js',
        //                        'Scripts/intlTelInput.js',
        //                        'Scripts/popper.min.js',
        //                        'Scripts/jquery.nice-select.min.js',
        //                        'Assest/js/timeline.js',
        //                    ]
        //                }]).then(function () {
        //                    return $ocLazyLoad.load('wwwroot/controller/maincontroller.js');
        //                });
        //        }],
        //    },
        //})


        //.state('main.contract', {
        //    url: '/quan-ly-hop-dong',
        //    templateUrl: '/wwwroot/views/pages/contract/contract.html',
        //    controller: 'contractController',
        //    resolve: {
        //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    files: [
        //                        "Content/nice-select.min.css",
        //                        "Assest/css/timeline.css"
        //                    ]
        //                }, {
        //                    serie: true,
        //                    files: [
        //                        'Scripts/jquery-2.1.0.min.js',
        //                        'Scripts/jquery-ui-1.12.1.js',
        //                        'Scripts/bootstrap.min.js',
        //                        'Scripts/jquery.easing.min.js',
        //                        'Scripts/intlTelInput.js',
        //                        'Scripts/popper.min.js',
        //                        'Scripts/jquery.nice-select.min.js',
        //                        'Assest/js/timeline.js',
        //                    ]
        //                }]).then(function () {
        //                    return $ocLazyLoad.load('wwwroot/controller/contractController.js');
        //                });
        //        }],
        //    },
        //})

        //  .state('main.gotoProfileManager', {
        //      url: '/quan-ly-ho-so',
        //      templateUrl: '/wwwroot/views/pages/profile/profileManager.html',
        //      controller: 'profileController',
        //      resolve: {
        //          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
        //              return $ocLazyLoad.load([
        //                  {
        //                      insertBefore: '#load_styles_before',
        //                      files: [
        //                          "Content/nice-select.min.css",
        //                         // "Assest/css/timeline.css",
        //                         // 'wwwroot/vendor/bootstrap-daterangepicker/daterangepicker-bs3.css',
        //                      ]
        //                  }, {
        //                      serie: true,
        //                      files: [
        //                          'Scripts/jquery-2.1.0.min.js',
        //                          'Scripts/jquery-ui-1.12.1.js',
        //                          'Scripts/bootstrap.min.js',
        //                          'Scripts/jquery.easing.min.js',
        //                          'Scripts/intlTelInput.js',
        //                          'Scripts/popper.min.js',
        //                          'Scripts/jquery.nice-select.min.js',
        //                         // 'Assest/js/timeline.js',
        //                          'wwwroot/service/profileService.js',
        //                          //'wwwroot/vendor/angular-ui-utils/ui-utils.min.js',
        //                          //'wwwroot/vendor/angular-ui-utils/ui-utils-ieshiv.min.js',
        //                          //'wwwroot/vendor/moment/min/moment.min.js',
        //                          //'wwwroot/vendor/bootstrap-daterangepicker/daterangepicker.js',
        //                      ]
        //                  }]).then(function () {
        //                      //return $ocLazyLoad.load('wwwroot/controller/profileController.js');
        //                  });
        //          }],
        //      },
        //  })

        //  .state('main.gotoAccountManager', {
        //      url: '/quan-ly-tai-khoan',
        //      templateUrl: '/wwwroot/views/pages/account/AccountManager.html',
        //      controller: 'managerAccountController',
        //      resolve: {
        //          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
        //              return $ocLazyLoad.load([
        //                  {
        //                      insertBefore: '#load_styles_before',
        //                      files: [
        //                          "Content/nice-select.min.css",
        //                          "Assest/css/timeline.css",
        //                         // 'wwwroot/vendor/bootstrap-daterangepicker/daterangepicker-bs3.css',
        //                      ]
        //                  }, {
        //                      serie: true,
        //                      files: [
        //                          'Scripts/jquery-2.1.0.min.js',
        //                          'Scripts/jquery-ui-1.12.1.js',
        //                          'Scripts/bootstrap.min.js',
        //                          'Scripts/jquery.easing.min.js',
        //                          'Scripts/intlTelInput.js',
        //                          'Scripts/popper.min.js',
        //                          'Scripts/jquery.nice-select.min.js',
        //                          'Assest/js/timeline.js',
        //                          //'wwwroot/service/accountService.js',
        //                          //'wwwroot/vendor/angular-ui-utils/ui-utils.min.js',
        //                          //'wwwroot/vendor/angular-ui-utils/ui-utils-ieshiv.min.js',
        //                          //'wwwroot/vendor/moment/min/moment.min.js',
        //                          //'wwwroot/vendor/bootstrap-daterangepicker/daterangepicker.js',

        //                      ]
        //                  }]).then(function () {
        //                      // return $ocLazyLoad.load('wwwroot/controller/managerAccountController.js');
        //                  });
        //          }],
        //      },
        //  })


        .state('error404', {
            url: '/error404',
            templateUrl: '/wwwroot/views/common/error404.html',
            controller: '404controller',
        });

});
mainmodule.config(['$translateProvider',
    function ($translateProvider) {

        var $cookies;   // init cookies for init below
        angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
            $cookies = _$cookies_;
        }]);


        $translateProvider.translations('en', {

            /* -------- Menu Name ---------- */
            'ManageProfile': 'Quản lý hồ sơ',
            'ManageContract': 'Quản lý hợp đồng',
            'ManageAccount': 'Quản lý tài khoản',
            'Logout': 'Đăng xuất',


        });


        $translateProvider.translations('vn', {


            /* --------  Menu Name ---------- */

            'ManageProfile': 'Quản lý hồ sơ',
            'ManageContract': 'Quản lý hợp đồng',
            'ManageAccount': 'Quản lý tài khoản',


            /* -------- Button Name ---------- */
            'Login': 'Đăng nhập',
            'Update': 'Cập nhật',
            'Logout': 'Đăng xuất',
            'Search': 'TÌM KIẾM',

            // ******* Form login and Change password ********// 

            'ChangeAccount': 'Đổi Mật Khẩu',
            'MessageChangeAccount': 'Vui lòng thay đổi mật khẩu cho lần đầu tiên đăng nhập vào hệ thống!',
            'NewPassWord': 'Mật khẩu mới',
            'ConfirmPassWord': 'Xác nhận mật khẩu',

            // ******* Messenger ********// 
            'LoginSuccess': 'Đăng nhập thành công',
            'LoginFail': 'Đăng nhập thất bại',
            'PasswordIncorrect': 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!',
            'SessionInconrect': 'Session không đúng',
            'AccountNotPermission': 'Account không có quyền',
            'AccountDelete': 'Tài khoản này đã bị khóa. Vui lòng kiểm tra lại!',
            'AccountNameNotNull': 'Tên đăng nhập không được bỏ trống!',
            'PassWordNotNull': 'Mật khẩu không được bỏ trống!',
            'AccountPassWordNotNull': 'Mật khẩu không được bỏ trống',
            'LengthAccountOverCharacter': 'Chiều dài mật khẩu và tài khoản không được vượt qua 20 ký tự',
            'PleaseInputAccountName': 'Vui lòng nhập Tài khoản',
            'PleaseInputPassword': 'Vui lòng nhập Mật Khẩu',
            'NewPassWordotherConfirmPassWordother': 'Xác nhận mật khẩu chưa đúng. Vui lòng kiểm tra lại!',
            'ChangePasswordForFirstLoginSuccess': 'Đổi mật khẩu thành công',
            'ChangePasswordForFirstLoginFail': 'Đổi mật khẩu thất bại',
            'PasswordVerifyNotCorrect': 'Mật khẩu và xác nhật mật khẩu không khớp nhau. Vui lòng kiểm tra lại!',
            'PassworValidation': 'Mật khẩu hợp lệ có độ dài từ 6 đến 20 ký tự, có chữ, số, chữ hoa, chữ thường, ký tự đặc biệt. Không chấp nhận khảng trắng và chữ có dấu!',
            'PassWordOldNotNull': 'Mật khẩu cũ không được phép rỗng',
            'PassWordOldError': 'Mật khẩu cũ không đúng',
            'AccountNotExists': 'Account không tồn tại',
            'PassWordOldExists': 'Trùng mật khẩu cũ',
            'MessageChangeAccount': 'Vui lòng thay đổi mật khẩu cho lần đầu tiên đăng nhập vào hệ thống!',
            'NoteNotNull': 'Vui lòng nhập ghi chú !',
            'CancelRequestSuccessfully': 'Hủy hồ sơ thành công!',
            'StstemError': 'Có lỗi trong quá trình xử lý!',
            'ApplicationFormWasUpdatedbyAnotherAccount!': 'Hồ sơ đã được cập nhật bởi người khác!',


            // ******* Chi tiết hồ sơ ********//

            'Profiledetails': 'Chi tiết hồ sơ',
            'ResidentStatus': 'Tình trạng cư trú',
            'ProfileID': 'Mã hồ sơ',
            'Status': 'Trạng thái',
            'Shop': 'Cửa hàng',
            'StaffInformationtoProfile': 'Thông tin nhân viên làm hồ sơ',
            'StaffInformation': 'Thông tin nhân viên',
            'PleaseChoose': '-Vui lòng chọn-',

            //Tab_table Thông tin sản phẩm và thanh toán . 
            'ProductInformationEndPayment': 'Thông tin sản phẩm và thanh toán',
            'ProductInformation': 'Thông tin sản phẩm',
            'GroupProduct': 'Nhóm sản phẩm',
            'Trademark': 'Thương hiệu',
            'ProductID': 'Mã sản phẩm',
            'Paymentform': 'Hình thức thanh toán',
            'Bank': 'Ngân hàng',
            'AccountBank': 'Tài khoản ngân ',
            'PriceProduct': 'Gía bán/sản phẩm',
            'Quantity': 'Số lượng',
            'TotalMoney': 'Tổng tiền',
            'Instalmentperiod': 'Kỳ hạn trả góp',
            'InterestRrate': 'Lãi xuất',
            'AgentCode': 'Agent Code',
            'ChargeProfile': 'Phí hồ sơ',
            'PrepayMoney': 'Tiền trả trước',
            'PercentPrepay': '% Trả trước',
            'Rest': 'Còn lại',
            'InterestAmount': 'Lãi suất',
            'TotalInterestAmount': 'Tổng lãi suất',
            'FirstMonthPayment': 'Thanh toán tháng đầu',
            'MonthlyPayment': 'Thanh toán hàng tháng',
            'TotalPayment': 'Tổng tiền thanh toán',
            'PriceOfProduct': 'Giá bán/sản phẩm',
            'AmountPaidInAdvance': 'Số tiền trả trước',

            //Tab_table thông tin cá nhân
            'PersonalInformation': 'Thông tin cá nhân',
            'FullNamVietnamese': 'Tên KH (Tiếng Việt)',
            'FullNameEnglish': 'Tên KH (Tiếng Anh)',
            'Email': 'Email',
            'PhoneNumber': 'Số điện thoại',
            'IDCardNumberPasPassport': 'CMND/Passport/Thẻ cc',
            'IDCardNumberPasPassportStale': 'CMND/Passport/Thẻ cc cũ',
            'IssuedPlaces': 'Nơi cấp',
            'Nationality': 'Quốc tịch',
            'Titles': 'Danh xưng',
            'DateofBirth': 'Ngày sinh',
            'MeritalStatus': 'Tình trạng hôn nhân',
            'NumberofDependence': 'Số người phụ thuộc',

            //Tab_table Thông tin cư trú
            'InfomationResidence': 'Thông tin cư trú',
            'PermanentAddress': 'Địa chỉ thường trú',
            'FamilyBook': 'Số hộ khẩu',
            'StateCode': 'Tỉnh/thành phố',
            'District': 'Quận/Huyện',
            'Ward': 'Phường/Xã',
            'StreetAddress': 'Số và tên đường ',
            'TemporaryAddress': 'Địa chỉ tạm trú',
            'CurrentAddressIsTheSameAsAbove': 'Địa chỉ tạm trú giống với địa chỉ thường trú',
            'HomePhone': 'Điện thoại nhà',
            'TypeofResidence': 'Loại cư trú',
            'StayWith': 'Sống với ai',
            'ResidenceTime': 'Thời gian cư trú',
            '': 'Địa chỉ hiện tại giống như trên',

            //Tab_table Thông tin nghề nghiệp
            'JobInformation': 'Thông tin nghề nghiệp',
            'CompanyInformation': 'Thông tin công ty',
            'CompanyName': 'Tên công ty',
            'CompanyNumberPhone': 'Điện thoại công ty',
            'TypeofCompany': 'Loại hình công ty ',
            'BusinessRef.No': 'Giấy phép ĐKKD',
            'CompanyAddress': 'Địa chỉ công ty',
            'Departments': 'Phòng ban',
            'Position': 'Vị trí',
            'TypeofEmployment': 'Loại hợp đồng',
            'WorkingTime': 'Thời gian làm việc',
            'Salary': 'Thu nhập',
            'Salarydate': 'Ngày nhận lương',
            'ContactTime': 'Thời gian liên lạc',
            'Contactable': 'Phương thức liên lạc',
            'WorkInformation': 'Thông tin việc làm',
            'Hello': 'Xin chào:',
            //Tab_table Thông tin người tham chiếu
            'ReferencePeopleInformation': 'Thông tin người tham chiếu',
            'ReferencePeopleInformationTwo ': 'Thông tin người tham chiếu 2',
            'TypePersonal': 'Loại tham chiếu',
            'Relationship': 'Mối quan hệ',
            'MeritalStatus': 'Tình trạng hôn nhân',
            'ThesameFamilybookwithCustomer': 'Cùng hộ khẩu với KH',
            'ReferenceInformationTwo': 'Thông tin tham chiếu 2',

            //  //Tab_table Hình ảnh chứng từ và Ghi chú cửa hàng
            'SupportingDocumentAndNote': 'Hình ảnh chứng từ và Ghi chú cửa hàng',
            'Note': 'Ghi chú',
            'SupportingDocument': 'Hình ảnh chứng từ',
            'SelfiePicture': 'Chân dung',
            'Maximun10pictureofEachApplicationForm': '( *Mỗi hồ sơ được tối đa 10 ảnh )',
            'DrivingLicense': 'Bằng lái xe',
            'UtilityBill': 'Hóa đơn tiện ích',
            'IncomeProof': 'Chứng minh thu nhập',
            'HealthInsurance': 'BH Y tế',
            'TaxorBusinessRef.NoDoucment': 'Biên lai thuế hoặc giấy ĐKKD',

            /* -------- Profile Manager ---------- */
            'Description': 'Đây là trang admin về ACS',
            'Language': 'Tiếng Việt',
            'FromRegisterDate': 'Ngày đăng ký',
            'To': 'đến',
            'SearchRequest': 'Điều kiện tìm kiếm',
            'SearchResult': 'Kết quả tìm kiếm',
            'No': 'STT',
            'CustomerName': 'Họ tên KH',

            /* -------- account Manager ---------- */
            'LoginName': 'Tên đăng nhập',
            'AccountType': 'Loại tài khoản',
            'Address': 'Địa chỉ',
            'CreateDate': 'Ngày tạo',
            'OldPassword': 'Mật khẩu cũ',

            // ******* Form login ********// 
            'UserName': 'Tên đăng nhập',
            'PassWord': 'Mật khẩu',
            'Login': 'Đăng nhập',
            'LoginSuccess': 'Đăng nhập thành công',
            'LoginFail': 'Đăng nhập thất bại',
            'PasswordIncorrect': 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!',
            'AccountNameInconrect': 'Tên đăng nhập không đúng. Vui lòng kiểm tra lại!',
            'AccountInfo': 'Thông tin tài khoản',



            // *****************************
            'LengthAccountOverCharacter': 'Chiều dài mật khẩu và tài khoản không được vượt qua 20 ký tự',
            'PleaseInputAccountName': 'Vui lòng nhập Tài khoản',
            'PleaseInputPassword': 'Vui lòng nhập Password',
            'AccountPassWordNotNullAccountPassWordNotNull': 'Mật khẩu không được bỏ trống',

            // *****************************
            'PleaseInputAccountName': 'Vui lòng nhập Tài khoản',
            'PleaseInputPassword': 'Vui lòng nhập Password',
            'Login': 'Đăng nhập',

            //******Add new contract*****//
            'JustAllowAddNewIn3Days': 'Chỉ được thêm mới hồ sơ trong vòng 3 ngày.',
            'ErrorProccessing': 'Có lỗi trong quá trình xử lý!',
            'HitSaveButtonToSaveYourData': 'Nhấn lưu tạm để lưu lại thông tin hồ sơ bạn vừa nhập.',
            'Cancel': 'Đóng',
            'Accept': 'Đồng ý',
            'Yes': 'Có',
            'No': 'Không',
            'AddContractSuccess': "Thêm mới thành công hồ sơ mã {0}! Bạn muốn cập nhật thông tin hồ sơ mới hay không?",
        });

        var language = $cookies.get('language');

        if (language == 'en')
            $translateProvider.preferredLanguage('en')
        else
            $translateProvider.preferredLanguage('vn')  //default

        $translateProvider.useSanitizeValueStrategy(null);

        // $translateProvider.useSanitizeValueStrategy('sanitize');
    }
]);
