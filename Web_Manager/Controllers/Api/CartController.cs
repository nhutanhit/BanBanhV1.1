using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic; 
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Net.Http.Headers;
using System.Web.Http.Controllers;
using System.Web.Script.Serialization;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Lib_Manager.SendEmail;
using Web_Manager.Api_FB_Manager.Models_Manager.Request;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;
using System.Linq;

namespace Web_Manager.Controllers.Api
{
    public class CartController : ApiController
    {
        DataAccess db = new DataAccess();
        SendEmail sendEmail = new SendEmail(); 

        /// <author>anh.tran</author>
        /// <summary>
        /// Mua sản phẩm, 
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse AddCart()
        {
            try
            {
                JavaScriptSerializer js = new JavaScriptSerializer();
                // list gio hang 
                string stringMyListCart = Request.Headers.GetCookies()[0]["myListCartInfo"].Value;
                // User Account Info
                string stringMyAccount = Request.Headers.GetCookies()[0]["UserAccountInfo"].Value; 
                UserCartResponseModel[] MyListCart = js.Deserialize<UserCartResponseModel[]>(stringMyListCart);
                UserAccountResponseModel [] MyAccountInfo = js.Deserialize<UserAccountResponseModel []>(stringMyAccount);
                String NgayDat = DateTime.Now.ToString("yyyy-MM-dd"); 
                //  Random tạo khóa chính cho các table
                Random ran = new Random();
                long MaHang =   ran.Next(0, 1000000) ; 
                string MaDonHang = "DH"+MaHang; 
                // insert Table DONDATHANG 
                db.ThucThiCL("insert into DONDATHANG values('"+ MaDonHang + "','" + NgayDat + "','" + "" + "','" + MyAccountInfo[0].DiaChiKH + "' ,'" + MyAccountInfo[0].DienThoaiKH + "' ,'" + 0 + "' , '" + MyAccountInfo[0].MaKH + "' )");
                for (int j = 0; j < MyListCart.Length; j++)
                {
                    db.ThucThiCL(" insert into CHITIETDONDATHANG values('" + MyListCart[j].MaSanPham + "' , '" + MaDonHang + "' , '" + MyListCart[j].SoLuong + " ' )"); 
                }
                // Send email cho khách hàng và admin  
                try
                {
                    sendEmail.SendGmailKhachHang(MyAccountInfo[0].HoTenKH, MaDonHang, NgayDat, null, MyAccountInfo[0].DiaChiKH, MyAccountInfo[0].Email); 
                }
                catch (Exception)
                {

                    throw;
                }

            }
            // lisk thong tin khac hang
            catch (Exception)
            {
                return ApiResponse.Error(-1);
            }
           


            return ApiResponse.Success(1);

        }



    }
}