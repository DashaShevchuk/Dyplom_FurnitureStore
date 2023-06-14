import ProjectsTableServices from "./ProjectsTableServices";
import update from "../../../helpers/update";

export const GET_CATEGORIES_STARTED = "GET_CATEGORIES_STARTED";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";

export const PROJECTS_TABLE_STARTED = "PROJECTS_TABLE_STARTED";
export const PROJECTS_TABLE_SUCCESS = "PROJECTS_TABLE_SUCCESS";
export const PROJECTS_TABLE_FAILED = "PROJECTS_TABLE_FAILED";

export const DELETE_PROJECT_STARTED = "DELETE_PROJECT_STARTED";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILED = "DELETE_PROJECT_FAILED";

export const EDIT_PROJECT_STARTED = "EDIT_PROJECT_STARTED";
export const EDIT_PROJECT_SUCCESS = "EDIT_PROJECT_SUCCESS";
export const EDIT_PROJECT_FAILED = "EDIT_PROJECT_FAILED";

const initialState = {
  list: {
    data: null,
    categories: null,
    loading: false,
    success: false,
    failed: false,
  },
};

export const getCategories = () => {
  return (dispatch) => {
    dispatch(getCategoriesListActions.started());
    ProjectsTableServices.getCategories()
      .then(
        (response) => {
          dispatch(getCategoriesListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getCategoriesListActions.failed(err));
      });
  };
};

export const getProjects = (model) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    ProjectsTableServices.getProjects(model)
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

export const deleteProject = (model) => {
  return (dispatch) => {
    dispatch(getDeleteListActions.started());
    ProjectsTableServices.deleteProject(model)
      .then(
        (response) => {
          console.log("response", response);
          dispatch(getDeleteListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        console.log("err", err);
        dispatch(getDeleteListActions.failed(err));
      });
  };
};

export const editProject =(model) =>{
  return (dispatch) => {
    dispatch(getEditProjectListActions.started());
    ProjectsTableServices.editProject(model)
      .then(
        (res) => {
          console.log("then", res);
          dispatch(getEditProjectListActions.success());
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        console.log("error", err);
        dispatch(getEditProjectListActions.failed(err.response));
      });
  };
}

export const getCategoriesListActions = {
  started: () => {
    return {
      type: GET_CATEGORIES_STARTED,
    };
  },
  success: (data) => {
    return {
      type: GET_CATEGORIES_SUCCESS,
      payload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: GET_CATEGORIES_FAILED,
      errors: error.data,
    };
  },
};

export const getListActions = {
  started: () => {
    return {
      type: PROJECTS_TABLE_STARTED,
    };
  },
  success: (data) => {
    return {
      type: PROJECTS_TABLE_SUCCESS,
      payload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: PROJECTS_TABLE_FAILED,
      errors: error,
    };
  },
};

export const getDeleteListActions = {
  started: () => {
    return {
      type: DELETE_PROJECT_STARTED,
    };
  },
  success: (data) => {
    return {
      type: DELETE_PROJECT_SUCCESS,
      deletePayload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: DELETE_PROJECT_FAILED,
      payloadError: error,
    };
  },
};

export const getEditProjectListActions = {
  started: () => {
    return {
      type: EDIT_PROJECT_STARTED,
    };
  },
  success: (data) => {
    return {
      type: EDIT_PROJECT_SUCCESS,
    };
  },
  failed: (error) => {
    return {
      type: EDIT_PROJECT_FAILED,
      errors: error.data,
    };
  },
};

export const projectsTableReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case GET_CATEGORIES_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", {});
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
    case PROJECTS_TABLE_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case PROJECTS_TABLE_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    case PROJECTS_TABLE_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case DELETE_PROJECT_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.errors", {});
      newState = update.set(newState, "list.messageResult", {});
      break;
    }
    case DELETE_PROJECT_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(
        newState,
        "list.messageResult",
        action.deletePayload
      );
      newState = update.set(newState, "list.errors", {});
      break;
    }
    case DELETE_PROJECT_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.errors", action.payloadError);
      newState = update.set(newState, "list.messageResult", {});
      break;
    }
    case EDIT_PROJECT_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", {});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case EDIT_PROJECT_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      break;
    }
    case EDIT_PROJECT_FAILED: {
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
