export interface UserInfo {
    statusCode: number;
    user: User2;
}

interface User2 {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    relationship: string;
    canonicalUrl: string;
    photo: Photo;
    friends: Friends;
    birthday: number;
    tips: Friends;
    homeCity: string;
    bio: string;
    contact: Contact;
    superuser: number;
    photos: Friends;
    type: string;
    checkins: Checkins;
    requests: Friends;
    lists: Lists;
    blockedStatus: string;
    createdAt: number;
    referralId: string;
}

interface Lists {
    count: number;
    groups: Group[];
}

interface Group {
    type: string;
    count: number;
    items: (Item2 | Items2)[];
}

interface Items2 {
    id: string;
    name: string;
    description: string;
    editable: boolean;
    public: boolean;
    collaborative: boolean;
    url: string;
    canonicalUrl: string;
    createdAt: number;
    updatedAt: number;
    photo?: Photo2;
    followers: Friends;
    listItems: Friends;
}

interface Photo2 {
    id: string;
    createdAt: number;
    prefix: string;
    suffix: string;
    width: number;
    height: number;
    demoted: boolean;
    user: User;
    visibility: string;
}

interface User {
    id: string;
    firstName: string;
    gender: string;
    photo: Photo;
    lastName?: string;
    relationship?: string;
}

interface Item2 {
    id: string;
    name: string;
    description: string;
    type: string;
    editable: boolean;
    public: boolean;
    collaborative: boolean;
    url: string;
    canonicalUrl: string;
    listItems: Friends;
}

interface Checkins {
    count: number;
    items: Item[];
}

interface Item {
    id: string;
    createdAt: number;
    type: string;
    entities: any[];
    shout: string;
    timeZoneOffset: number;
    editableUntil: number;
    venue: Venue;
    likes: Likes;
    like: boolean;
    isMayor: boolean;
    photos: Photos;
    posts: Posts;
    comments: Friends;
    source: Source;
}

interface Source {
    name: string;
    url: string;
}

interface Posts {
    count: number;
    textCount: number;
}

interface Photos {
    count: number;
    items: any[];
}

interface Likes {
    count: number;
    groups: any[];
}

interface Venue {
    id: string;
    name: string;
    location: Location;
    categories: Category[];
    like: boolean;
    locked: boolean;
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
    lat: number;
    lng: number;
    labeledLatLngs: LabeledLatLng[];
    cc: string;
    country: string;
}

interface LabeledLatLng {
    label: string;
    lat: number;
    lng: number;
}

interface Contact {
    verifiedPhone: string;
    email: string;
    twitter: string;
    facebook: string;
}

interface Friends {
    count: number;
}

export interface Photo {
    prefix: string;
    suffix: string;
}
