import {BaseWish} from "../base/base-wish";

export class FgoFree implements BaseWish {
    current: number = 0;
    total: number = 0;
    flag: boolean = false

    wish() {
        this.current++;
        this.total++;
        if (!this.flag && this.total === 300) {
            this.current = 0;
            return true;
        }
        if (Math.random() < 0.01) {
            if (Math.random() < 0.8) {
                this.current = 0;
                this.flag = true;
                return true;
            } else {
                this.current = 0;
                return false;
            }
        } else {
            return false;
        }
    }
}