namespace SwarmPlus.Models
{
    public class Likes
    {
        public int count { get; set; }
        public Groups[] groups { get; set; }
        public string summary { get; set; }
    }

    public class Groups
    {
        public string type { get; set; }
        public int count { get; set; }
        public Items[] items { get; set; }

        public class Items
        {
            /// <summary>
            /// ユーザID
            /// </summary>
            public int id { get; set; }
            /// <summary>
            /// ユーザ名
            /// </summary>
            public  string firstName { get; set; }
            /// <summary>
            /// 性別
            /// </summary>
            public string gender { get; set; }
            /// <summary>
            /// 関係性
            /// </summary>
            public string relationship { get; set; }
            public Icon_Photo photo { get; set; }
        }
    }
}