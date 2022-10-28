export class bb {}
// import {BaseWish} from "../base/base-wish";
// import ReactECharts from "echarts-for-react";
// import React from "react";
//
// /**
//  * 一共x抽能到抽多少个的模拟分布
//  * @param props
//  * @constructor
//  */
// export function TryToWishChart(props: TryToWishChartProps) {
//     const {wish, total, simulateTimes = 20000,} = props;
//     const wishes = Array.isArray(wish) ? wish : [wish];
//     let mission: number[][] = [];
//     for (let i = 0; i < simulateTimes; i++) {
//         let totalWish = 0;
//         for (let j = 0; j < wishes.length; j++) {
//             const {current = 0, bingoTimes = Number.MAX_VALUE} = wishes[j];
//             let baseWish = wishes[j].baseWish();
//             baseWish.current = current;
//             let bingo = 0;
//             for (; totalWish < total; totalWish++) {
//                 if (baseWish.wish()) {
//                     bingo++;
//                 }
//                 if (bingo === bingoTimes) {
//                     totalWish++;
//                     break;
//                 }
//             }
//             if (totalWish === total && bingo !== bingoTimes) {
//                 if (!mission[j]) {
//                     mission[j] = []
//                 }
//                 if (!mission[j][bingo]) {
//                     mission[j][bingo] = 1;
//                 } else {
//                     mission[j][bingo]++;
//                 }
//                 break;
//             }
//         }
//     }
//     let xAxis = [];
//     let yAxis = [];
//     for (let i = 0; i < mission.length; i++) {
//         if (mission[i]) {
//             for (let j = 0; j < mission[i].length; j++) {
//                 if (mission[i][j]) {
//                     xAxis.push(i + ',' + j);
//                     yAxis.push(mission[i][j]);
//                 }
//             }
//         }
//     }
//     return <ReactECharts option={{
//         title: {
//             text: total + '次结果(模拟'
//         },
//         tooltip: {
//             trigger: 'axis',
//             formatter: (params: any) => {
//                 let all = 0;
//                 let I = Number(params[0].name.split(',')[0])
//                 let J = Number(params[0].name.split(',')[1])
//                 for (let i = 0; i < mission.length; i++) {
//                     if (i <= I && mission[i]) {
//                         for (let j = 0; j < mission[i].length; j++) {
//                             if (j <= J && mission[i][j]) {
//                                 all += mission[i][j];
//                             }
//                         }
//                     }
//                 }
//                 return `<div>
//                             <div>${mission[0]}</div>
//                             <div>${mission[1]}</div>
//                             <div>完成前${I}个任务, 第${I + 1}个任务抽中${J}次</div>
//                             <div>模拟了${params[0].value}次</div>
//                             <div>当前概率: ${params[0].value / simulateTimes * 100}%</div>
//                             <div>左累计概率: ${all / simulateTimes * 100}%</div>
//                             <div>右累计概率: ${(simulateTimes - all + params[0].value) / simulateTimes * 100}%</div>
//                         </div>`
//             }
//         },
//         xAxis: {
//             data: xAxis,
//         },
//         yAxis: {},
//         series: [
//             {
//                 name: '次数',
//                 type: 'bar',
//                 data: yAxis
//             }
//         ],
//     }}></ReactECharts>;
// }

// export class TryToWishChartProps {
//     wish!: TryToWish[] | TryToWish;
//     total!: number;
//     simulateTimes?: number;
// }

// export class TryToWish {
//     baseWish!: () => BaseWish;
//     bingoTimes?: number;
//     current?: number = 0;
// }