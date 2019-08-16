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
        /// <summary>
        /// 環境変数
        /// </summary>
        private readonly Foursquare _foursquare = null;
        private readonly FoursquareAPIService _foursquareAPIService;
        public FoursquareAPIController(IOptions<Foursquare> setting, FoursquareAPIService foursquareAPIService)
        {
            this._foursquare = setting.Value;
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
            var result = await _foursquareAPIService.GetUsersCheckinsAsync(uuid, afterTimestamp, beforeTimestamp);
            return Ok(result);
        }
    }
}