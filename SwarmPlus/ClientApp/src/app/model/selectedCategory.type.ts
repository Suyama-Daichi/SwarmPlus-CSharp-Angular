export class SelectedCategory {
    constructor() {}
    /** キー名 */
    public key: string[] | string;
    /** 項目名 */
    public name: string;
    /** チェックボックスにチェックが入っているか */
    public selected: boolean;
    /** カテゴリーの検索条件か */
    public isCategory: boolean;
}