using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Response
{
    public class UserLoginResponseModel
    {
        public int MaKH { get; set; }
        public string HoTenKH { get; set; }
        public string GioiTinh { get; set; }
        public string Email { get; set; }
        public string MaKHMaKH { get; set; }
        public string DienThoaiKH { get; set; }
        public DateTime NgaySinhKH { get; set; }

        public UserLoginResponseModel() { } 

    }
}