using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Request
{
    public class AdminLoginRequestModel
    {
        public string AccountName { get; set; }
        public string Password { get; set; }
        AdminLoginRequestModel() { }
        public int Verify()
        {
            if (string.IsNullOrEmpty(this.AccountName) || string.IsNullOrEmpty(this.Password))
            {
                if (string.IsNullOrEmpty(this.AccountName))
                {
                    return 2;
                }
                else if (string.IsNullOrEmpty(this.Password))
                {
                    return 3;
                }
            }
            return 1;
        }
    }
}