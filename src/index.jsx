import React from 'react';
import ReactDOM from 'react-dom';
import { HackerNewsApp } from './Components/HackerNewsApp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './Store/reducers';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
    reducers, /* preload state */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <HackerNewsApp />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
if (undefined /* [snowpack] import.meta.hot */ ) {
    undefined /* [snowpack] import.meta.hot */ .accept();
}