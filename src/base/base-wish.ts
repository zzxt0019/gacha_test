export interface BaseWish {
    current: number
    total: number
    wish(): boolean
}