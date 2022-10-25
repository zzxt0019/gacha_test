import {BaseWish} from "../base/base-wish";

export class Test implements BaseWish {
    current: number=0;
    total: number = 0;
    state = '';

    wish(): boolean {
        this.current++;
        this.total++;
        return Math.random() < 0.5;
    }

}