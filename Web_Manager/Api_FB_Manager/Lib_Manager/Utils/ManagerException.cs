using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Manager.Api_FB_Manager.Lib_Manager.Utils
{
    public class ManagerExceptionFactory
    {
        private ManagerExceptionFactory() { }
        //public static ManagerException getInstace(ManagerExceptionType type, object content, object data)
        //{
        //    String mess = "";
        //    switch (type)
        //    {
        //        case ManagerExceptionType.SUCCESS:
        //            mess = "SUCCESS";
        //            break;
        //        //case mPosExceptionType.NOT_PERMISSION:
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.NOT_PERMISSION);
        //        //    break;
        //        //case mPosExceptionType.PASSWORD_INCORRECT:
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG1006);
        //        //    break;
        //        //case mPosExceptionType.ACCOUNT_IS_TEMP_LOCK:
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG1009);
        //        //    break;
        //        //case mPosExceptionType.ACCOUNT_IS_LOCK:
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG1010);
        //        //    break;
        //        //case mPosExceptionType.MERCHANT_EXIST:
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG1001);
        //        //    break;
        //        //case mPosExceptionType.PROCESS_ERROR_MERCHANT :
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG1999);
        //        //    break;
        //        //case mPosExceptionType.PROCESS_ERROR_SO:
        //        //    mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG2999);
        //        //    break;
        //        default:
        //            // mess = MessageManagerUI.getInstance().GetMessage(MessageType.MSG0006);
        //            break;
        //    }
        //    if (content != null)
        //        mess = mess.TemplateFormat(content);

        //    return new ManagerException(mess, type, data);
        //}
        //public static ManagerException getInstace(ManagerExceptionType type)
        //{
        //    return getInstace(type, null, null);
        //}

    }

    public enum ManagerExceptionType
    {
        SUCCESS = 1,  // thành công. 
        ERROR = 0,    // thất bại
        NotConnect = -1, // không thể kết nói đến server. 
        NOT_PERMISSION = -1004,
        ERROR_INPUT_DATA_ENTITY = -100,
        ACCOUNT_IS_DETELE = -1002,
        PASSWORD_INCORRECT = -1001,
        USERNAME_INCONRRECT = -1000,
        IDCARD_INCORRECT = -1005,
    }

    public enum Status
    {
        SANPHAMCONBAN = 1,  // CÒN BÁN 
        SANPHAMKHONGBANNUA = 0,    // KHÔNG BÁN NỬA
       
    }

    public class ManagerException : Exception
    {
        public ManagerException() { }

        public ManagerException(int ReturnCode)
        {
            this.ReturnCode = ReturnCode;
        }

        public ManagerException(int ReturnCode, object Data)
        {
            this.ReturnCode = ReturnCode;
            this.data = Data;
        }

        public ManagerException(ManagerExceptionType ReturnCode)
        {
            this.ReturnCode = (int)ReturnCode;
        }

        public ManagerException(string message, ManagerExceptionType type, object data)
            : base(message)
        {
            this.type = type;
            this.data = data;
        }

        public ManagerException(string message, ManagerExceptionType type)
            : base(message)
        {
            this.type = type;
        }

        public ManagerException(string message, ManagerExceptionType type, Exception inner)
            : base(message, inner)
        {
            this.type = type;
        }

        public ManagerExceptionType type;
        public object data;
        public object data2;
        public int ReturnCode;
    }
}