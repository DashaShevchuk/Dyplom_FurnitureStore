import ProjectsService from "./ProjectsService";
import update from "../../../helpers/update";

export const PROJECTS_STARTED = "PROJECTS_STARTED";
export const PROJECTS_SUCCESS = "PROJECTS_SUCCESS";
export const PROJECTS_FAILED = "PROJECTS_FAILED";

const initialState = {
  list: {
    data: null,
    loading: false,
    success: false,
    failed: false,
  },
};

export const getProjects = (model) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    ProjectsService.getProjects(model)
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
      type: PROJECTS_STARTED,
    };
  },
  success: (data) => {
    return {
      type: PROJECTS_SUCCESS,
      payload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: PROJECTS_FAILED,
      errors: error,
    };
  },
};

export const projectsReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case PROJECTS_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case PROJECTS_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    case PROJECTS_FAILED: {
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
