import { SelectedCategory } from "../app/model/selectedCategory.type";

export class SearchConditions {
    constructor() { }
    traficList: SelectedCategory[] = [
        { key: ['4bf58dd8d48988d129951735'], name: '鉄道駅', selected: false, isCategory: true },
        { key: ['52f2ab2ebcbc57f1066b8b4f'], name: 'バス停', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d1ed931735'], name: '空港', selected: false, isCategory: true },
        { key: ['56aa371be4b08b9a8d57353e', '4bf58dd8d48988d12d951735'], name: '港', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d1f9931735', '52f2ab2ebcbc57f1066b8b4c'], name: '道路・交差点・トンネル', selected: false, isCategory: true }
    ];

    restaurantList: SelectedCategory[] = [
        {
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
                '4bf58dd8d48988d108941735'
            ], name: '飲食店全般', selected: false, isCategory: true
        },
        { key: ['4bf58dd8d48988d145941735', '4bf58dd8d48988d108941735'], name: '中華料理店', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d113941735'], name: '韓国料理店', selected: false, isCategory: true },
        { key: ['55a59bace4b013909087cb24', '4bf58dd8d48988d1d1941735'], name: '麺類店', selected: false, isCategory: true },
        { key: ['55a59bace4b013909087cb2a'], name: 'うどん屋', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d1df931735'], name: '焼肉', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d1d2941735'], name: '寿司屋', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d16d941735'], name: 'カフェ', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d147941735'], name: '定食屋', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d16e941735'], name: 'ファーストフード店', selected: false, isCategory: true },
        { key: ['4bf58dd8d48988d116941735','4bf58dd8d48988d11c941735'], name: 'Bar・居酒屋', selected: false, isCategory: true }
    ]

    checkinStatusList: SelectedCategory[] = [
        { key: 'isMayor', name: 'メイヤー', selected: false, isCategory: false },
        { key: 'photos', name: '写真付き', selected: false, isCategory: false },
        { key: 'with', name: '誰かといた', selected: false, isCategory: false }
    ];

    shopList: SelectedCategory[] = [
        { key: ['4d954b0ea243a5684a65b473'], name: 'コンビニ', selected: false, isCategory: true },
        { key: ['5745c2e4498e11e7bccabdbd'], name: 'ドラッグストア', selected: false, isCategory: true }
    ]
}