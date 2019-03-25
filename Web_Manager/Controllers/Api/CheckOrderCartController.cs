using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Request;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Controllers.Api
{
    public class CheckOrderCartController :ApiController
    {
        DataAccess db = new DataAccess();
        Object AdminInformation;
        Object ListCartOrder;
        /// <author>anh.tran</author>
        /// <summary>
        /// GetOrderProduct
        /// </summary>
        /// <returns></returns>
        //[HttpPost]
        //public ApiResponse getCheckOrderCart()
        //{
        //    try
        //    {
        //        try
        //        {
        //            JavaScriptSerializer js = new JavaScriptSerializer();  
        //            // User Account Info
        //            string stringMyAccount = Request.Headers.GetCookies()[0]["UserAccountInfo"].Value; 
        //            UserAccountResponseModel[] AdminInformation = js.Deserialize<UserAccountResponseModel[]>(stringMyAccount);
        //            string stringSlq = "select Ac.MaKH, Ac.HoTenKH, DienThoaiKH, NgayDat, TinhTrangDonHang, NgayGiao, MaDonHang from AccountUser ac, DONDATHANG ddh where ac.MaKH = '"+ AdminInformation[0].MaKH + "' and ac.MaKH = ddh.MaKH and TinhTrangDonHang !=3 and TinhTrangDonHang!= 5";
        //            ListCartOrder = db.get_DaTaTable(stringSlq);
        //            if (ListCartOrder != null)
        //            {
        //                return ApiResponse.Success(ListCartOrder);
        //            }
        //            else
        //            {
        //                return ApiResponse.Success(0); // không tìm thấy dữ liệu  server
        //            }

        //        }
        //        catch (Exception)
        //        {

        //            return ApiResponse.Error(-2);  // Không thể kết nối với severss
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        return ApiResponse.Error(-1);  // -1 Có lỗi trong quá trình xử lý. 
        //    }
        //}

        /// <author>anh.tran</author>
        /// <summary>
        /// Tìm đơn hàng của khách
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ApiResponse SearchCheckOrder([FromBody] SearchOrderRequestModel request)
        {
            try
            {
                try
                {
                   
                    string stringSlq = "select Ac.MaKH, Ac.HoTenKH, DienThoaiKH, NgayDat, TinhTrangDonHang, NgayGiao, MaDonHang from AccountUser ac, DONDATHANG ddh where   ac.MaKH = ddh.MaKH and ddh.MaDonHang = '" + request.MaDonHang+"'";
                    ListCartOrder = db.get_DaTaTable(stringSlq);
                    if (ListCartOrder != null)
                    {
                        return ApiResponse.Success(ListCartOrder);
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