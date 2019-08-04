using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Models
{
    public class AccessToken
    {
        /// <summary>
        /// アクセストークン
        /// </summary>
        public string access_token { get; set; }
    }

    public class Code
    {
        /// <summary>
        /// 認証コード
        /// </summary>
        public string code { get; set; }
    }
}
