using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Service
{
    public static class Util
    {
        public static string GetTokenFromBearer(string target)
        {
            return target.Substring(7);
        }
    }
}
