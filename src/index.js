import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import firebase from 'firebase';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

//Credenciales de nuestra APP
firebase.initializeApp({
    apiKey: "AIzaSyAjQ9NwlAXj-C4Cj3MAw9s22asP91EGP7I",
    authDomain: "petinder-fc7b6.firebaseapp.com",
    databaseURL: "https://petinder-fc7b6.firebaseio.com",
    projectId: "petinder-fc7b6",
    storageBucket: "petinder-fc7b6.appspot.com",
    messagingSenderId: "331629175639"
});

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider> 
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
