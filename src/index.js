import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import store from './store/storeConfigure';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
