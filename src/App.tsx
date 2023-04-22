import React from 'react';
import {AreaContext} from "./base/area-context";
import {Tabs} from "antd";
import {YsWishPage} from "./wish/pages/ys-wish-page";
import {SrWishPage} from "./wish/pages/sr-wish-page";

function App() {
    return (<>
        <AreaContext.Provider value={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}>
            <Tabs items={[{
                label: 'ys',
                key: 'ys',
                children: <YsWishPage></YsWishPage>
            }, {
                label: 'sr',
                key: 'sr',
                children: <SrWishPage></SrWishPage>
            }]}>
            </Tabs>
        </AreaContext.Provider>
    </>);
}

export default App;
