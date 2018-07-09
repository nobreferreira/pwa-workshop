import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import './index.css';
import store from './store/storeConfigure';
import firebaseConfig from './config/firebaseConfig.json';
import registerServiceWorker from './registerServiceWorker';


firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
