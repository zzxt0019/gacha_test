export interface BaseWish {
    current: number[]
    state: [...any][]
    total: number

    // [星级, 描述]
    wish(): [number, string]
}