export interface BaseWish {
    current: number[]
    state: string[]
    total: number

    wish(): [number, string]
}