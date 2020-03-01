import { Item4 } from "./UserCheckins.type";

export class CalendarEvent {
    constructor() {}
    /** イベントID */
    public id: number;
    /** イベントのタイトル */
    public title: string;
    /** イベントの日付 */
    public date: Date;
    /** チェックインデータ */
    public checkinData: Item4;
}