import update from "../../../helpers/update";
import HomePageService from "./HomePageService";

export const GET_CATEGORIES_STARTED = "GET_CATEGORIES_STARTED";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";

export const SEND_EMAIL_STARTED = "SEND_EMAIL_STARTED";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";

const initialState = {
  list: {
    data:null,
    loading: false,
    success: false,
    failed: false,
    errors: {}
  },
};

export const getCategories = () => {
  return (dispatch) => {
      dispatch(getCategoriesListActions.started());
      HomePageService.getCategories()
          .then((response) => {
              console.log("response", response);
              dispatch(getCategoriesListActions.success(response));
          }, err => { throw err; })
          .catch(err => {
              dispatch(getCategoriesListActions.failed(err));
          });
  }
}

export const sendEmail=(model)=> {
  return (dispatch) => {
    dispatch(sendEmailListActions.started());
    HomePageService.sendEmail(model)
      .then(
        (res) => {
          console.log("then", res);
          dispatch(sendEmailListActions.success());
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        console.log("error", err);
        dispatch(sendEmailListActions.failed(err.response));
      });
  };
}

export const getCategoriesListActions = {
  started: () => {
    return {
      type: GET_CATEGORIES_STARTED
    }
  },
  success: (data) => {
    return {
      type: GET_CATEGORIES_SUCCESS,
      payload: data.data
    }
  },
  failed: (error) => {
    return {
      type: GET_CATEGORIES_FAILED,
      errors: error.data
    }
  }
}

export const sendEmailListActions = {
  started: () => {
    return {
      type: SEND_EMAIL_STARTED,
    };
  },
  success: (data) => {
    return {
      type: SEND_EMAIL_SUCCESS,
    };
  },
  failed: (error) => {
    return {
      type: SEND_EMAIL_FAILED,
      errors: error.data,
    };
  },
};

export const homePageReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
       case GET_CATEGORIES_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors",{});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case GET_CATEGORIES_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.success", true);
      newState = update.set(newState, 'list.data', action.payload);
      break;
    }
    case GET_CATEGORIES_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", action.errors);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case SEND_EMAIL_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", {});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case SEND_EMAIL_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      break;
    }
    case SEND_EMAIL_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", action.errors);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};

