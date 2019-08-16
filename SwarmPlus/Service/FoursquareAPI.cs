using Newtonsoft.Json;
using SwarmPlus.Data;
using SwarmPlus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SwarmPlus.Service
{
    public class FoursquareAPIService
    {
        /// <summary>
        /// httpクライアント
        /// </summary>
        private HttpClient Client { get; }
        /// <summary>
        /// DBのインスタンス
        /// </summary>
        private readonly SwarmPlusContext _db;

        public FoursquareAPIService(HttpClient client, SwarmPlusContext db)
        {
            client.BaseAddress = new Uri("https://api.foursquare.com/v2/");
            client.DefaultRequestHeaders.Add("Acccept", "application/json");
            Client = client;

            _db = db;
        }

        /// <summary>
        /// ユーザーのチェックインを取得する
        /// </summary>
        /// <param name="uuid">UUID</param>
        /// <param name="afterTimestamp">取得する期間(終わり)</param>
        /// <param name="beforeTimestamp">取得する期間(始まり)</param>
        /// <returns></returns>
        public async Task<UsersCheckins> GetUsersCheckinsAsync(string uuid ,int afterTimestamp, int beforeTimestamp)
        {
            string accesstoken = _db.User.FirstOrDefault(f => f.UserID == uuid).AccessToken;
            var response = await Client.GetAsync(
                $"users/self/checkins?oauth_token={accesstoken}&v=20180815&limit=250&afterTimestamp={afterTimestamp}&beforeTimestamp={beforeTimestamp}");
            var result = await response.Content.ReadAsStringAsync();
            var deserialisedResult = JsonConvert.DeserializeObject<UsersCheckins>(result);
            return deserialisedResult;
        }
    }
}
