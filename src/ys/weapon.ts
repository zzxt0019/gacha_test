import {BaseWish} from "../base/base-wish";

export class Weapon implements BaseWish {
    current: number = 0;
    total: number = 0;
    state: 'small0' | 'small1' | 'big' | 'ding-gui' = 'small0';

    single() {
        if (this.current <= 62) {
            return Math.random() < 0.007;
        } else if (this.current <= 79) {
            return Math.random() < 0.007 + 0.07 * (this.current - 62);
        } else {
            return true;
        }
    }

    wish() {
        this.current++;
        this.total++;
        if (this.single()) {
            switch (this.state) {
                case 'ding-gui':
                    this.state = 'small0';
                    this.current = 0;
                    return true;  // 定轨出up
                case 'big':
                    if (Math.random() < 0.5) {
                        this.state = 'small0';
                        this.current = 0;
                        return true;  // 歪常驻 + 大保底出up
                    } else {
                        this.state = 'ding-gui';
                        this.current = 0;
                        return false;  // 歪常驻 + 歪大保底
                    }
                case 'small0':
                    if (Math.random() < 0.75) {
                        if (Math.random() < 0.5) {
                            this.state = 'small0';
                            this.current = 0;
                            return true;  // 出up
                        } else {
                            this.state = 'small1';
                            this.current = 0;
                            return false;  // 歪up
                        }
                    } else {
                        this.state = 'big';
                        this.current = 0;
                        return false;  // 歪常驻
                    }
                case 'small1':
                    if (Math.random() < 0.75) {
                        this.state = 'small0';
                        this.current = 0;
                        return true;  // 歪up + 出up
                    } else {
                        this.state = 'ding-gui';
                        this.current = 0;
                        return false;  // 歪up + 歪常驻
                    }
            }
        }
        return false;
    }
}