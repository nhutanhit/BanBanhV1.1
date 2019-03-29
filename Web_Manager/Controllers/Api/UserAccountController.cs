using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Request;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Controllers.Api
{
    public class UserAccountController : ApiController
    {

        DataAccess db = new DataAccess();
        Object  UserInformation;

        /// <author>man.nguyen</author>
        /// <summary>
        /// user Login
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse UserLogin(UserLoginRequestModel request)
        {
            try
            {
                string stringSlq = "select * from AccountUser Where TenDangNhap = '" + request.UserName + "' and MatKhau = '" + request.Password + "' "; 
                int count = db.TongBanGhi(stringSlq); 
               
                if (count > 0){
                    try
                    { 
                        UserInformation =  db.get_DaTaTable(stringSlq); 
                        return ApiResponse.Success(UserInformation); // thành công
                    }
                    catch (Exception) {
                        return ApiResponse.Error(-1); // thất bại
                    }
                   
                }
                else {
                    return ApiResponse.Error(-1); // thất bại
                }
               
            }
            catch (Exception )
            {
                return ApiResponse.Error(-1);  // có lỗi 
                throw;
            }
        }
    }
}