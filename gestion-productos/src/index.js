import React from 'react';
import ReactDOM from 'react-dom/client';
// import {Provider} from 'react-redux';
// import { legacy_createStore as createStore} from 'redux';
// import { applyMiddleware } from 'redux'; // applyMiddleware viene de redux
// import {thunk} from 'redux-thunk'; 

import App from './components/App';
// import reducers from './reducers';



const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(  
    
    <App /> 
    
);