// 60   i<=73
// 60+600*(i-73)  i>=74
// 70   i<=62
// 70+700*(i-62) i>=63
import {BaseWish} from "../base/base-wish";

export class Character implements BaseWish {
    current: number = 0;
    total: number = 0;
    state: 'small' | 'big' = 'small';

    single() {
        if (this.current <= 73) {
            return Math.random() < 0.006;
        } else if (this.current <= 89) {
            return Math.random() < 0.006 + 0.06 * (this.current - 73);
        } else {
            return true;
        }
    }
    wish() {
        this.current++;
        this.total++;
        if (this.single()) {
            this.current = 0;
            if (this.state === 'big') {
                this.state = 'small';
                return true;  // up(大保底)
            }
            if (Math.random() < 0.5) {
                this.state = 'small';
                return true;  // up(小保底)
            } else {
                this.state = 'big';
                return false;  // 歪
            }
        } else {
            return false;  // 没出5星
        }
    }

}