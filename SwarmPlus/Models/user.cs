using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Models
{
    public class User
    {
        /// <summary>
        /// ユーザーID(UUID)
        /// </summary>
        public string UserID { get; set; }

        /// <summary>
        /// アクセストークン
        /// </summary>
        public string AccessToken { get; set; }

        /// <summary>
        /// 登録日時
        /// </summary>
        public DateTime RegistDateTime { get; set; }

        /// <summary>
        /// 最終参照日時
        /// </summary>
        public DateTime lastReadDateTime { get; set; }

        /// <summary>
        /// 削除フラグ
        /// </summary>
        public bool DeleteFlag { get; set; }
    }
}
