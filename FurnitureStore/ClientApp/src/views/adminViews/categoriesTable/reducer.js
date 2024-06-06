import CategoriesTableService from "./CategoriesTableService";
import update from "../../../helpers/update";

export const CATEGORIES_TABLE_STARTED = "CATEGORIES_TABLE_STARTED";
export const CATEGORIES_TABLE_SUCCESS = "CATEGORIES_TABLE_SUCCESS";
export const CATEGORIES_TABLE_FAILED = "CATEGORIES_TABLE_FAILED";

export const DELETE_CATEGORY_STARTED = "DELETE_CATEGORY_STARTED";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED";

export const EDIT_CATEGORY_STARTED = "EDIT_CATEGORY_STARTED";
export const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
export const EDIT_CATEGORY_FAILED = "EDIT_CATEGORY_FAILED";

export const ADD_CATEGORY_STARTED = "ADD_CATEGORY_STARTED";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAILED = "ADD_CATEGORY_FAILED";

const initialState = {
  list: {
    data: null,
    loading: false,
    success: false,
    failed: false,
  },
};

export const getCategories = (model) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    CategoriesTableService.getCategories(model)
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

export const deleteCategory = (model) => {
  return (dispatch) => {
    dispatch(deleteListActions.started());
    CategoriesTableService.deleteCategory(model)
      .then(
        (response) => {
          console.log("response", response);
          dispatch(deleteListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        console.log("err", err);
        dispatch(deleteListActions.failed(err));
      });
  };
};

export const editCategory =(model) =>{
  return (dispatch) => {
    dispatch(editCategoryListActions.started());
    CategoriesTableService.editCategory(model)
      .then(
        (res) => {
          console.log("then", res);
          dispatch(editCategoryListActions.success());
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        console.log("error", err);
        dispatch(editCategoryListActions.failed(err.response));
      });
  };
}

export function addCategory(model) {
  return dispatch => {
    dispatch(addListActions.started());
    CategoriesTableService.addCategory(model)
      .then(res => {
        console.log("then", res);
        dispatch(addListActions.success());
      },
      err => { throw err; })
      .catch (err => {
        console.log("error", err);
      dispatch(addListActions.failed(err.response));
    });
  }
}

export const getListActions = {
  started: () => {
    return {
      type: CATEGORIES_TABLE_STARTED,
    };
  },
  success: (data) => {
    return {
      type: CATEGORIES_TABLE_SUCCESS,
      payload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: CATEGORIES_TABLE_FAILED,
      errors: error,
    };
  },
};

export const deleteListActions = {
  started: () => {
    return {
      type: DELETE_CATEGORY_STARTED,
    };
  },
  success: (data) => {
    return {
      type: DELETE_CATEGORY_SUCCESS,
      deletePayload: data.data,
    };
  },
  failed: (error) => {
    return {
      type: DELETE_CATEGORY_FAILED,
      payloadError: error,
    };
  },
};

export const editCategoryListActions = {
  started: () => {
    return {
      type: EDIT_CATEGORY_STARTED,
    };
  },
  success: (data) => {
    return {
      type: EDIT_CATEGORY_SUCCESS,
    };
  },
  failed: (error) => {
    return {
      type: EDIT_CATEGORY_FAILED,
      errors: error.data,
    };
  },
};

export const addListActions = {
  started: () => {
    return {
      type: ADD_CATEGORY_STARTED
    }
  },
  success: () => {
    return {
      type: ADD_CATEGORY_SUCCESS,
    }
  },
  failed: (error) => {
    return {
      type: ADD_CATEGORY_FAILED,
      errors: error.data
    }
  }
}

export const categoriesTableReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case CATEGORIES_TABLE_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case CATEGORIES_TABLE_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    case CATEGORIES_TABLE_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case DELETE_CATEGORY_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.errors", {});
      newState = update.set(newState, "list.messageResult", {});
      break;
    }
    case DELETE_CATEGORY_SUCCESS: {
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
    case DELETE_CATEGORY_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.errors", action.payloadError);
      newState = update.set(newState, "list.messageResult", {});
      break;
    }
    case EDIT_CATEGORY_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", {});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case EDIT_CATEGORY_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      break;
    }
    case EDIT_CATEGORY_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors", action.errors);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case ADD_CATEGORY_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.errors",{});
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case ADD_CATEGORY_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      break;
    }
    case ADD_CATEGORY_FAILED: {
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
