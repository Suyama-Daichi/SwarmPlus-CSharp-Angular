namespace SwarmPlus.Models
{
    public class Location
    {
        /// <summary>
        /// 住所
        /// </summary>
        public string address { get; set; }
        /// <summary>
        /// 親施設
        /// </summary>
        public string crossStreet { get; set; }
        public bool isFuzzed { get; set; }
        /// <summary>
        /// 緯度
        /// </summary>
        public double lat { get; set; }
        /// <summary>
        /// 経度
        /// </summary>
        public double lng { get; set; }
        public LabeledLatLngs[] labeledLatLngs { get; set; }
        /// <summary>
        /// 郵便番号
        /// </summary>
        public string postalCode { get; set; }
        /// <summary>
        /// 国コード
        /// </summary>
        public string cc { get; set; }
        /// <summary>
        /// 市区町村
        /// </summary>
        public string city { get; set; }
        /// <summary>
        /// 国
        /// </summary>
        public string country { get; set; }
        /// <summary>
        /// フォーマットされた住所
        /// </summary>
        public string[] formattedAddress { get; set; }
    }

    public class LabeledLatLngs
    {
        /// <summary>
        /// ラベル
        /// </summary>
        public string label { get; set; }
        /// <summary>
        /// 緯度
        /// </summary>
        public double lat { get; set; }
        /// <summary>
        /// 経度
        /// </summary>
        public double lng { get; set; }
    }
}