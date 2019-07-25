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
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// ログインサービス
        /// </summary>
        private readonly LoginService _loginService = new LoginService();

        /// <summary>
        /// 環境変数
        /// </summary>
        private readonly Foursquare _foursquare = null;

        /// <summary>
        /// コンストラクタ
        /// </summary>
        /// <param name="setting"></param>
        public LoginController(IOptions<Foursquare> setting)
        {
            this._foursquare = setting.Value;
        }

        // GET: api/Login
        [HttpGet]
        [Route("auth")]
        public IEnumerable<string> Auth()
        {
            return new string[] { _loginService.Auth(_foursquare.ClientId, _foursquare.ClientSecret), "value2" };
        }

        // GET: api/Login/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Login
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
    }
}
