using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Models_Manager.Request
{
    public class UserLoginRequestModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        UserLoginRequestModel() { }
        public int Verify()
        {
            if (string.IsNullOrEmpty(this.UserName) || string.IsNullOrEmpty(this.Password))
            {
                if (string.IsNullOrEmpty(this.UserName))
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