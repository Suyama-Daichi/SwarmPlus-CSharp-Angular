using Microsoft.Extensions.Options;
using System;
using SwarmPlus.Models;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json;

namespace SwarmPlus.Service
{
    public class LoginService
    {
        private HttpClient Client { get; }

        public LoginService(HttpClient client)
        {
            client.BaseAddress = new Uri("https://foursquare.com/");
            client.DefaultRequestHeaders.Add("Acccept", "application/json");
            Client = client;
        }

        /// <summary>
        /// 認証サービス
        /// </summary>
        /// <param name="code">認証コード</param>
        /// <returns></returns>
        /// 
        public async Task<string> GetAccessToken(string code, string clientId, string clientSecret)
        {
            // GETリクエストを実行
            var response = await Client.GetAsync(
                $"oauth2/access_token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&redirect_uri=http://localhost:49947/&code={code}");
            response.EnsureSuccessStatusCode();

            // レスポンスのBodyを取得
            var result = await response.Content
                .ReadAsStringAsync();

            return result;
        }
    }
}
