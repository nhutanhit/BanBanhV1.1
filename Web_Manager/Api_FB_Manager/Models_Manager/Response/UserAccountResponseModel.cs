using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Response
{
    public class UserAccountResponseModel
    {
        public int MaKH { get; set; }
        public string HoTenKH { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public string GioiTinh { get; set; }
        public string Email { get; set; }
        public string DiaChiKH { get; set; }
        public string DienThoaiKH { get; set; }
        public DateTime NgaySinhKH { get; set; }
    }
}