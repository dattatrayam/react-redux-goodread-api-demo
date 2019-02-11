import { INIT_SEARCH } from "../constants/action-types";
import { emptySearch, startSearch } from "../actions/index";

export function searchTextMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === INIT_SEARCH) {
        if (action.playload.searchText.length===0) {
          return dispatch(emptySearch());
        }
        else 
          return dispatch(startSearch(action.playload.searchText))
      }
      return next(action);
    };
  };
}
