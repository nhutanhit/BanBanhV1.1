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
    public class SearchOrderProductController : ApiController
    {
        DataAccess db = new DataAccess();
        Object SearchOrderResponse;

        /// <author>anh.tran</author>
        /// <summary>
        /// Search
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse Search([FromBody]SearchOrderRequestModel request)
        {
            
           
            try
            {
                try
                {

                    if (request.MaDonHang == null)
                    {
                        string stringSlq = "select  *  from   AccountUser, DONDATHANG  Where AccountUser.MaKH = DONDATHANG.MaKH  and   TinhTrangDonHang = '"+ request .Value+ "'";
                        SearchOrderResponse = db.get_DaTaTable(stringSlq); 
                    }
                    else {
                        string stringSlq = "select  *  from   AccountUser, DONDATHANG  Where AccountUser.MaKH = DONDATHANG.MaKH  and  MaDonHang = '" + request.MaDonHang + "'";
                        SearchOrderResponse = db.get_DaTaTable(stringSlq);
                    }

                  
                    if (SearchOrderResponse != null)
                    {
                        return ApiResponse.Success(SearchOrderResponse);
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