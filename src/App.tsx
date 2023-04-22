import React from 'react';
import {YsWishPage} from "./wish/pages/ys-wish-page";
import {AreaContext} from "./base/area-context";
import {Route, Routes} from "react-router";
import {BrowserRouter, Link} from "react-router-dom";
import {BtWishPage} from "./wish/pages/bt-wish-page";
import {Menu} from "antd";

function App() {
    return (<>
        <BrowserRouter>
            <Menu mode={'horizontal'}>
                <Menu.Item><Link to={'/gacha_test/ys'}>ys</Link></Menu.Item>
                <Menu.Item><Link to={'/gacha_test/bt'}>bt</Link></Menu.Item>
            </Menu>
            <AreaContext.Provider value={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}>
                <Routes location={'/gacha_test/ys'}>
                    <Route path={'/gacha_test/ys'} element={<YsWishPage></YsWishPage>}/>
                    <Route path={'/gacha_test/bt'} element={<BtWishPage></BtWishPage>}/>
                </Routes>
            </AreaContext.Provider>
        </BrowserRouter>
    </>);
}

export default App;
