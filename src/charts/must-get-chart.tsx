import React from "react";
import {BaseWish} from "../base/base-wish";
import {deepCopy, tuple2Enum} from "../base/data";
import ReactECharts from "echarts-for-react";
import {AreaContext} from "../context/area-context";

/**
 * 一共抽x个需要多少抽的模拟分布
 * @param props
 * @constructor
 */
export function MustGetChart(props: MustGetChartProps) {
    const {wish, simulateTimes = 20000} = props;
    let arr: number[] = [];
    let wishes: MustGetWish[] = Array.isArray(wish) ? wish : [wish];
    for (let i = 0; i < simulateTimes; i++) {
        let total = 0;
        for (let j = 0; j < wishes.length; j++) {
            let wish0 = wishes[j];
            let baseWish = wish0.baseWish();
            const {current, targets, state} = wish0;
            if (current) {
                baseWish.current = deepCopy(current);
            }
            if (state) {
                baseWish.state = deepCopy(state);
            }
            let bingo = new Map<[number, string], number>();
            targets.forEach((value: number, key: [number, string]) => {
                bingo.set(tuple2Enum(key), 0);
            });
            while (!matchTargets(bingo, targets)) {
                let result = baseWish.wish();
                bingo.set(tuple2Enum(result), (bingo.get(tuple2Enum(result)) ? bingo.get(tuple2Enum(result)) as number : 0) + 1);
            }
            total += baseWish.total;
        }
        if (!arr[total]) {
            arr[total] = 1;
        } else {
            arr[total]++;
        }
    }
    let xAxis: number[] = [];
    let xxAxis: number[] = [];  // key: xAxis的value; value: xAxis的index
    let yAxis: number[] = [];
    let yyAxis: number[] = [];  // yAxis的累计
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            xAxis.push(i);
            xxAxis[i] = xAxis.length - 1;
            yAxis.push(arr[i]);
            yyAxis.push((yyAxis[yyAxis.length - 1] ?? 0) + arr[i]);
        }
    }
    const areaContext = React.useContext(AreaContext);
    const {markLineData, visualPieces} = areaParams({xAxis, yAxis, xxAxis, yyAxis}, areaContext, simulateTimes);
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
                    symbol: 'none',
                    lineStyle: {
                        color: '#336'
                    },
                    areaStyle: {},
                    markLine: {
                        symbol: ['none', 'none'],
                        label: {show: false},
                        data: markLineData
                    },
                }
            ],
            visualMap: {
                type: 'piecewise',
                show: false,
                dimension: 0,
                seriesIndex: 0,
                pieces: visualPieces
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    return `<div>
                                <div>抽了${params[0].name}次</div>
                                <div>模拟了${params[0].value}次</div>
                                <div>当前概率: ${params[0].value / simulateTimes * 100}%</div>
                                <div>左累计概率: ${yyAxis[xxAxis[Number(params[0].name)]] / simulateTimes * 100}%</div>
                                <div>右累计概率: ${(simulateTimes - yyAxis[xxAxis[Number(params[0].name)]] + params[0].value) / simulateTimes * 100}%</div>
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
    targets!: Map<[number, string], number>;
    current?: number[];
    state?: number[][];
}

function matchTargets(bingo: Map<[number, string], number>, targets: Map<[number, string], number>) {
    let flag: boolean = true;
    targets.forEach((value, key) => {
        if ((bingo.get(key) as number) < value) {
            flag = false;
        }
    });
    return flag;
}

function areaParams(props: { xAxis: number[], yAxis: number[], xxAxis: number[], yyAxis: number[] },areaContext:number[], simulateTimes: number) {
    let areaLine: number[] = [];
    const {xAxis, yAxis, xxAxis, yyAxis} = props;
    for (let i = 0; i < xAxis.length; i++) {
        for (let j = 0; j < areaContext.length; j++) {
            if (!areaLine[1 + j]&&yyAxis[i]>=simulateTimes*areaContext[j]) {
                areaLine[1 + j] = xAxis[i];
            }
        }
    }
    areaLine[0] = xAxis[0];
    areaLine[areaContext.length + 1] = xAxis[xAxis.length - 1];
    let markLineData = [], visualPieces = []
    for (let i = 0; i < areaLine.length - 1; i++) {
        if (i !== 0) {
            markLineData.push({xAxis: xxAxis[areaLine[i]]})
        }
        visualPieces.push({
            ge: xxAxis[areaLine[i]],
            lt: xxAxis[areaLine[i + 1]],
            color: 'rgba(0,0,180,' + (0.5 / areaLine.length * (i + 1)) + ')',
        });
    }
    return {markLineData, visualPieces}
}