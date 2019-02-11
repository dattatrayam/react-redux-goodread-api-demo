import * as types from "../constants/action-types";
import Axios from "axios";

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';
const CORS_ENDPOINT_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const GOODREAD_SEARCH_ENDPOINT = 'https://www.goodreads.com/search/index.xml';
const GOODREAD_SHOW_BOOK_ENDPOINT = 'https://www.goodreads.com/book/show/';

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

export function showSelectedBookDetail(playload) {
  return function(dispatch,getState) {
    const {searchResult} = getState();
    dispatch( {type: types.SHOW_BOOK_DETAIL,searchResult:searchResult, playload })
    //if description not found in book object get book data
    let selectedItem = searchResult[playload];
    if(!selectedItem.description) {
      dispatch({type: types.FETCHING_BOOK_DATA,playload})
      const url = `${CORS_ENDPOINT_HEROKU+GOODREAD_SHOW_BOOK_ENDPOINT}${playload}?key=${goodReadApiKey}`;
		  return Axios.get(url)
      .then(response => getBookDescription(response.data))
      .then(res => {
          searchResult[playload].description =res;
          dispatch( {type: types.BOOK_DATA_LOADED,searchResult:searchResult, description:res,playload })
      });
    }
        
  };
 
}

//get book description from response
export function getBookDescription(response) {
  const parser = new DOMParser();
  const XMLResponse = parser.parseFromString(response, "application/xml");
  let description = XMLResponse.getElementsByTagName("description")[0].innerHTML;
  description = description.replace("<![CDATA[", "").replace("]]>", "");
  if (!description) {
  description = "No description found.";
  }
  return description;
}

//utility functions to parse XML data and get JSON Object
export function parseXMLResponse (response) {
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

