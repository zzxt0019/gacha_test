import ReactECharts from "echarts-for-react";
import React from "react";
import {BaseWish} from "../base/base-wish";

/**
 * 一共抽x个需要多少抽的模拟分布
 * @param props
 * @constructor
 */
export function MustGetChart(props: MustGetChartProps) {
    const {current = 0, simulateTimes = 20000} = props;
    let arr: number[] = [];
    for (let i = 0; i < simulateTimes; i++) {
        let baseWish = props.baseWish();
        baseWish.current = current
        let bingo = 0;
        while (bingo < props.bingoTimes) {
            if (baseWish.wish()) {
                bingo++;
            }
        }
        if (!arr[baseWish.total]) {
            arr[baseWish.total] = 1;
        } else {
            arr[baseWish.total]++;
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
    baseWish!: () => BaseWish;
    bingoTimes!: number;
    current?: number;
    simulateTimes?: number;
}