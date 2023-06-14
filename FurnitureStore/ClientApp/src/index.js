import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store/configureStore';
import App from './App';
import '@coreui/coreui/dist/css/coreui.min.css';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import * as loginActions from './views/adminViews/loginPage/reducer';
import jwt from 'jsonwebtoken';

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

if(localStorage.jwtToken) {
    let data = {token: localStorage.jwtToken, refToken: localStorage.refreshToken};
    let user = jwt.decode(data.token);

    if (!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    
    loginActions.loginByJWT(data, store.dispatch);
}
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement);
 
    registerServiceWorker(unregister);