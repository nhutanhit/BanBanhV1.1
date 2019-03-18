using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.DAO_Manager
{
    public class DataAccess
    {

        public string ConnectionString()
        {
            try
            {
                string connectionString = @"Data Source=DESKTOP-TQVTDSF\SQL_NHUTANH_2014;Initial Catalog=db_MyWebOnline;Integrated Security=True";
                return connectionString;
            }
            catch (Exception)
            {

                throw;
            }

        }

        static string connec = @"Data Source=DESKTOP-TQVTDSF\SQL_NHUTANH_2014;Initial Catalog=db_MyWebOnline;Integrated Security=True";
        SqlConnection connection = new SqlConnection(connec);
        SqlDataAdapter adap;
        SqlCommand cmd;


        /// <summary>
        /// Mở kết nối
        /// </summary>
        public void KetNoi()
        {
            if (connection.State == ConnectionState.Closed)
                connection.Open();
        }
        /// <summary>
        /// Ngắt kết nối
        /// </summary>
        public void NgatKetNoi()
        {
            try
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
            catch (Exception)
            {
                 
                throw;
            }
        }


        public DataTable get_DaTaTable(string clSelect)
        {
            try
            {

                KetNoi();
                adap = new SqlDataAdapter(clSelect, connection);
                DataTable dt = new DataTable();
                adap.Fill(dt);
                NgatKetNoi();
                return dt; 
            }
            catch (Exception)
            {

                throw;
            }
        }


        /// <summary>
        /// Thực thi câu lệnh select
        /// </summary>
        /// <param name="caulenh"> </param>

        public void ThucThiCL(string caulenh)
        {
            try
            {
                KetNoi();
                cmd = new SqlCommand(caulenh, connection);
                cmd.ExecuteNonQuery();// thực thi câu lệnh Insert, Update, delete
                NgatKetNoi();
            }
            catch (Exception)
            {

                throw;
            }
        }

        //kiem tra ma
        public int TongBanGhi(string strSelect)
        {
            try
            {
                KetNoi();
                DataTable dtTong = new DataTable();
                adap = new SqlDataAdapter(strSelect, connec);
                adap.Fill(dtTong);
                // 
                int sbg = dtTong.Rows.Count;
                NgatKetNoi();
                return sbg;
             
            }
            catch (Exception)
            {

                throw;
            }
        }





    }
}