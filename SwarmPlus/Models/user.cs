using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Models
{
    public class User
    {
        /// <summary>
        /// uuid
        /// </summary>
        public string UserID { get; set; }

        /// <summary>
        /// アクセストークン
        /// </summary>
        public string AccessToken { get; set; }
    }
}
