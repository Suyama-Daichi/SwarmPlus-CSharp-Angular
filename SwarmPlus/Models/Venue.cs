namespace SwarmPlus.Models
{
    public class Venue
    {
        /// <summary>
        /// べニューID
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// べニュー名
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 位置情報
        /// </summary>
        public Location location { get; set; }
        public Categories[] categories { get; set; }
        public bool @private { get; set; }
    }
}