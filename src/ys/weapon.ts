// 70   i<=62
// 70 + 700*(i-62) i>=63
// 600  i<=7
// 600 + 6000*(i-7)  i>=8
import {BaseWish} from "../base/base-wish";

export class Weapon implements BaseWish {
    current: number[] = [0, 0];
    total: number = 0;
    state: ['small0' | 'small1' | 'big' | 'ding-gui', 'other' | 'up'] = ['small0', 'other'];

    wish5() {
        if (this.current[0] <= 62) {
            return Math.random() < 0.007;
        } else {
            return Math.random() < 0.007 + 0.07 * (this.current[0] - 62);
        }
    }

    wish4() {
        if (this.current[1] <= 7) {
            return Math.random() < 0.06;
        } else {
            return Math.random() < 0.06 + 0.6 * (this.current[1] - 7);
        }
    }

    wish(): WeaponResult {
        this.current[0]++;
        this.current[1]++;
        this.total++;
        if (this.wish5()) {
            switch (this.state[0]) {
                case 'ding-gui':
                    this.state[0] = 'small0';
                    this.current[0] = 0;
                    return [5, 'up'];  // 定轨出up
                case 'big':
                    if (Math.random() < 0.5) {
                        this.state[0] = 'small0';
                        this.current[0] = 0;
                        return [5, 'up'];  // 歪常驻 + 大保底出up
                    } else {
                        this.state[0] = 'ding-gui';
                        this.current[0] = 0;
                        return [5, 'other-up'];  // 歪常驻 + 歪大保底
                    }
                case 'small0':
                    if (Math.random() < 0.75) {
                        if (Math.random() < 0.5) {
                            this.state[0] = 'small0';
                            this.current[0] = 0;
                            return [5, 'up'];  // 出up
                        } else {
                            this.state[0] = 'small1';
                            this.current[0] = 0;
                            return [5, 'other-up'];  // 歪up
                        }
                    } else {
                        this.state[0] = 'big';
                        this.current[0] = 0;
                        return [5, 'other-w'];  // 歪常驻
                    }
                case 'small1':
                    if (Math.random() < 0.75) {
                        this.state[0] = 'small0';
                        this.current[0] = 0;
                        return [5, 'up'];  // 歪up + 出up
                    } else {
                        this.state[0] = 'ding-gui';
                        this.current[0] = 0;
                        return [5, 'other-w'];  // 歪up + 歪常驻
                    }
            }
        } else if (this.wish4()) {
            this.current[1] = 0;
            if (this.state[1] === 'up') {
                this.state[1] = 'other';
                return [4, 'up' + Math.floor(1 + Math.random() * 5)] as [4, 'up1'] | [4, 'up2'] | [4, 'up3'] | [4, 'up4'] | [4, 'up5'];
            }
            if (Math.random() < 0.5) {
                this.state[1] = 'other';
                return [4, 'up' + Math.floor(1 + Math.random() * 5)] as [4, 'up1'] | [4, 'up2'] | [4, 'up3'] | [4, 'up4'] | [4, 'up5'];
            } else {
                this.state[1] = 'up';
                return [4, 'other-' + (Math.random() < 0.5 ? 'c' : 'w')] as [4, 'other-c'] | [4, 'other-w'];
            }
        } else {
            return [3, 'other-w'];
        }
    }
}

export type WeaponResult =
    [5, 'up'] |
    [5, 'other-up'] |
    [5, 'other-w'] |
    [4, 'up1'] |
    [4, 'up2'] |
    [4, 'up3'] |
    [4, 'up4'] |
    [4, 'up5'] |
    [4, 'other-w'] |
    [4, 'other-c'] |
    [3, 'other-w'];