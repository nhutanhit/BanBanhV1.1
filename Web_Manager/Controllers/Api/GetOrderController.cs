using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Controllers.Api
{
    public class GetOrderController : ApiController
    {
        DataAccess db = new DataAccess();
        Object OrderList;

        /// <author>anh.tran</author>
        /// <summary>
        /// GetOrderProduct
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse GetOrderProduct()
        {
            try
            {
                try
                {
                    string stringSlq = "select  *  from   AccountUser, DONDATHANG  Where AccountUser.MaKH = DONDATHANG.MaKH  and TinhTrangDonHang = 0";
                    OrderList = db.get_DaTaTable(stringSlq);
                    if (OrderList != null)
                    {
                        return ApiResponse.Success(OrderList);
                    }
                    else
                    {
                        return ApiResponse.Success(0); // không tìm thấy dữ liệu  server
                    }

                }
                catch (Exception)
                {

                    return ApiResponse.Error(-2);  // Không thể kết nối với severss
                }

            }
            catch (Exception)
            {
                return ApiResponse.Error(-1);  // -1 Có lỗi trong quá trình xử lý. 
            }
        }
    }
}