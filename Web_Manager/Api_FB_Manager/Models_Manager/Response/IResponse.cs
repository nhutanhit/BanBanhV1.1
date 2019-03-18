using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Manager.Api_FB_Manager.Lib_Manager.Utils;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Response
{
    public class ApiResponse
    {
        public int ReturnCode { set; get; }
        public object Data { set; get; }
        public string Message { get; set; }

        public static ApiResponse Success(object Data = null)
        {
            return new ApiResponse()
            {
                Data = Data,
                ReturnCode = (int)ManagerExceptionType.SUCCESS
            };
        }

        public static ApiResponse Error(int ReturnCode = (int)ManagerExceptionType.ERROR, object Data = null)
        {
            return new ApiResponse()
            {
                Data = Data,
                ReturnCode = ReturnCode
            };
        }
    }
}