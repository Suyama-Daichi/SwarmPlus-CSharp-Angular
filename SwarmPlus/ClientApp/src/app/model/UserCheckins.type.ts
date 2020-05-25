
export interface UsersCheckins {
    checkins: Checkins;
}

interface Checkins {
    count: number;
    items: Item4[];
}

export interface Item4 {
    checkinShortUrl: string;
    id: string;
    createdAt: number;
    type: string;
    entities?: Entity[];
    shout?: string;
    timeZoneOffset: number;
    with?: With[];
    editableUntil: number;
    venue: Venue;
    likes: Likes;
    like: boolean;
    sticker?: Sticker;
    isMayor: boolean;
    photos: Photos;
    posts: Posts;
    score: Score;
    comments: Comments;
    source: Source;
}

interface Score {
    total: number;
    scores: {icon: string, message: string, points: number }[];
}

interface Comments {
    count: number;
}

interface Posts {
    count: number;
    textCount: number;
}

export interface Photos {
    count: number;
    items: Item3[];
    layout?: Layout;
}

interface Layout {
    name: string;
}

interface Item3 {
    id: string;
    createdAt: number;
    source: Source;
    prefix: string;
    suffix: string;
    width: number;
    height: number;
    demoted: boolean;
    user: User;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    relationship: string;
    photo: Photo;
    visibility?: any;
}

interface Source {
    name: string;
    url: string;
}

interface Sticker {
    id: string;
    name: string;
    image: Image;
    stickerType: string;
    group: Group2;
    pickerPosition: PickerPosition;
    teaseText: string;
    unlockText: string;
    bonusText?: string;
    points: number;
    bonusStatus?: string;
}

interface PickerPosition {
    page: number;
    index: number;
}

interface Group2 {
    name: string;
    index: number;
}

interface Image {
    prefix: string;
    sizes: number[];
    name: string;
}

interface Likes {
    count: number;
    groups: Group[];
    summary?: string;
}

interface Group {
    type: string;
    count: number;
    items: Item2[];
}

interface Item2 {
    id: number;
    firstName: string;
    gender: string;
    relationship: string;
    photo: Photo;
}

interface Venue {
    id: string;
    name: string;
    location: Location;
    categories: Category[];
    private: boolean;
}

interface Category {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: Photo;
    primary: boolean;
}

interface Location {
    address?: string;
    crossStreet?: string;
    isFuzzed: boolean;
    lat: number;
    lng: number;
    labeledLatLngs?: LabeledLatLng[];
    postalCode?: string;
    cc: string;
    city?: string;
    country: string;
    formattedAddress?: string[];
}

interface LabeledLatLng {
    label: string;
    lat: number;
    lng: number;
}

interface With {
    id: string;
    firstName: string;
    lastName?: (null | string)[];
    gender: string;
    relationship: string;
    photo: Photo;
    visibility?: any;
}

interface Photo {
    prefix: string;
    suffix: string;
}

interface Entity {
    indices: number[];
    type: string;
    id: string;
}

interface Notification {
    type: string;
    item: Item;
}

interface Item {
    unreadCount: number;
}

interface Meta {
    code: number;
    requestId: string;
}
