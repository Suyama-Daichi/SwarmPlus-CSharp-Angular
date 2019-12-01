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

        ///// <summary>
        ///// 認可サービス
        ///// </summary>
        ///// <param name="code">認可コード</param>
        ///// <returns></returns>
        ///// 
        //public async Task<string> GetAccessToken(string code, string clientId, string clientSecret, string redirectUri, string uuid)
        //{
        //    // GETリクエストを実行
        //    var response = await Client.GetAsync(
        //        $"oauth2/access_token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&redirect_uri={redirectUri}&code={code}");
        //    response.EnsureSuccessStatusCode();

        //    // レスポンスのBodyを取得
        //    var result = await response.Content
        //        .ReadAsStringAsync();

        //    var deserialisedResult = JsonConvert.DeserializeObject<AccessToken>(result);

        //    var hoge = _db.User.ToArray();

        //    // DBに取得したアクセストークンを暗号化し、UUIDと一緒に保存
        //    _db.Add(new User { UserID = uuid, AccessToken = Security.EncryptString(deserialisedResult.access_token, uuid), RegistDateTime = DateTime.Now, lastReadDateTime = DateTime.Now, DeleteFlag = false });
        //    await _db.SaveChangesAsync();

        //    return result;
        //}

        ///// <summary>
        ///// アクセストークンを取得しているか確認
        ///// </summary>
        ///// <param name="uuid">ユーザー固有ID</param>
        ///// <returns></returns>
        //public async Task<bool> hasAccessToken(string uuid)
        //{
        //    var result = await _db.User.AnyAsync(x => x.UserID == uuid);
        //    return result;
        //}

        ///// <summary>
        ///// 使用されていないレコードを削除
        ///// </summary>
        ///// <param name="uuid"></param>
        ///// <returns></returns>
        //public User[] deleteUnusedRecord(string uuid)
        //{
        //    var key = Security.DecryptString(_db.User.FirstOrDefault(f => f.UserID == uuid)?.AccessToken, uuid) ?? string.Empty;
        //    var result = _db.User
        //        .ToArray()
        //        .Where(x =>
        //            Security.DecryptString(x.AccessToken, x.UserID) == key
        //            && x.UserID != uuid // 有効なレコードは消さないため
        //        )
        //        .ToArray();
        //    if (result.Count() > 0)
        //    {
        //        foreach (var deleteItem in result)
        //        {
        //            _db.User.Remove(deleteItem);
        //        }
        //        _db.SaveChangesAsync();
        //    }
        //    return result;
        //}
    }
}
