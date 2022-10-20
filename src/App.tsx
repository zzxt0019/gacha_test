import React from 'react';
import './App.css';
import {Character} from "./ys/character";
import {FgoPay} from "./fgo/fgo-pay";
import {TryToWishChart} from "./charts/try-to-wish-chart";
import {MustGetChart} from "./charts/must-get-chart";
import {FgoFree} from "./fgo/fgo-free";
import {Weapon} from "./ys/weapon";

function App() {

    return (
        <div className="App">
            <MustGetChart baseWish={() => new Weapon()} bingoTimes={1}></MustGetChart>
            <MustGetChart baseWish={() => new Weapon()} bingoTimes={2}></MustGetChart>
            <MustGetChart baseWish={() => new Weapon()} bingoTimes={3}></MustGetChart>
            <MustGetChart baseWish={() => new Weapon()} bingoTimes={4}></MustGetChart>
            <MustGetChart baseWish={() => new Weapon()} bingoTimes={5}></MustGetChart>
            <TryToWishChart baseWish={() => new FgoPay()} total={600}></TryToWishChart>
            <TryToWishChart baseWish={() => new Character()} total={650} maxBingo={7} current={50}></TryToWishChart>
            <MustGetChart baseWish={() => new Character()} bingoTimes={7}></MustGetChart>
            <MustGetChart baseWish={() => new FgoFree()} bingoTimes={2}></MustGetChart>
        </div>
    );
}

export default App;
