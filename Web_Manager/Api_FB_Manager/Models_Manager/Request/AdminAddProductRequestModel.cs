using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Request
{
    public class AdminAddProductRequestModel
    {
        public string TenSanPham { get; set; } 
        public decimal GiaBan { get; set;  }
        public decimal GiaThiTruong { get; set; }
        public string MoTa { get; set; }
        public int SoLuongTon { get; set; }
        public int TrangThai { get; set; }
        public string HinhAnh { get; set; }
        public DateTime NgayNhapHang { get; set; }
        public int MaThuongHieu { get; set; }
        public int MaSanPham { get; set; }  // anh thêm 29/9

        public AdminAddProductRequestModel() { }
    }
}