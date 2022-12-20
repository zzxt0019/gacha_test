import React from 'react';
import {WishPage} from "./wish/pages/wish-page";
import {AreaContext} from "./base/area-context";

function App() {
    return (
        <AreaContext.Provider value={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}>
            <WishPage></WishPage>
        </AreaContext.Provider>
    );
}

export default App;
