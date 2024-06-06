import update from "../../../helpers/update";
import AddProjectService from "./AddProjectService";

export const ADD_PROJECT_STARTED = "ADD_PROJECT_STARTED";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAILED = "ADD_PROJECT_FAILED";

export const GET_CATEGORIES_STARTED = "GET_CATEGORIES_STARTED";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";

const initialState = {
  list: {
    data:null,
    loading: false,
    success: false,
    failed: false,
    errors: {}
  },
};

export function addProject(model) {
  return dispatch => {
    dispatch(addProjectListActions.started());
    AddProjectService.addProject(model)
      .then(res => {
        console.log("then", res);
        dispatch(addProjectListActions.success());
      },
      err => { throw err; })
      .catch (err => {
        console.log("error", err);
      dispatch(addProjectListActions.failed(err.response));
    });
  }
}

export const getCategories = () => {
  return (dispatch) => {
      dispatch(getCategoriesListActions.started());
      AddProjectService.getCategories()
          .then((response) => {
              console.log("response", response);
              dispatch(getCategoriesListActions.success(response));
          }, err => { throw err; })
          .catch(err => {
              dispatch(getCategoriesListActions.failed(err));
          });
  }
}

export const addProjectListActions = {
  started: () => {
    return {
      type: ADD_PROJECT_STARTED
    }
  },
  success: () => {
    return {
      type: ADD_PROJECT_SUCCESS,
    }
  },
  failed: (error) => {
    return {
      type: ADD_PROJECT_FAILED,
      errors: error.data
    }
  }
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

export const addProjectReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ADD_PROJECT_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors",{});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case ADD_PROJECT_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      break;
    }
    case ADD_PROJECT_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", action.errors);
      newState = update.set(newState, "list.failed", true);
      break;
    }
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
    default: {
      return newState;
    }
  }
  return newState;
};