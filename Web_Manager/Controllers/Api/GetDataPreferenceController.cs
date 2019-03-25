using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Controllers.Api
{
    public class GetDataPreferenceController : ApiController
    {
         DataAccess Db = new DataAccess();
        static DataAccess stringConnect = new DataAccess();
        static SqlConnection conn = new SqlConnection(stringConnect.ConnectionString());
        static SqlCommand cmd;
        static SqlDataAdapter adap;

       
       

        /// <author>anh.tran</author>
        /// <summary>
        /// getDataProduct
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public ApiResponse GetDataProduct()
        {
            try
            {
                List<DataProductResponseModel> listproducts;
                DataProductResponseModel pr;
                listproducts = new List<DataProductResponseModel>();
                conn.Close();
                conn.Open();
                cmd = new SqlCommand("select * from SanPham where trangthai = 1", conn);  // 1 còn bàn. 0 không bán nửa
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    pr = new DataProductResponseModel();
                    pr.MaSanPham = Int32.Parse(reader["MaSanPham"].ToString());
                    pr.TenSanPham = reader["TenSanPham"].ToString();
                    pr.GiaBan = reader["GiaBan"].ToString();
                    pr.GiaThiTruong = reader["GiaThiTruong"].ToString();
                    pr.MoTa = reader["MoTa"].ToString();
                    pr.SoLuongTon = Int32.Parse(reader["SoLuongTon"].ToString());
                    pr.TrangThai = bool.Parse(reader["TrangThai"].ToString());
                    pr.HinhAnh = reader["HinhAnh"].ToString();
                    pr.NgayNhapHang = DateTime.Parse(reader["NgayNhapHang"].ToString());
                    pr.MaThuongHieu = Int32.Parse(reader["MaThuongHieu"].ToString()); 
                    listproducts.Add(pr);
                }
                conn.Close();
                return ApiResponse.Success(listproducts);
            }
            catch (Exception)
            {
                return ApiResponse.Error();
            }

        }


    }
}