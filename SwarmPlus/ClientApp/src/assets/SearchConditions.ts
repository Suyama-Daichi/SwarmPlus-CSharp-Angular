import { SelectedCategory } from '../app/model/selectedCategory.type';

export class SearchConditions {
    constructor() { }
    traficList: SelectedCategory[] = [
        { name: '鉄道駅', key: ['4bf58dd8d48988d129951735', '4f4531504b9074f6e4fb0102', '4bf58dd8d48988d12a951735', '52f2ab2ebcbc57f1066b8b51', '4bf58dd8d48988d1fd931735'], selected: false, isCategory: true },
        { name: 'バス停', key: ['52f2ab2ebcbc57f1066b8b4f'], selected: false, isCategory: true },
        { name: '空港', key: ['4bf58dd8d48988d1ed931735', '4bf58dd8d48988d1f0931735', '4eb1bc533b7b2c5b1d4306cb', '56aa371be4b08b9a8d57352f', '4bf58dd8d48988d1eb931735', '4bf58dd8d48988d1f7931735'], selected: false, isCategory: true },
        { name: '港', key: ['56aa371be4b08b9a8d57353e', '4bf58dd8d48988d12d951735'], selected: false, isCategory: true },
        { name: '道路・交差点・トンネル', key: ['4bf58dd8d48988d1f9931735', '52f2ab2ebcbc57f1066b8b4c', '52f2ab2ebcbc57f1066b8b4a'], selected: false, isCategory: true }
    ];

    restaurantList: SelectedCategory[] = [
        {
            name: '飲食店全般',
            key: ['4bf58dd8d48988d142941735',
                '55a59bace4b013909087cb30',
                '55a59bace4b013909087cb0c',
                '4bf58dd8d48988d1d2941735',
                '4bf58dd8d48988d145941735',
                '4f090e3ee4b0596c8f60a020',
                '55a59bace4b013909087cb24',
                '55a59bace4b013909087cb1b',
                '55a59bace4b013909087cb2a',
                '4bf58dd8d48988d113941735',
                '4bf58dd8d48988d111941735',
                '4bf58dd8d48988d11c941735',
                '4bf58dd8d48988d1c4941735',
                '4bf58dd8d48988d108941735',
                '55a59bace4b013909087cb33',
                '52e81612bcbc57f1066b7a0c',
                '4bf58dd8d48988d16c941735',
                '4bf58dd8d48988d147941735',
                '4bf58dd8d48988d148941735',
                '4bf58dd8d48988d16e941735',
                '4bf58dd8d48988d14e941735',
                '4bf58dd8d48988d169941735',
                '52e81612bcbc57f1066b7a02',
                '52e81612bcbc57f1066b79f1',
                '52e81612bcbc57f1066b79f4',
                '5744ccdfe4b0c0459246b4d0',
                '52e81612bcbc57f1066b7a05',
                '4bf58dd8d48988d10c941735',
                '4bf58dd8d48988d10d941735',
                '4bf58dd8d48988d10e941735',
                '4bf58dd8d48988d110941735',
                '4bf58dd8d48988d1c0941735',
                '4bf58dd8d48988d1c4941735',
                '4bf58dd8d48988d1ce941735',
                '4f04af1f2fb6e1c99f3db0bb',
                '4bf58dd8d48988d116941735',
                '56aa371ce4b08b9a8d57356c',
                '4bf58dd8d48988d120941735',
                '4bf58dd8d48988d121941735',
                '54f4ba06498e2cf5561da814'
            ], selected: false, isCategory: true
        },
        { name: '中華料理店', key: ['4bf58dd8d48988d145941735', '4bf58dd8d48988d108941735'], selected: false, isCategory: true },
        { name: '韓国料理店', key: ['4bf58dd8d48988d113941735'], selected: false, isCategory: true },
        { name: '麺類店', key: ['55a59bace4b013909087cb24', '4bf58dd8d48988d1d1941735'], selected: false, isCategory: true },
        { name: 'うどん屋', key: ['55a59bace4b013909087cb2a'], selected: false, isCategory: true },
        { name: '焼肉', key: ['4bf58dd8d48988d1df931735', '4bf58dd8d48988d1cc941735'], selected: false, isCategory: true },
        { name: '寿司屋', key: ['4bf58dd8d48988d1d2941735'], selected: false, isCategory: true },
        { name: 'カフェ', key: ['54f4ba06498e2cf5561da814', '4bf58dd8d48988d16d941735', '52e81612bcbc57f1066b7a0c', '4bf58dd8d48988d148941735', '4bf58dd8d48988d1c7941735', '4bf58dd8d48988d1dc931735'], selected: false, isCategory: true },
        { name: '和菓子屋', key: ['55a59bace4b013909087cb33'], selected: false, isCategory: true },
        { name: '定食屋', key: ['4bf58dd8d48988d147941735'], selected: false, isCategory: true },
        { name: 'ファーストフード店', key: ['4bf58dd8d48988d16e941735', '4bf58dd8d48988d16c941735', '4bf58dd8d48988d1c7941735'], selected: false, isCategory: true },
        { name: 'フードコート', key: ['4bf58dd8d48988d120951735'], selected: false, isCategory: true },
        { name: '洋レストラン', key: ['4bf58dd8d48988d150941735', '4bf58dd8d48988d14e941735', '4bf58dd8d48988d169941735', '52e81612bcbc57f1066b7a02', '52e81612bcbc57f1066b79f1', '52e81612bcbc57f1066b79f4', '5744ccdfe4b0c0459246b4d0', '52e81612bcbc57f1066b7a05', '4bf58dd8d48988d10c941735', '4bf58dd8d48988d10d941735', '4bf58dd8d48988d10e941735', '4bf58dd8d48988d110941735', '4bf58dd8d48988d1c0941735', '4bf58dd8d48988d1c4941735', '4bf58dd8d48988d1ce941735'], selected: false, isCategory: true },
        { name: 'Bar・居酒屋', key: ['4bf58dd8d48988d11f941735', '4bf58dd8d48988d121941735', '56aa371ce4b08b9a8d57356c', '4bf58dd8d48988d120941735', '4f04af1f2fb6e1c99f3db0bb', '4bf58dd8d48988d116941735', '4bf58dd8d48988d11c941735'], selected: false, isCategory: true }
    ];

