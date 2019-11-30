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

            _foursquare = setting.Value;
        }

        /// <summary>
        /// ユーザーのチェックインを取得する
        /// </summary>
        /// <param name="accessToken">アクセストークン</param>
        /// <param name="afterTimestamp">取得する期間(始まり)</param>
        /// <param name="beforeTimestamp">取得する期間(終わり)</param>
        /// <returns></returns>
        public async Task<ResponseFromFoursquare> GetUsersCheckinsAsync(string accessToken, int afterTimestamp, int beforeTimestamp)
        {
            var response = await Client.GetAsync(
                $"users/self/checkins?oauth_token={accessToken}&v=20180815&limit=250&afterTimestamp={afterTimestamp}&beforeTimestamp={beforeTimestamp}");
            var result = await response.Content.ReadAsStringAsync();
            var deserialisedResult = JsonConvert.DeserializeObject<ResponseFromFoursquare>(result);

            // 1リクエスト250チェックイン制限の対応
            if (deserialisedResult.response.checkins.items.Length == 250)
            {
                CheckinInfo[] additionalCheckins = await getCheckinForOver250PerMonth(accessToken, afterTimestamp, deserialisedResult.response.checkins.items.Last().createdAt);
                deserialisedResult.response.checkins.items = deserialisedResult.response.checkins.items.Concat(additionalCheckins).ToArray();
                while (additionalCheckins.Length == 250)
                {
                    additionalCheckins = await getCheckinForOver250PerMonth(accessToken, afterTimestamp, deserialisedResult.response.checkins.items.Last().createdAt);
                    deserialisedResult.response.checkins.items = deserialisedResult.response.checkins.items.Concat(additionalCheckins).ToArray();
                }
            }

            return new ResponseFromFoursquare
            {
                meta = deserialisedResult.meta,
                notifications = deserialisedResult.notifications,
                response = new Response
                {
                    checkins = new Items
                    {
                        count = deserialisedResult.response.checkins.count,
                        items = deserialisedResult.response.checkins.items
                    }
                }
            };
        }
        /// <summary>
        /// 250チェックイン/月する場合の処理
        /// </summary>
        /// <param name="accessToken">アクセストークン</param>
        /// <param name="afterTimestamp">取得する期間(始まり)</param>
        /// <param name="beforeTimestamp">取得する期間(終わり)</param>
        /// <param name="deserialisedResult">途中までのチェックイン情報</param>
        /// <returns>結合されたチェックイン情報</returns>
        private async Task<CheckinInfo[]> getCheckinForOver250PerMonth(string accessToken, int afterTimestamp, int beforeTimestamp)
        {
            HttpResponseMessage moreResponse = await Client.GetAsync(
            $"users/self/checkins?oauth_token={accessToken}&v=20180815&limit=250&afterTimestamp={afterTimestamp}&beforeTimestamp={beforeTimestamp}");
            string moreResult = await moreResponse.Content.ReadAsStringAsync();
            ResponseFromFoursquare moreDeserialisedResult = JsonConvert.DeserializeObject<ResponseFromFoursquare>(moreResult);
            return moreDeserialisedResult.response.checkins.items;
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

        /// <summary>
        /// チェックインの詳細を取得する
        /// </summary>
        /// <param name="checkinId">チェックインID</param>
        /// <returns>チェックインデータ</returns>
        public async Task<CheckinInfo> getCheckinDetail(string accessToken, string checkinId)
        {
            var response = await Client.GetAsync(
                $"https://api.foursquare.com/v2/checkins/{checkinId}?oauth_token={accessToken}&v=20180815");
            var result = await response.Content.ReadAsStringAsync();
            var deserialisedResult = JsonConvert.DeserializeObject<ResponseFromFoursquare>(result);
            return new CheckinInfo
            {
                id = deserialisedResult.response.checkin.id,
                createdAt = deserialisedResult.response.checkin.createdAt,
                type = deserialisedResult.response.checkin.type,
                entities = deserialisedResult.response.checkin.entities,
                shout = deserialisedResult.response.checkin.shout,
                timeZoneOffset = deserialisedResult.response.checkin.timeZoneOffset,
                with = deserialisedResult.response.checkin.with,
                user = deserialisedResult.response.checkin.user,
                venue = deserialisedResult.response.checkin.venue,
                source = deserialisedResult.response.checkin.source,
                photos = deserialisedResult.response.checkin.photos,
                posts = deserialisedResult.response.checkin.posts,
                checkinShortUrl = deserialisedResult.response.checkin.checkinShortUrl,
                likes = deserialisedResult.response.checkin.likes,
                like = deserialisedResult.response.checkin.like,
                comments = deserialisedResult.response.checkin.comments,
                sticker = deserialisedResult.response.checkin.sticker,
                isMayor = deserialisedResult.response.checkin.isMayor,
                score = deserialisedResult.response.checkin.score
            };
        }
    }
}
