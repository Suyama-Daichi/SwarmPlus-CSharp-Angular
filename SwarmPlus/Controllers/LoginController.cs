using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SwarmPlus.Models;
using SwarmPlus.Service;

namespace SwarmPlus.Controllers
{
    /// <summary>
    /// ログインコントローラ
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// 環境変数
        /// </summary>
        private readonly Foursquare _foursquare = null;

        private readonly LoginService _loginService;

        /// <summary>
        /// コンストラクタ
        /// </summary>
        /// <param name="setting"></param>
        public LoginController(IOptions<Foursquare> setting, LoginService loginService)
        {
            this._foursquare = setting.Value;
            this._loginService = loginService;
        }

        ///// <summary>
        ///// アクセストークンを取得してDBに保存する
        ///// </summary>
        ///// <param name="authInfo">認可コードとUUID</param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("saveaccesstoken")]
        //public async Task<ActionResult> SaveAccessToken(AuthInfo authInfo)
        //{
        //    var result = await _loginService.GetAccessToken(authInfo.Code, _foursquare.ClientId, _foursquare.ClientSecret, _foursquare.RedirectUri , authInfo.Uuid);
        //    return Ok(result);
        //}

        ///// <summary>
        ///// アクセストークンを取得しているか確認
        ///// </summary>
        ///// <param name="uuid">ユーザーID(UUID)</param>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("hasaccesstoken")]
        //public async Task<ActionResult> hasAccessToken(string uuid)
        //{
        //    var result = await _loginService.hasAccessToken(uuid);
        //    _loginService.deleteUnusedRecord(uuid); // 不要なレコードを削除
        //    if (result)
        //    {
        //        return Ok(true);
        //    }
        //    return Ok(false);
        //}
    }
}
