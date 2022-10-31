import React from "react";
import {BaseWish} from "../base/base-wish";
import {getEnum} from "../base/data";
import ReactECharts from "echarts-for-react";

/**
 * 一共抽x个需要多少抽的模拟分布
 * @param props
 * @constructor
 */
export function MustGetChart(props: MustGetChartProps) {
    const {wish, simulateTimes = 20000} = props;
    let arr: number[] = [];
    let wishes: MustGetWish[] = Array.isArray(wish) ? wish : [wish];

    const bingoAll = (bingo: Map<[number, string], number>, bingoTimes: Map<[number, string], number>) => {
        let flag: boolean = true;
        bingoTimes.forEach((value, key) => {
            if ((bingo.get(key) as number) < value) {
                flag = false;
            }
        });
        return flag;
    };
    for (let i = 0; i < simulateTimes; i++) {
        let total = 0;
        for (let j = 0; j < wishes.length; j++) {
            let wish0 = wishes[j];
            let baseWish = wish0.baseWish();
            const {current, bingoTimes, state} = wish0;
            if (current) {
                baseWish.current = current
            }
            if (state) {
                baseWish.state = state;
            }
            let bingo = new Map<[number, string], number>();
            bingoTimes.forEach((value: number, key: [number, string]) => {
                bingo.set(getEnum(key), 0);
            });

            while (!bingoAll(bingo, bingoTimes)) {
                let result = baseWish.wish();
                bingo.set(getEnum(result), (bingo.get(getEnum(result)) ? bingo.get(getEnum(result)) as number : 0) + 1);
            }
            total += baseWish.total;
        }
        if (!arr[total]) {
            arr[total] = 1;
        } else {
            arr[total]++;
        }
    }
    let xAxis = [];
    let yAxis = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            xAxis.push(i);
            yAxis.push(arr[i]);
        }
    }
    return <ReactECharts
        option={{
            xAxis: {
                type: 'category',
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yAxis,
                    type: 'line',
                }
            ],
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    let all = 0;
                    for (let i = 0; i <= Number(params[0].name); i++) {
                        if (arr[i]) {
                            all += arr[i];
                        }
                    }
                    return `<div>
                            <div>抽了${params[0].name}次</div>
                            <div>模拟了${params[0].value}次</div>
                            <div>当前概率: ${params[0].value / simulateTimes * 100}%</div>
                            <div>左累计概率: ${all / simulateTimes * 100}%</div>
                            <div>右累计概率: ${(simulateTimes - all + params[0].value) / simulateTimes * 100}%</div>
                        </div>`
                }
            }
        }}
    ></ReactECharts>
}

export class MustGetChartProps {
    wish!: MustGetWish[] | MustGetWish
    simulateTimes?: number;
}

export class MustGetWish {
    baseWish!: () => BaseWish;
    bingoTimes!: Map<[number, string], number>;
    current?: number[];
    state?: string[];
}