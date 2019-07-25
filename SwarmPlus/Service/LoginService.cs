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
        /// httpクライアント
        /// </summary>
        //static readonly HttpClient _httpClient = new HttpClient();

        public string Auth(string clientId, string clientSecret)
        {
            return clientId + clientSecret;
        }
    }
}
