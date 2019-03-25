using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Lib_Manager.Utils;
using Web_Manager.Api_FB_Manager.Models_Manager.Request;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Controllers.Api
{

    public class AdminUpdateStatusController : ApiController
    {

        DataAccess db = new DataAccess();

        /// <author>anh.tran</author>
        /// <summary>
        /// UpdateStatus
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse UpdateStatus([FromBody]AdminUpdateStatusRequestModel request)
        {
            try
            {
                // nếu Status  = 1 //  duyệt thì phải kiểm tra sản phẩm còn trong giỏ hàng hay không. 
                try
                {
                    string stringSlq = "update	DONDATHANG set TinhTrangDonHang = '" + request.TinhTrangDonHang + "' where MaDonHang = '" + request.MaDonHang + "'";
                    db.ThucThiCL(stringSlq);
                    return ApiResponse.Success(1); // thành công
                }

                catch (Exception)
                {
                    return ApiResponse.Error(-2);  // Không thể kết nối với sever
                }

            }
            catch (Exception)
            {
                return ApiResponse.Error(-1); // -1 Có lỗi trong quá trình xử lý. 

            }
        }

 
    }
}