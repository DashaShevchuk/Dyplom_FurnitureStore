import ProjectService from "./ProjectService";
import update from "../../../helpers/update";

export const PROJECT_STARTED = "PROJECT_STARTED";
export const PROJECT_SUCCESS = "PROJECT_SUCCESS";
export const PROJECT_FAILED = "PROJECT_FAILED";

const initialState = {
  list: {
    data: null,
    loading: false,
    success: false,
    failed: false,
  },
};

export const getProject = (model) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    ProjectService.getProject(model)
      .then(
        (response) => {
          console.log("response", response);
          dispatch(getListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getListActions.failed(err));
      });
  };
};

export const getListActions = {
  started: () => {
    return {
      type: PROJECT_STARTED,
    };
  },
  success: (data) => {
    return {
      type: PROJECT_SUCCESS,
      payload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: PROJECT_FAILED,
      errors: error,
    };
  },
};

export const projectReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case PROJECT_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case PROJECT_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    case PROJECT_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    
    default: {
      return newState;
    }
  }
  return newState;
};
