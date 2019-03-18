using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Web_Manager.Api_FB_Manager.DAO_Manager;
using Web_Manager.Api_FB_Manager.Models_Manager.Response;

namespace Web_Manager.Models
{
    public class CheckPermissionAttribute : ActionFilterAttribute
    {
        //public override void OnActionExecuting(HttpActionContext actionContext) {
        //    try
        //    {
        //        base.OnActionExecuting(actionContext);
        //        var userAccount = actionContext.Request.Headers.GetCookies()[0]["UserAccountInfo"].Value.FromJson<UserAccountModel>();

        //        var response = DataAccess.getInstance().CheckAccountLogin(new CheckAccountLoginRequestForBE()
        //        {
        //            AccountName = Account.AccountName,
        //            Session = Account.Session,
        //            RoleCode = RoleCodeCheck
        //        });
        //        actionContext.Request.Properties.Add(new KeyValuePair<string, object>("Account", Account));
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

    }
}