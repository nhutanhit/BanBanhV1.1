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
    public class GetDetailOrderProductController : ApiController 
    {
        DataAccess db = new DataAccess();
         Object DetailOrderList;

        /// <author>anh.tran</author>
        /// <summary>
        /// GetOrderProduct
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ApiResponse GetOrderProduct([FromBody] GetDetailOrderProductRequestModel request )
        {
            try
            {
                try
                {
                    string stringSlq = "select DDH.MaDonHang,CTDDH.SoLuong, SP.TenSanPham, SP.GiaBan,Sp.HinhAnh, DDH.TinhTrangDonHang, AcUser.HoTenKH,DDH.NgayDat, DDH.DiaChiGiaoHang, DDH.SoDienThoai, AcUser.GioiTinh, AcUser.Email from  CHITIETDONDATHANG CTDDH, SANPHAM SP , DONDATHANG DDH, AccountUser AcUser where CTDDH.MaDonHang = '"+ request.Id + "' AND SP.MaSanPham = CTDDH.MaSanPham and CTDDH.MaDonHang = DDH.MaDonHang and DDH.MaKH = AcUser.MaKH";
                    DetailOrderList = db.get_DaTaTable(stringSlq);
                    if (DetailOrderList != null)
                    {
                        return ApiResponse.Success(DetailOrderList);
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