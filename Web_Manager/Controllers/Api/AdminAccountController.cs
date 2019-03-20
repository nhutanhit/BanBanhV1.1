using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Request;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Controllers.Api
{
    public class AdminAccountController : ApiController
    {
        DataAccess db = new DataAccess();
        Object AdminInformation;


        /// <author>anh.tran</author>
        /// <summary>
        /// admin Login
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse AdminLogin(AdminLoginRequestModel request)
        {
            try
            {
                string stringSlq = "select * from AccountAdmin Where UserAdmin = '" + request.AccountName + "' and PassAdmin = '" + request.Password + "' ";
                int count = db.TongBanGhi(stringSlq);                                                                                                                                                                                                                                                                              
                if (count > 0)
                {
                    try
                    {
                        AdminInformation = db.get_DaTaTable(stringSlq);
                        return ApiResponse.Success(AdminInformation); // thành công
                    }
                    catch (Exception)
                    {
                        return ApiResponse.Error(-1); // thất bại
                    }

                }
                else
                {
                    return ApiResponse.Error(-1); // thất bại
                }

            }
            catch (Exception)
            {
                return ApiResponse.Error(-1);  // có lỗi 
                throw;
            }
        }
    }
}