// 60   i<=73
// 60 + 600*(i-73)  i>=74
// 510   i<=8
// 510 + 5100*(i-8)  i>=9
//=========================
// 70   i<=62
// 70 + 700*(i-62) i>=63
// 600  i<=7
// 600 + 6000*(i-7)  i>=8
import {BaseWish} from "../base/base-wish";

export class Character implements BaseWish {
    /**
     *
     */
    current: number[] = [0, 0];
    state: ['small' | 'big'
        , 'other' | 'up'] = ['small', 'other'];
    total: number = 0;

    wish5() {
        if (this.current[0] <= 73) {
            return Math.random() < 0.006;
        } else {
            return Math.random() < 0.006 + 0.06 * (this.current[0] - 73);
        }
    }

    wish4() {
        if (this.current[1] <= 8) {
            return Math.random() < 0.051;
        } else {
            return Math.random() < 0.051 + 0.51;
        }
    }

    wish(): CharacterResult {
        this.current[0]++;
        this.current[1]++;
        this.total++;
        if (this.wish5()) {
            this.current[0] = 0;
            if (this.state[0] === 'big') {
                this.state[0] = 'small';
                return [5, 'up'];  // up(大保底)
            }
            if (Math.random() < 0.5) {
                this.state[0] = 'small';
                return [5, 'up'];  // up(小保底)
            } else {
                this.state[0] = 'big';
                return [5, 'other-c'];  // 歪
            }
        } else if (this.wish4()) {
            this.current[1] = 0;
            if (this.state[1] === 'up') {
                this.state[1] = 'other';
                return [4, 'up' + Math.floor(1 + Math.random() * 3)] as [4, 'up1'] | [4, 'up2'] | [4, 'up3'];
            }
            if (Math.random() < 0.5) {
                this.state[1] = 'other';
                return [4, 'up' + Math.floor(1 + Math.random() * 3)] as [4, 'up1'] | [4, 'up2'] | [4, 'up3'];
            } else {
                this.state[1] = 'up';
                return [4, 'other-' + (Math.random() < 0.5 ? 'c' : 'w')] as [4, 'other-c'] | [4, 'other-w'];
            }
        } else {
            return [3, 'other-w'];
        }
    }

}

export type CharacterResult =
    [5, 'up'] |
    [5, 'other-c'] |
    [4, 'up1'] |
    [4, 'up2'] |
    [4, 'up3'] |
    [4, 'other-c'] |
    [4, 'other-w'] |
    [3, 'other-w']
