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
using SwarmPlus.Data;
using Microsoft.EntityFrameworkCore;

namespace SwarmPlus.Service
{
    public class LoginService
    {
        private HttpClient Client { get; }

        private readonly SwarmPlusContext _db;
        public LoginService(HttpClient client, SwarmPlusContext db)
        {
            client.BaseAddress = new Uri("https://foursquare.com/");
            client.DefaultRequestHeaders.Add("Acccept", "application/json");
            Client = client;

            _db = db;
        }

        /// <summary>
        /// 認可サービス
        /// </summary>
        /// <param name="code">認可コード</param>
        /// <returns></returns>
        /// 
        public async Task<string> GetAccessToken(string code, string clientId, string clientSecret, string uuid)
        {
            // GETリクエストを実行
            var response = await Client.GetAsync(
                $"oauth2/access_token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&redirect_uri=http://localhost:50391/&code={code}");
            response.EnsureSuccessStatusCode();

            // レスポンスのBodyを取得
            var result = await response.Content
                .ReadAsStringAsync();

            var deserialisedResult = JsonConvert.DeserializeObject<AccessToken>(result);

            // DBに取得したアクセストークンを暗号化し、UUIDと一緒に保存
            _db.Add(new User { UserID = uuid, AccessToken = Security.EncryptString(deserialisedResult.access_token, uuid), RegistDateTime = DateTime.Now, DeleteFlag = false });
            _db.SaveChanges();

            return result;
        }

        /// <summary>
        /// アクセストークンを取得しているか確認
        /// </summary>
        /// <param name="uuid">ユーザー固有ID</param>
        /// <returns></returns>
        public async Task<bool> hasAccessToken(string uuid)
        {
            var result = await _db.User.AnyAsync(x => x.UserID == uuid);
            return result;
        }
    }
}
