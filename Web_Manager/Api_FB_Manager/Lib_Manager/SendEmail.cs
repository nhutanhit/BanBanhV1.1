using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Api_FB_Manager.Lib_Manager.SendEmail 
{
    public class SendEmail : ApiController
    {
        // Gửi Gmail cho Khách hàng
        [HttpPost]
        public ApiResponse SendGmailKhachHang(string TenKH, String MaDonHang, String ngayDat, String ngayGiao, string diachi, string GmailKhachHang)
        {
            // code send Gmail 
            string senderID = "nhutanhit@gmail.com";
            string senderPassword = "nhutanh10a3";
            string xacnhan = "www.BuShop.somee.com/NguoiDung/KiemTraDonHang";
            string result = "Gửi gmail thành công";
            string body =   
                        " Cám ơn bạn \n " + TenKH + "đã tin tưởng và mua hàng.        " +
                        "Thông tin giỏ hàng của bạn : ";
            body += "Mã đơn hàng:  \t " + MaDonHang;
            body += "Ngày đặt : " + ngayDat + "\tNgày Giao" + ngayGiao + "\n";
            body += "Địa chỉ: \t: " + diachi;
            body += "Bạn có thể lên trang  " + xacnhan + "  để kiểm tra đơn hàng." +
                "____________Cám ơn bạn đã ủng hộ_____________";
            try
            {
                MailMessage mail = new MailMessage();

                mail.To.Add(GmailKhachHang);   // gmail người nhận "nguyenmy27031997@gmail.com" 
                mail.From = new MailAddress(GmailKhachHang);
                mail.Subject = "Bushop Thông Báo";
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential(senderID, senderPassword);
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
            catch (Exception )
            {
                return ApiResponse.Error(-1); // -1 Có lỗi trong quá trình xử lý. 
            }
            return ApiResponse.Success(); // thành công
        }

        // Gửi Gmail cho Admin 
        [HttpPost]
        public ApiResponse SendGmailAdmin(string TenKH, int MaDonHang, DateTime ngayDat, DateTime ngayGiao, string diachi, string GmailKhachHang)
        {
            // code send Gmail 
            string senderID = "nhutanhit@gmail.com";
            string senderPassword = "nhutanh10a3";
            string titiel = "Thông Báo: \n";
            string result = "Gửi gmail thành công";
            string body = titiel + " " +
                        " Bạn có đơn hàng mới từ \n " + TenKH;
            body += "Mã đơn hàng:  \t " + MaDonHang;
            body += "Ngày đặt : " + ngayDat + "\tNgày Giao" + ngayGiao + "\n";
            body += "Địa chỉ: \t: " + diachi;
            body += "Gmail Khach Hang : " + GmailKhachHang;
            body += "Xem Chi Tiết " + " http://www.bushop.somee.com/Admin ";
            try
            {
                MailMessage mail = new MailMessage();

                mail.To.Add(senderID);
                mail.From = new MailAddress(GmailKhachHang);
                mail.Subject = "BuShop_Bạn Có Đơn Hàng Mới ";
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential(senderID, senderPassword);
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
            catch (Exception )
            {
                return ApiResponse.Error(-1);  // Không thể kết nối với sever
            }
            return   ApiResponse.Success(1);
        }
    }
}