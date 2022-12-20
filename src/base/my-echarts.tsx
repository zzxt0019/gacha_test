import * as echarts from 'echarts/core';
import {GridComponent, MarkLineComponent, TooltipComponent, VisualMapComponent,} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import React from "react";

echarts.use([
    GridComponent,
    VisualMapComponent,
    MarkLineComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    TooltipComponent
]);

export function MyEcharts(props: { option: any }) {
    const ref = React.useRef<any>();
    const [chart, setChart] = React.useState<any>();
    React.useEffect(() => {
        setChart(echarts.init(ref.current));
    }, [])
    if (chart) {
        chart.setOption(props.option)
    }
    return <div ref={ref} style={{width: '100%', height: '300px'}}></div>;
}