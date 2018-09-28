import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import {DB_config} from './config';
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Credenciales de nuestra APP
firebase.initializeApp(DB_config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("userPets");

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider> 
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