    checkinStatusList: SelectedCategory[] = [
        { name: 'メイヤー', key: 'isMayor', selected: false, isCategory: false },
        { name: '写真付き', key: 'photos', selected: false, isCategory: false },
        { name: '誰かといた', key: 'with', selected: false, isCategory: false }
    ];

    shopList: SelectedCategory[] = [
        { name: 'コンビニ', key: ['4d954b0ea243a5684a65b473'], selected: false, isCategory: true },
        { name: '薬局・ドラッグストア', key: ['5745c2e4498e11e7bccabdbd', '4bf58dd8d48988d10f951735'], selected: false, isCategory: true },
        { name: '書店', key: ['52f2ab2ebcbc57f1066b8b30', '52f2ab2ebcbc57f1066b8b18', '4bf58dd8d48988d114951735'], selected: false, isCategory: true },
        { name: 'インテリア', key: ['4bf58dd8d48988d1f8941735', '55888a5a498e782e3303b43a', '4eb1c0253b7b52c0e1adc2e9'], selected: false, isCategory: true },
        { name: '食料品店', key: ['50be8ee891d4fa8dcc7199a7', '4bf58dd8d48988d1f9941735', '5370f356bcbc57f1066c94c2', '4bf58dd8d48988d11d951735', '4bf58dd8d48988d11e951735', '58daa1558bbb0b01f18ec1ca', '4bf58dd8d48988d1fa941735', '4bf58dd8d48988d10e951735', '56aa371be4b08b9a8d573550', '4bf58dd8d48988d1f5941735', '4bf58dd8d48988d118951735', '50aa9e744b90af0d42d5de0e', '4bf58dd8d48988d186941735', '52f2ab2ebcbc57f1066b8b45', '56aa371be4b08b9a8d573564', '52f2ab2ebcbc57f1066b8b46', '53e0feef498e5aac066fd8a9', '4bf58dd8d48988d119951735', '52f2ab2ebcbc57f1066b8b1c'], selected: false, isCategory: true },
        { name: '複合店', key: ['5744ccdfe4b0c0459246b4dc', '4bf58dd8d48988d1fd941735', '5744ccdfe4b0c0459246b4df', '52f2ab2ebcbc57f1066b8b42', '4bf58dd8d48988d1f6941735', '52dea92d3cf9994f4e043dbb'], selected: false, isCategory: true },
        { name: '金融', key: ['503287a291d4c4b30a586d65', '52f2ab2ebcbc57f1066b8b1d', '52f2ab2ebcbc57f1066b8b56', '4bf58dd8d48988d10a951735', '5032850891d4c4b30a586d62', '5744ccdfe4b0c0459246b4be'], selected: false, isCategory: true },
        { name: 'アパレル関連', key: ['52f2ab2ebcbc57f1066b8b17', '4bf58dd8d48988d103951735', '4bf58dd8d48988d102951735', '4bf58dd8d48988d104951735', '4bf58dd8d48988d105951735', '4bf58dd8d48988d109951735', '4bf58dd8d48988d106951735', '4bf58dd8d48988d107951735', '4bf58dd8d48988d108951735'], selected: false, isCategory: true },
        { name: '自動車関連', key: ['4bf58dd8d48988d113951735', '4eb1c1623b7b52c0e1adc2ec', '56aa371be4b08b9a8d5734d3', '4bf58dd8d48988d124951735', '4f04ae1f2fb6e1c99f3db0ba'], selected: false, isCategory: true },
        { name: 'サービス', key: ['4bf58dd8d48988d113951735', '4eb1c1623b7b52c0e1adc2ec', '56aa371be4b08b9a8d5734d3', '4bf58dd8d48988d124951735', '4f04ae1f2fb6e1c99f3db0ba'], selected: false, isCategory: true },
        { name: 'その他ショップ', key: ['52f2ab2ebcbc57f1066b8b3d', '4bf58dd8d48988d1ff941735', '5267e446e4b0ec79466e48c4', '4bf58dd8d48988d116951735', '4bf58dd8d48988d127951735'], selected: false, isCategory: true },
    ];

