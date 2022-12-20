import {BaseWish} from "./base-wish";

export class Character implements BaseWish {
    current: number[] = [0, 0];
    /*
      [五星保底, 四星保底]
     */
    state: [[0] | [1], [0] | [1]] = [[0], [1]];
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
            if (this.state[0][0] === 1 || Math.random() < 0.5) {  // 大保底 或者 不歪
                this.state[0][0] = 0 as any;
                return [5, 'up'];
            } else {  // 歪
                this.state[0][0] = 1 as any;
                return [5, 'other-c'];
            }
        } else if (this.wish4()) {
            this.current[1] = 0;
            if (this.state[1][0] === 1 || Math.random() < 0.5) {  // 保底 或者 不歪
                this.state[1][0] = 0 as any;
                return [4, 'up' + Math.floor(1 + Math.random() * 3)] as [4, 'up1'] | [4, 'up2'] | [4, 'up3'];
            } else {
                this.state[1][0] = 1 as any;
                return [4, 'other-' + (Math.random() < 0.5 ? 'c' : 'w')] as [4, 'other-c'] | [4, 'other-w'];
            }
        } else {
            return [3, 'other-w'];
        }
    }

}

export type CharacterResult =
    [5, 'up'] |  // 5星up
    [5, 'other-c'] |  // 5星其他
    [4, 'up1'] |  // 4星up1
    [4, 'up2'] |  // 4星up2
    [4, 'up3'] |  // 4星up3
    [4, 'other-c'] |  // 4星其他角色
    [4, 'other-w'] |  // 4星其他武器
    [3, 'other-w']  // 3星武器
