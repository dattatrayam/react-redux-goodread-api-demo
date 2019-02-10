import * as types from "../constants/action-types";

const initialState = {
  searching: false,
  searchResult:null,
  selectedBookDetail:null,
  fetchingBookDetail:false
  };

function rootReducer(state = initialState, action) {
  if (action.type === types.SEARCH_STARTED) {
    return Object.assign({}, state, {
        searching:true,
        searchResult:null,
        selectedBookDetail:null
    });
  }
  else if (action.type === types.SEARCH_DATA_LOADED) {
    return Object.assign({}, state, {
      searchResult: arrayToObject(action.playload),
      searching:false
   });
  }
  else if (action.type === types.SHOW_BOOK_DETAIL) {
    return Object.assign({}, state, {
      selectedBookDetail: action.searchResult[action.playload]
    });
  }
  else if (action.type === types.FETCHING_BOOK_DATA) {
    return Object.assign({}, state, {
      fetchingBookDetail: true
    });
  }
  else if (action.type === types.BOOK_DATA_LOADED) {
    return Object.assign({}, state, {
      fetchingBookDetail: false,
      searchResult: action.searchResult,
      selectedBookDetail: action.searchResult[action.playload]
    });
  }
  
  return state;
}

const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.id] = item
     return obj
 }, {})

 


export default rootReducer;
