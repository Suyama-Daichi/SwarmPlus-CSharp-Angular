namespace SwarmPlus.Models
{
    public class Categories
    {
        /// <summary>
        /// カテゴリID
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// カテゴリ名
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// カテゴリ名(複数形)
        /// </summary>
        public string pluralName { get; set; }
        /// <summary>
        /// カテゴリ名(単数形)
        /// </summary>
        public string shortName { get; set; }
        /// <summary>
        /// カテゴリアイコン情報
        /// </summary>
        public Icon_Photo icon { get; set; }
        /// <summary>
        /// 主カテゴリかどうか
        /// </summary>
        public bool primary { get; set; }
    }
}