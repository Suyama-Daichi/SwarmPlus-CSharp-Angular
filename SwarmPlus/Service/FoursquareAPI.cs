using Microsoft.Extensions.Options;
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
        /// <summary>
        /// 環境変数
        /// </summary>
        private readonly Foursquare _foursquare = null;


        public FoursquareAPIService(HttpClient client, SwarmPlusContext db, IOptions<Foursquare> setting)
        {
            client.BaseAddress = new Uri("https://api.foursquare.com/v2/");
            client.DefaultRequestHeaders.Add("Acccept", "application/json");
            client.DefaultRequestHeaders.Add("Accept-Language", "ja");
            Client = client;

            _db = db;

            this._foursquare = setting.Value;
        }

        /// <summary>
        /// ユーザーのチェックインを取得する
        /// </summary>
        /// <param name="uuid">UUID</param>
        /// <param name="afterTimestamp">取得する期間(始まり)</param>
        /// <param name="beforeTimestamp">取得する期間(終わり)</param>
        /// <returns></returns>
        public async Task<ResponseFromFoursquare> GetUsersCheckinsAsync(string uuid, int afterTimestamp, int beforeTimestamp)
        {
            string encryptAccessToken = _db.User.FirstOrDefault(f => f.UserID == uuid).AccessToken;
            string decryptAccessToken = Security.DecryptString(encryptAccessToken, uuid);
            var response = await Client.GetAsync(
                $"users/self/checkins?oauth_token={decryptAccessToken}&v=20180815&limit=250&afterTimestamp={afterTimestamp}&beforeTimestamp={beforeTimestamp}");
            var result = await response.Content.ReadAsStringAsync();
            var deserialisedResult = JsonConvert.DeserializeObject<ResponseFromFoursquare>(result);

            return new ResponseFromFoursquare
            {
                meta = deserialisedResult.meta,
                notifications = deserialisedResult.notifications,
                response = new Response
                {
                    checkins = new Items
                    {
                        count = deserialisedResult.response.checkins.count,
                        items = deserialisedResult.response.checkins.items.Length == 250 ? await getCheckinForOver250PerMonth(decryptAccessToken, afterTimestamp, deserialisedResult) : deserialisedResult.response.checkins.items.OrderBy(o => o.createdAt).ToArray()
                    }
                }
            };

        }
        /// <summary>
        /// 250チェックイン/月する場合の処理
        /// </summary>
        /// <param name="decryptAccessToken">アクセストークン</param>
        /// <param name="afterTimestamp">取得する期間(始まり)</param>
        /// <param name="deserialisedResult">途中までのチェックイン情報</param>
        /// <returns>結合されたチェックイン情報</returns>
        private async Task<CheckinInfo[]> getCheckinForOver250PerMonth(string decryptAccessToken, int afterTimestamp, ResponseFromFoursquare deserialisedResult)
        {
            HttpResponseMessage moreResponse = await Client.GetAsync(
            $"users/self/checkins?oauth_token={decryptAccessToken}&v=20180815&limit=250&afterTimestamp={afterTimestamp}&beforeTimestamp={deserialisedResult.response.checkins.items.Last().createdAt}");
            string moreResult = await moreResponse.Content.ReadAsStringAsync();
            ResponseFromFoursquare moreDeserialisedResult = JsonConvert.DeserializeObject<ResponseFromFoursquare>(moreResult);
            return deserialisedResult.response.checkins.items.Concat(moreDeserialisedResult.response.checkins.items).OrderBy(o => o.createdAt).ToArray();
        }

        /// <summary>
        /// べニューの写真を返す
        /// </summary>
        /// <param name="venueId">べニューID</param>
        /// <returns></returns>
        public async Task<Photos> getVenuePhotos(string venueId)
        {
            var response = await Client.GetAsync(
                $"https://api.foursquare.com/v2/venues/{venueId}/photos?client_id={_foursquare.ClientId}&client_secret={_foursquare.ClientSecret}&v=20180815");
            var result = await response.Content.ReadAsStringAsync();
            var deserialisedResult = JsonConvert.DeserializeObject<ResponseFromFoursquare>(result);
            return new Photos
            {
                count = deserialisedResult.response.photos.count,
                items = deserialisedResult.response.photos.items,
                layout = deserialisedResult.response.photos.layout
            };
        }
    }
}
