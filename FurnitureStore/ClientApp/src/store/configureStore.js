import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

///reducers
import { loginReducer } from '../views/adminViews/loginPage/reducer';
import { addProjectReducer } from '../views/adminViews/addProject/reducer';
import { projectsTableReducer } from '../views/adminViews/projectsTable/reducer';
import { homePageReducer } from '../views/userViews/homePage/reducer';
import { projectsReducer } from '../views/userViews/projects/reducer';
import { projectReducer } from '../views/userViews/project/reducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//export const history = createHistory({ basename: baseUrl });
export const history = createBrowserHistory({ basename: baseUrl });

export default function configureStore(history,initialState) {
  const reducers = {
    login: loginReducer,
    addProject:addProjectReducer,
    projectsTable:projectsTableReducer,
    homePage:homePageReducer,
    projects:projectsReducer,
    project:projectReducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  // if (typeof window !== 'undefined' && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) {
  //   enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__());
  // }



  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    {},
    composeWithDevTools(
      applyMiddleware(...middleware),
      // other store enhancers if any
    )
  );
}