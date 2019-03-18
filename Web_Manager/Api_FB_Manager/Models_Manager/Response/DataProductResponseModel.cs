using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Response
{
    public class DataProductResponseModel
    {
        public int MaSanPham { get; set; }
        public string TenSanPham { get; set; }
        public string GiaBan { get; set; }
        public string GiaThiTruong { get; set; }
        public string MoTa { get; set; }
        public int SoLuongTon { get; set; }
        public bool TrangThai { get; set; }
        public DateTime? NgayNhapHang { get; set; }
        public string HinhAnh { get; set; }
        public int MaThuongHieu { get; set; }
       
        public DataProductResponseModel() { }
    }
}