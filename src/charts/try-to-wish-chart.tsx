import {BaseWish} from "../base/base-wish";
import ReactECharts from "echarts-for-react";
import React from "react";

/**
 * 一共x抽能到抽多少个的模拟分布
 * @param props
 * @constructor
 */
export function TryToWishChart(props: TryToWishChartProps) {
    const {
        maxBingo = Number.MAX_VALUE,
        simulateTimes = 20000,
        current = 0,
    } = props;
    let arr: number[] = [];
    for (let i = 0; i < simulateTimes; i++) {
        let count = 0;
        let baseWish = props.baseWish();
        baseWish.current = current;
        for (let j = 0; j < props.total; j++) {
            if (baseWish.wish()) {
                count++;
            }
        }
        count = Math.min(count, maxBingo);
        if (arr[count]) {
            arr[count]++;
        } else {
            arr[count] = 1;
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
    return <ReactECharts option={{
        title: {
            text: props.total + '次祈愿结果(模拟'
        },
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
                            <div>抽中up ${params[0].name}个</div>
                            <div>模拟了${params[0].value}次</div>
                            <div>当前概率: ${params[0].value / simulateTimes * 100}%</div>
                            <div>左累计概率: ${all / simulateTimes * 100}%</div>
                            <div>右累计概率: ${(simulateTimes - all + params[0].value) / simulateTimes * 100}%</div>
                        </div>`
            }
        },
        xAxis: {
            data: xAxis,
        },
        yAxis: {},
        series: [
            {
                name: '次数',
                type: 'bar',
                data: yAxis
            }
        ],
    }}></ReactECharts>;
}

export class TryToWishChartProps {
    baseWish!: () => BaseWish;
    total!: number;
    maxBingo?: number;
    current?: number;
    simulateTimes?: number;
}