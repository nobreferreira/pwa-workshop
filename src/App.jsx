import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import PhotosList from './components/photosList/photosListComponent';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Photo Gallery</h1>
                </header>
                <PhotosList />
                <ToastContainer />
            </div>
        );
    }
}

export default App;
