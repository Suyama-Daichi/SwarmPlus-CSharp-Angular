export class Threshold {
    /** スマホの画面幅定義 */
    public static readonly SMARTPHONE_WIDTH = 600;
    public static readonly TABLET_WIDTH = 992;

    public static readonly DATE_REG_EXPRESSION: RegExp = /(19[0-9]{2}|20[0-9]{2})\/([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|[12][0-9]|3[01])$/;
    public static readonly MONTH_REG_EXPRESSION: RegExp = /(19[0-9]{2}|20[0-9]{2})\/([1-9]|0[1-9]|1[0-2])$/;
}
