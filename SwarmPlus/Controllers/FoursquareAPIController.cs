using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SwarmPlus.Models;
using SwarmPlus.Service;

namespace SwarmPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoursquareAPIController : ControllerBase
    {
        private readonly FoursquareAPIService _foursquareAPIService;
        public FoursquareAPIController(FoursquareAPIService foursquareAPIService)
        {
            _foursquareAPIService = foursquareAPIService;
        }

        /// <summary>
        /// ユーザーのチェックイン履歴を返す
        /// </summary>
        /// <param name="uuid">UUID</param>
        /// <param name="afterTimestamp">取得する期間(終わり)</param>
        /// <param name="beforeTimestamp">取得する期間(始まり)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getCheckinsPerMonth")]
        public async Task<ActionResult> getCheckinsPerMonth(string uuid, int afterTimestamp, int beforeTimestamp)
        {
            return Ok(await _foursquareAPIService.GetUsersCheckinsAsync(uuid, afterTimestamp, beforeTimestamp));
        }

        /// <summary>
        /// べニューの写真を返す
        /// </summary>
        /// <param name="venueId">べニューID</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getVenuePhotos")]
        public async Task<ActionResult> getVenuePhotos(string venueId)
        {
            return Ok(await _foursquareAPIService.getVenuePhotos(venueId));
        }

        /// <summary>
        /// チェックインの詳細を取得
        /// </summary>
        /// <param name="uuid">uuid</param>
        /// <param name="checkinId">チェックインID</param>
        /// <returns>チェックイン詳細データ</returns>
        [HttpGet]
        [Route("getCheckinDetail")]
        public async Task<ActionResult> getCheckinDetail(string uuid, string checkinId)
        {
            return Ok(await _foursquareAPIService.getCheckinDetail(uuid, checkinId));
        }
    }
}