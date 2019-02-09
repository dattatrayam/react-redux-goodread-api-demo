import Axios from "axios";
import _ from 'lodash';
import { SEARCH_DATA_LOADED, BOOK_DATA_LOADED,SEARCH_ERROR} from "../constants/action-types"

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';
const CORS_ENDPOINT_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const GOODREAD_SEARCH_ENDPOINT = 'https://www.goodreads.com/search/index.xml';
const GOODREAD_SHOW_BOOK_ENDPOINT = 'https://www.goodreads.com/book/show/';

  export default function getSearchResult(searchText) {
    console.log("getSearchResult:"+searchText);
    const url = `${CORS_ENDPOINT_HEROKU+GOODREAD_SEARCH_ENDPOINT}?key=${goodReadApiKey}&q=${searchText}`;
		const request = Axios.get(url);
		
		return (dispatch) => {
			function onSuccess(res) {
				dispatch({ type: SEARCH_DATA_LOADED, playload: this.parseXMLResponse(res.data) });
				return success;
			}
	
			function onError(error) {
				dispatch({ type: SEARCH_ERROR, error });
				return error;
			}
	
			request.then(success => onSuccess, error => onError);
		}
		
    /*Axios.get(url)
		  .then(res => {
			  return {
					json : this.parseXMLResponse(res.data)
				}
		  })
		  .catch(error => {
        throw new Error(`GoodReadService : There was an error fetching results.`);
		  });*/
  }

  export default function getBookDetailInfo(bookId) {
    const url = `${CORS_ENDPOINT_HEROKU+GOODREAD_SHOW_BOOK_ENDPOINT}${bookId}?key=${goodReadApiKey}`;
	const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`GoodReadService getBookDetailInfo failed, HTTP status ${response.status}`);
    }
    const parser = new DOMParser();
	const XMLResponse = parser.parseFromString(response.data, "application/xml");

	const parseError = XMLResponse.getElementsByTagName("parsererror");

	if (parseError.length) {
	  throw new Error(`GoodReadService : There was an error fetching results.`);
  } else {
	  let description = XMLResponse.getElementsByTagName("description")[0].innerHTML;
	  description = description.replace("<![CDATA[", "").replace("]]>", "");
	  if (!description) {
		description = "No description found.";
	  }
	  return description
	}
  }

  
  export default function parseXMLResponse (response) {
    //console.log("response:"+response)
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      throw new Error(`GoodReadService : There was an error fetching results.`);
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
			const searchResults = XMLresults.map(result => this.XMLToJson(result));
			console.log("searchResults:"+searchResults);
	    return searchResults
    }
	};
	
	export default function XMLToJson(XML) {
		const allNodes = new Array(...XML.children);
		const jsonResult = {};
		allNodes.forEach(node => {
		  if (node.children.length) {
			jsonResult[node.nodeName] = this.XMLToJson(node);
		  } else {
			jsonResult[node.nodeName] = node.innerHTML;
		  }
		});
		return jsonResult;
	}
	
export default getSearchResult;
export default getBookDetailInfo;
