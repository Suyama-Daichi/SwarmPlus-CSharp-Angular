using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Models
{
    public class ResponseFromFoursquare
    {
        public Meta meta { get; set; }
        public Notifications[] notifications { get; set; }
        public Response response { get; set; }
    }

    public class Response
    {
        /// <summary>
        /// チェックインリスト
        /// </summary>
        public Items checkins { get; set; }
        /// <summary>
        /// チェックインの詳細
        /// </summary>
        public CheckinInfo checkin { get; set; }
        public Photos photos { get; set; }
    }

    public class Items
    {
        /// <summary>
        /// チェックイン数
        /// </summary>
        public int count { get; set; }
        /// <summary>
        /// チェックインデータ本体
        /// </summary>
        public CheckinInfo[] items { get; set; }
    }

    public class CheckinInfo
    {
        /// <summary>
        /// チェックインID
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// チェックイン時刻
        /// </summary>
        public int createdAt { get; set; }
        /// <summary>
        /// データの型
        /// </summary>
        public string type { get; set; }
        public Entities[] entities { get; set; }
        /// <summary>
        /// シャウト
        /// </summary>
        public string shout { get; set; }
        /// <summary>
        /// タイムゾーンオフセット
        /// </summary>
        public int timeZoneOffset { get; set; }
        public UserInfo[] with { get; set; }
        /// <summary>
        /// チェックインの編集可能期限
        /// </summary>
        public long editableUntil { get; set; }
        /// <summary>
        /// べニュー情報
        /// </summary>
        public Venue venue { get; set; }
        /// <summary>
        /// いいねした人の情報
        /// </summary>
        public Likes likes { get; set; }
        public bool like { get; set; }
        /// <summary>
        /// ステッカー情報
        /// </summary>
        public Sticker sticker { get; set; }
        /// <summary>
        /// メイヤーかどうか
        /// </summary>
        public bool isMayor { get; set; }
        /// <summary>
        /// 写真
        /// </summary>
        public Photos photos { get; set; }
        public Posts posts { get; set; }
        public Comments comments { get; set; }
        /// <summary>
        /// チェックイン元
        /// </summary>
        public Source source { get; set; }
        /// <summary>
        /// チェックインしたユーザー情報
        /// </summary>
        public UserInfo user { get; set; }
        /// <summary>
        /// 編集できるか(?)
        /// </summary>
        public bool locked { get; set; }
        /// <summary>
        /// Swarm公式のチェックイン詳細ページURL
        /// </summary>
        public string checkinShortUrl { get; set; }
        public Score score { get; set; }
    }

    public class Score
    {
        /// <summary>
        /// 獲得コイン数
        /// </summary>
        public int total { get; set; }
        public Scores[] scores { get; set; }

        public class Scores
        {
            public string icon { get; set; }
            public string message { get; set; }
            public int points { get; set; }
        }
    }

    public class Comments
    {
        /// <summary>
        /// コメント数
        /// </summary>
        public int count { get; set; }
        public CommentsItems[] items { get; set; }
    }

    public class Posts
    {
        public int count { get; set; }
        public int textCount { get; set; }
    }

    public class Entities
    {
        public int[] indices { get; set; }
        public string type { get; set; }
        public string id { get; set; }
    }

    public class Sticker
    {
        /// <summary>
        /// ステッカーID
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// ステッカー名
        /// </summary>
        public string name { get; set; }
        public Image image { get; set; }
        /// <summary>
        /// ステッカーのタイプ
        /// </summary>
        public string stickerType { get; set; }
        public Group group { get; set; }
        public PickerPosition pickerPosition { get; set; }
        public string teaseText { get; set; }
        public string unlockText { get; set; }
        public string bonusText { get; set; }
        public int points { get; set; }
        public string bonusStatus { get; set; }

        public class Group
        {
            public string name { get; set; }
            public int index { get; set; }
        }

        public class PickerPosition
        {
            public int page { get; set; }
            public int index { get; set; }

        }
    }

    public class Image
    {
        public string prefix { get; set; }
        public int[] sizes { get; set; }
        public string name { get; set; }
    }

    public class Notifications
    {
        /// <summary>
        /// レスポンスのタイプ
        /// </summary>
        public string type { get; set; }
        public Item item { get; set; }
    }

    public class Item
    {
        /// <summary>
        /// 未読数
        /// </summary>
        public int unreadCount { get; set; }
    }

    public class Meta
    {
        /// <summary>
        /// レスポンスコード
        /// </summary>
        public int code { get; set; }
        /// <summary>
        /// リクエストID
        /// </summary>
        public string requestId { get; set; }
    }

    public class CommentsItems
    {
        public string id { get; set; }
        public int createdAt { get; set; }
        public UserInfo user { get; set; }
        /// <summary>
        /// コメント本文
        /// </summary>
        public string text { get; set; }
    }
}
