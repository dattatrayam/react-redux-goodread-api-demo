import * as types from "../constants/action-types";

const initialState = {
  searching: false,
  searchResult:null,
  selectedBook:undefined,
 };

function rootReducer(state = initialState, action) {
  if (action.type === types.SEARCH_STARTED) {
    console.log("SEARCH_STARTED REDUCER:")
    return Object.assign({}, state, {
        searching:true,
        searchResult:null
    });
  }
  else if (action.type === types.SEARCH_DATA_LOADED) {
    console.log("SEARCH_DATA_LOADED REDUCER:")
    return Object.assign({}, state, {
      //searchResult: state.searchResult.concat(arrayToObject(action.playload)),
      searchResult: arrayToObject(action.playload),
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

const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.best_book.id] = item
     return obj
 }, {})



export default rootReducer;
