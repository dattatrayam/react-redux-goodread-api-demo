import * as types from "../constants/action-types";

const initialState = {
  searching: false,
  searchResult: [],
  selectedBook:undefined,
 };

function rootReducer(state = initialState, action) {
  if (action.type === types.SEARCH_STARTED) {
    console.log("SEARCH_STARTED REDUCER:")
    return Object.assign({}, state, {
        searching:true,
        searchResult:[]
    });
  }
  else if (action.type === types.SEARCH_DATA_LOADED) {
    console.log("SEARCH_DATA_LOADED REDUCER:")
    return Object.assign({}, state, {
      searchResult: state.searchResult.concat(action.playload),
      searching:false
   });
  }
  else if (action.type === types.SHOW_BOOK_DETAIL) {
    console.log("SHOW_BOOK_DETAIL REDUCER:")
    return Object.assign({}, state, {
      selectedBook: action.playload
    });
  }
  
  return state;
}

export default rootReducer;
