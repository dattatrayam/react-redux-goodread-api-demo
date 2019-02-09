import * as types from "../constants/action-types";

const initialState = {
  searchResult: [],
  visitedBooks: []
};

function rootReducer(state = initialState, action) {
  if (action.type === types.SEARCH_DATA_LOADED) {
    return Object.assign({}, state, {
      searchResult: state.searchResult.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
