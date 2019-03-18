using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Request
{
    public class SearchOrderRequestModel
    {
        public string MaDonHang { get; set; }
        public string Value { get; set; }
        public SearchOrderRequestModel() { }
    }
}