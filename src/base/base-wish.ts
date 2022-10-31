export interface BaseWish {
    current: number[]
    state: [...any][]
    total: number

    wish(): [number, string]
}