    landmarkActivity: SelectedCategory[] = [
        { name: '全般', key: ['56aa371be4b08b9a8d573544', '4bf58dd8d48988d1e2941735'], selected: false, isCategory: true },
        { name: '港・湾・海岸・運河', key: ['56aa371be4b08b9a8d573544', '4bf58dd8d48988d1e2941735', '56aa371be4b08b9a8d573562', '4bf58dd8d48988d1e0941735'], selected: false, isCategory: true },
        { name: '湖・池・沼・滝', key: ['56aa371be4b08b9a8d573560', '4bf58dd8d48988d161941735', '56aa371be4b08b9a8d573541'], selected: false, isCategory: true },
        { name: '橋', key: ['4bf58dd8d48988d1df941735'], selected: false, isCategory: true },
        { name: '城', key: ['50aaa49e4b90af0d42d5de11'], selected: false, isCategory: true },
        { name: '記念碑・ランドマーク', key: ['4bf58dd8d48988d12d941735'], selected: false, isCategory: true },
        { name: '県境・市境', key: ['52f2ab2ebcbc57f1066b8b4b'], selected: false, isCategory: true },
        { name: 'サービスエリア・道路', key: ['4d954b16a243a5684b65b473', '4bf58dd8d48988d1f9931735', '52f2ab2ebcbc57f1066b8b4d', '52f2ab2ebcbc57f1066b8b4e'], selected: false, isCategory: true },
        { name: '山岳・森林・野原', key: ['5032848691d4c4b30a586d61', '52e81612bcbc57f1066b7a24', '52e81612bcbc57f1066b7a23', '4bf58dd8d48988d15f941735', '4eb1d4d54b900d56c88a45fc'], selected: false, isCategory: true },
        { name: '庭園', key: ['4bf58dd8d48988d15a941735'], selected: false, isCategory: true },
        { name: '洞窟', key: ['56aa371be4b08b9a8d573511'], selected: false, isCategory: true },
        { name: '公園・広場・遊び場', key: ['4bf58dd8d48988d159941735', '52e81612bcbc57f1066b7a21', '4bf58dd8d48988d163941735', '52e81612bcbc57f1066b7a13', '4bf58dd8d48988d1e7941735', '4bf58dd8d48988d164941735'], selected: false, isCategory: true },
        { name: '植物園', key: ['52e81612bcbc57f1066b7a22'], selected: false, isCategory: true },
        { name: '温泉', key: ['4bf58dd8d48988d160941735'], selected: false, isCategory: true },
        { name: '都道府県・自治体', key: ['530e33ccbcbc57f1066bbfe4', '50aa9e094b90af0d42d5de0d', '5345731ebcbc57f1066c39b2', '530e33ccbcbc57f1066bbff7', '4f2a25ac4b909258e854f55f', '530e33ccbcbc57f1066bbff8', '530e33ccbcbc57f1066bbff3', '530e33ccbcbc57f1066bbff9'], selected: false, isCategory: true },
    ];

