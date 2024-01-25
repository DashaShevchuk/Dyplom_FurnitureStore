import update from "../../../helpers/update";
import HomePageService from "./HomePageService";

export const GET_CATEGORIES_STARTED = "GET_CATEGORIES_STARTED";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";

export const GET_PROJECTS_STARTED = "GET_PROJECTS_STARTED";
export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";
export const GET_PROJECTS_FAILED = "GET_PROJECTS_FAILED";

const initialState = {
  list: {
    categories:null,
    projects:null,
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

export const getProjects = (model) => {
  return (dispatch) => {
    dispatch(getProjectsListActions.started());
    HomePageService.getProjects(model)
      .then(
        (response) => {
          console.log("response", response);
          dispatch(getProjectsListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getProjectsListActions.failed(err));
      });
  };
};

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

export const getProjectsListActions = {
  started: () => {
    return {
      type: GET_PROJECTS_STARTED
    }
  },
  success: (data) => {
    return {
      type: GET_PROJECTS_SUCCESS,
      payload: data.data
    }
  },
  failed: (error) => {
    return {
      type: GET_PROJECTS_FAILED,
      errors: error.data
    }
  }
}

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
      newState = update.set(newState, "list.categories", action.payload);
      break;
    }
    case GET_CATEGORIES_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", action.errors);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case GET_PROJECTS_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors",{});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case GET_PROJECTS_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.success", true);
      newState = update.set(newState, "list.projects", action.payload);
      break;
    }
    case GET_PROJECTS_FAILED: {
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

