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

    public class AuthInfo
    {
        /// <summary>
        /// 認可コード
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// ユーザーコード
        /// </summary>
        public string Uuid { get; set; }
    }
}