    buildings: SelectedCategory[] = [
        { name: 'ビル・建物', key: ['4bf58dd8d48988d130941735', '56aa371be4b08b9a8d573517', '56aa371be4b08b9a8d573517'], selected: false, isCategory: true },
        { name: 'オフィス', key: ['4bf58dd8d48988d124941735', '52e81612bcbc57f1066b7a3d', '4bf58dd8d48988d174941735', '4bf58dd8d48988d125941735'], selected: false, isCategory: true },
        { name: '学校', key: ['5744ccdfe4b0c0459246b4c7', '4bf58dd8d48988d13b941735', '56aa371ce4b08b9a8d573570', '52e81612bcbc57f1066b7a43', '58daa1558bbb0b01f18ec200', '52e81612bcbc57f1066b7a42', '4f4533804b9074f6e4fb0105', '52e81612bcbc57f1066b7a49', '4bf58dd8d48988d13d941735', '52e81612bcbc57f1066b7a48', '4f4533814b9074f6e4fb0106', '4f04b10d2fb6e1c99f3db0be', '4f4533814b9074f6e4fb0107', '52e81612bcbc57f1066b7a45', '52e81612bcbc57f1066b7a46', '52e81612bcbc57f1066b7a47', '52e81612bcbc57f1066b7a44'], selected: false, isCategory: true },
        { name: 'コンベンションセンター', key: ['4bf58dd8d48988d127941735', '4bf58dd8d48988d1ff931735', '4bf58dd8d48988d100941735'], selected: false, isCategory: true },
        { name: '神社・寺など', key: ['4bf58dd8d48988d131941735', '52e81612bcbc57f1066b7a3e', '58daa1558bbb0b01f18ec1eb', '4bf58dd8d48988d132941735', '52e81612bcbc57f1066b7a40', '52e81612bcbc57f1066b7a41', '4eb1d80a4b900d56c88a45ff', '4bf58dd8d48988d13a941735'], selected: false, isCategory: true },
        { name: '図書館', key: ['4bf58dd8d48988d12f941735'], selected: false, isCategory: true },
        { name: '医療施設', key: ['52e81612bcbc57f1066b7a3b', '52e81612bcbc57f1066b7a3c', '52e81612bcbc57f1066b7a3a', '4bf58dd8d48988d178941735', '4bf58dd8d48988d177941735', '4bf58dd8d48988d194941735', '522e32fae4b09b556e370f19', '4bf58dd8d48988d196941735', '58daa1558bbb0b01f18ec1f7', '56aa371be4b08b9a8d5734ff', '4f4531b14b9074f6e4fb0103', '52e81612bcbc57f1066b7a39', '58daa1558bbb0b01f18ec1d0', '5744ccdfe4b0c0459246b4af', '56aa371be4b08b9a8d57351d', '56aa371be4b08b9a8d573526', '4d954af4a243a5684765b473'], selected: false, isCategory: true },
        { name: 'イベントスペース', key: ['4bf58dd8d48988d171941735', '56aa371be4b08b9a8d57356a', '4eb1daf44b900d56c88a4600'], selected: false, isCategory: true },
        { name: '展望台', key: ['4bf58dd8d48988d165941735'], selected: false, isCategory: true },
        { name: '自宅(個人)', key: ['4bf58dd8d48988d103941735'], selected: false, isCategory: true },

    ];


}
