using Microsoft.Extensions.Options;
using SwarmPlus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SwarmPlus.Service
{
    public class LoginService
    {
        /// <summary>
        /// 認証サービス
        /// </summary>
        /// <param name="clientId">クライアントID</param>
        /// <param name="clientSecret">クライアントシークレット</param>
        /// <returns></returns>
        public string Auth(string code)
        {
            return code;
        }
    }
}
