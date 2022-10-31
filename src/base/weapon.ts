// 70   i<=62
// 70 + 700*(i-62) i>=63
// 600  i<=7
// 600 + 6000*(i-7)  i>=8
import {BaseWish} from "./base-wish";

export class Weapon implements BaseWish {
    current: number[] = [0, 0];
    total: number = 0;
    state: [[0, 0] | [1, 0] | [0, 1] | [1, 1] | [0, 2] | [1, 2],
            [0] | [1]] = [[0, 0], [0]];

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
            this.current[0] = 0;
            if (this.state[0][1] === 2) {  // 满定轨
                this.state[0] = [0, 0];
                return [5, 'up'];
            } else {  // 无定轨
                if (this.state[0][0] === 1) {  // 大保底
                    this.state[0][0] = 0 as any;
                    if (Math.random() < 0.5) {
                        this.state[0][1] = 0;
                        return [5, 'up'];
                    } else {
                        this.state[0][1]++;
                        return [5, 'other-up'];
                    }
                } else {  // 小保底
                    if (Math.random() < 0.75) {  // up
                        this.state[0][0] = 0;
                        if (Math.random() < 0.5) {
                            this.state[0][1] = 0;
                            return [5, 'up'];
                        } else {
                            this.state[0][1]++;
                            return [5, 'other-up'];
                        }
                    } else {
                        this.state[0][0] = 1 as any;
                        this.state[0][1]++;
                        return [5, 'other-w'];
                    }
                }
            }
        } else if (this.wish4()) {
            this.current[1] = 0;
            if (this.state[1][0] === 1 || Math.random() < 0.5) {  // 保底 或者 不歪
                this.state[1][0] = 0 as any;
                return [4, 'up' + Math.floor(1 + Math.random() * 5)] as [4, 'up1'] | [4, 'up2'] | [4, 'up3'] | [4, 'up4'] | [4, 'up5'];
            } else {
                this.state[1][0] = 1 as any;
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