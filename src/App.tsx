import React, {CSSProperties} from 'react';
import {Layout} from "antd";
import {MustGetChart} from "./charts/must-get-chart";
import {Character} from "./ys/character";
import {Weapon} from "./ys/weapon";
import {FgoFree} from "./fgo/fgo-free";

function App() {

    return (
        <Layout>
            {/*<MustGetChart wish={[{*/}
            {/*    baseWish: () => new Character(),*/}
            {/*    bingoTimes: 7,*/}
            {/*}, {*/}
            {/*    baseWish: () => new Weapon(),*/}
            {/*    bingoTimes: 5*/}
            {/*}]} simulateTimes={100000}></MustGetChart>*/}
            <MustGetChart wish={{
                baseWish:()=>new FgoFree(),
                bingoTimes:5
            }} simulateTimes={100000}></MustGetChart>
            {/*<MustGetChart wish={{*/}
            {/*    baseWish:()=>new FgoFree(),*/}
            {/*    bingoTimes:1,*/}
            {/*}} simulateTimes={100000}></MustGetChart>*/}
            {/*<MustGetChart baseWish={()=>new Weapon()} bingoTimes={1}></MustGetChart>*/}
            {/*<Layout.Sider style={{backgroundColor: 'red'}}>*/}
            {/*    12341234*/}
            {/*</Layout.Sider>*/}
            {/*<Layout.Content style={{backgroundColor: 'green'}}>*/}
            {/*    111*/}
            {/*</Layout.Content>*/}
        </Layout>
    );
}

export default App;
