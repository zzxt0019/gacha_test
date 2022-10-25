export interface BaseWish {
    current: number
    total: number
    state: string
    wish(): boolean
}