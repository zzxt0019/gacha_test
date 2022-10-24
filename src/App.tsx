import React, {CSSProperties} from 'react';
import {Layout} from "antd";
import {MustGetChart} from "./charts/must-get-chart";
import {Character} from "./ys/character";
import {Weapon} from "./ys/weapon";
import {FgoFree} from "./fgo/fgo-free";
import {TryToWishChart} from "./charts/try-to-wish-chart";
import {FgoPay} from "./fgo/fgo-pay";
import {Test} from "./test/test";

function App() {

    return (
        <Layout>
            <TryToWishChart wish={[{
             baseWish:()=>new Character(),
             bingoTimes:1,
            },{
                baseWish:()=>new Weapon(),
            }]} total={160} simulateTimes={100000}></TryToWishChart>
            {/*<MustGetChart wish={[{*/}
            {/*    baseWish: () => new Character(),*/}
            {/*    bingoTimes: 7,*/}
            {/*}, {*/}
            {/*    baseWish: () => new Weapon(),*/}
            {/*    bingoTimes: 5*/}
            {/*}]} simulateTimes={100000}></MustGetChart>*/}
            {/*<MustGetChart wish={{*/}
            {/*    baseWish:()=>new FgoFree(),*/}
            {/*    bingoTimes:5*/}
            {/*}} simulateTimes={100000}></MustGetChart>*/}
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
