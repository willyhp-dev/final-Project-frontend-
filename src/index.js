import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import App from './App';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>
);



