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

        /// <summary>
        /// アクセストークンを取得
        /// </summary>
        /// <param name="code">認証コード</param>
        /// <returns></returns>
        /// 


        [HttpPost]
        [Route("saveaccesstoken")]
        public async Task<ActionResult> SaveAccessToken(Code code)
        {
            var result = await _loginService.GetAccessToken(code.code, _foursquare.ClientId, _foursquare.ClientSecret);
            return Ok(result);
        }
    }
}
