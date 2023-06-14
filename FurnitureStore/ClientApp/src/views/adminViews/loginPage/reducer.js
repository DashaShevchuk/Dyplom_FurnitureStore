import update from "../../../helpers/update";
import LoginService from "./LoginService";
import isEmpty from "lodash/isEmpty";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import redirectStatusCode from "../../../services/redirectStatusCode";
import { push } from "connected-react-router";

export const LOGIN_POST_STARTED = "login/LOGIN_POST_STARTED";
export const LOGIN_POST_SUCCESS = "login/LOGIN_POST_SUCCESS";
export const LOGIN_POST_FAILED = "login/LOGIN_POST_FAILED";
export const LOGIN_SET_CURRENT_USER = "login/SET_CURRENT_USER";

const initialState = {
  post: {
    loading: false,
    success: false,
    failed: false,
    errors: {}
  },
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    roles: []
  }
};

export const loginReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case LOGIN_POST_STARTED: {
      newState = update.set(state, "post.loading", true);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", {});
      newState = update.set(newState, "post.failed", false);
      break;
    }
    case LOGIN_SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    }
    case LOGIN_POST_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.errors", {});
      newState = update.set(newState, "post.success", true);
      break;
    }
    case LOGIN_POST_FAILED: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", action.errors);
      newState = update.set(newState, "post.failed", true);
      break;
    }
    default: {
      return newState;
    }
  }

  return newState;
};

export const login = model => {
  return dispatch => {
    dispatch(loginActions.started());
    LoginService.login(model)
      .then(
        response => {
          dispatch(loginActions.success());
          const { token, refreshToken } = response.data;
          loginByJWT({ token, refToken: refreshToken }, dispatch);
          const pushUrl = "/admin/projects";      
          dispatch(push(pushUrl));
          window.location.reload();
        },
        err => {
          throw err;
        }
      )
      .catch(err => {
       dispatch(loginActions.failed(err.response));
        redirectStatusCode(err.response);
      });
  };
};

export const loginActions = {
  started: () => {
    return {
      type: LOGIN_POST_STARTED
    };
  },

  success: () => {
    return {
      type: LOGIN_POST_SUCCESS
    };
  },

  failed: response => {
    return {
      type: LOGIN_POST_FAILED,
      errors: response.data
    };
  },

  setCurrentUser: user => {
    return {
      type: LOGIN_SET_CURRENT_USER,
      user
    };
  }
};

export const checkTokenExpiration = () => {
  return dispatch => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logoutByJWT({ token }, dispatch);
      }
    }
  };
};

export const logout = () => {
  return dispatch => {
    logoutByJWT(dispatch);
    dispatch(loginActions.setCurrentUser({}));
  };
};

export const loginByJWT = (tokens, dispatch) => {
  const { token, refToken } = tokens;
  console.log('login tokens: ', token);
  console.log('login refToken: ', refToken);
  const user = jwt_decode(token);

  if (!Array.isArray(user.roles)) {
    user.roles = [user.roles];
  }
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("refreshToken", refToken);
  setAuthorizationToken(token);
  dispatch(loginActions.setCurrentUser(user));
};

export const logoutByJWT = dispatch => {
  console.log('logout jwtToken: ', localStorage.getItem("jwtToken"));
  console.log('logout refreshToken: ', localStorage.getItem("refreshToken"));

  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");

  setAuthorizationToken(false);
  dispatch(loginActions.setCurrentUser({}));
};