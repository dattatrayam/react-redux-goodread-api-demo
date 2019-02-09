import * as types from "../constants/action-types";


export function emptySearch() {
  return { type: types.FOUND_EMPTY_TEXT };
}
export function getSearchData(payload) {
  return { type: types.FETCH_SEARCH_DATA,payload };
}
export function searchDataLoaded(playload) {
  return { type: types.SEARCH_DATA_LOADED,playload };
}
export function showBookDetail(playload) {
  return { type: types.SHOW_BOOK_DETAIL,playload };
}
export function getBookData(playload) {
  return { type: types.FETCH_BOOK_DATA,playload };
}
export function bookDataLoaded(playload) {
  return { type: types.BOOK_DATA_LOADED,playload };
}
