namespace SwarmPlus.Models
{
    public class Photos
    {
        /// <summary>
        /// 枚数
        /// </summary>
        public int count { get; set; }
        public Items[] items { get; set; }
        public Layout layout { get; set; }

        public class Items
        {
            public string id { get; set; }
            /// <summary>
            /// アップロード日時
            /// </summary>
            public int createdAt { get; set; }
            /// <summary>
            /// アップロード元
            /// </summary>
            public Source source { get; set; }
            public string prefix { get; set; }
            public string suffix { get; set; }
            public int width { get; set; }
            public int height { get; set; }
            public bool demoted { get; set; }
            public UserInfo user { get; set; }
        }
    }

    public class Layout
    {
        public string name { get; set; }
    }

    public class Source
    {
        public string name { get; set; }
        public string url { get; set; }
    }
}