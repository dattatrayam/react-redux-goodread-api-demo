import * as types from "../constants/action-types";
import Axios from "axios";

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';
const CORS_ENDPOINT_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const GOODREAD_SEARCH_ENDPOINT = 'https://www.goodreads.com/search/index.xml';
//const GOODREAD_SHOW_BOOK_ENDPOINT = 'https://www.goodreads.com/book/show/';


export function emptySearch() {
  return { type: types.FOUND_EMPTY_TEXT };
}
export function initSearch(playload) {
  return { type: types.INIT_SEARCH,playload };
}

export function startSearch(playload) {
  return function(dispatch) {
    dispatch({ type: types.SEARCH_STARTED,playload });
    const url = `${CORS_ENDPOINT_HEROKU+GOODREAD_SEARCH_ENDPOINT}?key=${goodReadApiKey}&q=${playload}`;
		return Axios.get(url)
    .then(response => parseXMLResponse(response.data))
    .then(res => {
        dispatch( {type: types.SEARCH_DATA_LOADED, playload:res })
     });
  };
}

export function parseXMLResponse (response) {
  console.log("response:"+response)
  const parser = new DOMParser();
  const XMLResponse = parser.parseFromString(response, "application/xml");
  const parseError = XMLResponse.getElementsByTagName("parsererror");

  if (parseError.length) {
    throw new Error(`GoodReadService : There was an error fetching results.`);
  } else {
    const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
    const searchResults = XMLresults.map(result => XMLToJson(result));
    return searchResults
  }
};

export function XMLToJson(XML) {
  const allNodes = new Array(...XML.children);
  const jsonResult = {};
  allNodes.forEach(node => {
    if (node.children.length) {
    jsonResult[node.nodeName] = XMLToJson(node);
    } else {
    jsonResult[node.nodeName] = node.innerHTML;
    }
  });
  return jsonResult;
}



export function searchDataLoaded(playload) {
  console.log("searchDataLoaded"+playload)
  

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
export function addArticle(payload) {
  return { type: types.ADD_ARTICLE, payload };
}


