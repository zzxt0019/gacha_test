import {BaseWish} from "../base/base-wish";

export class FgoPay implements BaseWish {
    current: number = 0;
    total: number = 0;
    wish() {
        this.current++;
        this.total++;
        if (Math.random() < 0.01) {
            if (Math.random() < 0.8) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}