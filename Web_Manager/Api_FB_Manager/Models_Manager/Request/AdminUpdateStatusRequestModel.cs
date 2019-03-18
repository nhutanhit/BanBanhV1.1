using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Request
{
    public class AdminUpdateStatusRequestModel
    {
        public string MaDonHang { get; set; }
        public string TinhTrangDonHang { get; set;  }
       

        public AdminUpdateStatusRequestModel() { }
    }
}