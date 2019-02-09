import * as types from "../constants/action-types";

const initialState = {
  searchResult: [],
 };

function rootReducer(state = initialState, action) {
  if (action.type === types.SEARCH_DATA_LOADED) {
    console.log("playload:"+action.playload)
    return Object.assign({}, state, {
      searchResult: state.searchResult.concat(action.playload)
    });
  }
  
  return state;
}

export default rootReducer;
