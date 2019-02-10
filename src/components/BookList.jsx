import React, { Component } from "react";
import { connect } from "react-redux";
//import {bindActionCreators} from 'redux'
import {showSelectedBookDetail} from "../actions/index"



class BookList extends Component {

  render() {
    return(
      <ul className="list-group list-group-flush">
    {this.props.searchResult.map(book => (
      <li className="list-group-item" key={book.best_book.id}
        onClick={() => this.props.showSelectedBookDetail(book)}
      >
         <p
            className="font-weight-bold"
            title={book.best_book.title}
          >
            {book.best_book.title}
          </p>
         
      </li>
    ))}
  </ul>
    )
  }
}

const mapStateToProps = state => {
  return { searchResult: state.searchResult };
};

function mapDispatchToProps(dispatch) {
  //return bindActionCreators({showSelectedBookDetail: showSelectedBookDetail}, dispatch);
  return {
    showSelectedBookDetail: book => dispatch(showSelectedBookDetail(book))
  };

}

const BookListComponent = connect(mapStateToProps,mapDispatchToProps)(BookList);
export default BookListComponent;