import Axios from "axios";
import _ from 'lodash';

const goodReadApiKey = '1QuOnDaZDKNfSKf09AjA';
const CORS_ENDPOINT_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const GOODREAD_SEARCH_ENDPOINT = 'https://www.goodreads.com/search/index.xml';
const GOODREAD_SHOW_BOOK_ENDPOINT = 'https://www.goodreads.com/book/show/';


class GoodReadService {

  async getSearchResult(searchText) {
    const url = `${CORS_ENDPOINT_HEROKU+GOODREAD_ENDPOINT}?key=${goodReadApiKey}&q=${searchText}`;
	
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/xml'
      }
    });
    if (!response.ok) {
      throw new Error(`GoodReadService getSearchResult failed, HTTP status ${response.status}`);
    }
    const data = await parseXMLResponse(response.data);
    const sortedByTitle = _.orderBy(data, 'data.best_book.title', 'desc');
    return _.map(sortedByTitle, (book) => {
      return {
		 _get(book,'data.best_book.id') : book }
      }
    });
  }

  async getBookDetailInfo(bookId) {
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
    }
	} else {
	  let description = XMLResponse.getElementsByTagName("description")[0].innerHTML;
	  description = description.replace("<![CDATA[", "").replace("]]>", "");
	  if (!description) {
		description = "No description found.";
	  }
	  return description
	}
  }

  
  parseXMLResponse (response) {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      throw new Error(`GoodReadService : There was an error fetching results.`);
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
      const searchResults = XMLresults.map(result => this.XMLToJson(result));
	  return searchResults
    }
	};
	
	XMLToJson(XML) {
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
	

}

export default new GoodReadService();
