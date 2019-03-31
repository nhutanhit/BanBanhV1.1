using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Request;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;
using System.IO; 

namespace Web_Manager.Controllers.Api
{
    public class AdminProductManagerController: ApiController
    {
        DataAccess db = new DataAccess();
        Object AdminInformation;
         
        /// <author>anh.tran</author>
        /// <summary>
        /// Add product
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse AddProduct([FromBody] AdminAddProductRequestModel request)
        {
            try
            {
                var fileName = Path.GetFileName(request.HinhAnh); 
                String NgayNhapHang = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                string stringSlq = "insert into SanPham values(N'"+ request.TenSanPham+ "','"+request.GiaBan+"','"+request.GiaThiTruong+"',N'"+request.MoTa+"', '"+request.SoLuongTon+"','"+request.TrangThai+"',N'"+request.HinhAnh+"','"+ NgayNhapHang + "','"+request.MaThuongHieu+"') "; 
                try
                {
                    db.ThucThiCL(stringSlq);
                    return ApiResponse.Success(1); // thành công
                } 
                catch (Exception)
                {
                    return ApiResponse.Error(-2); // thất bại
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