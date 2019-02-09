import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import {showSelectedBookDetail} from "../actions/index"


const mapStateToProps = state => {
  return { searchResult: state.searchResult };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({showSelectedBookDetail: showSelectedBookDetail}, dispatch);
}

class BookList extends Component {

  render() {
    return(
      <ul className="list-group list-group-flush">
    {this.props.searchResult.map(book => (
      <li className="list-group-item" key={book.id}
        onClick={() => this.props.showSelectedBookDetail(book)}
      >
         <p
            className="text-sm-left font-weight-bold"
            data-toggle="tooltip"
            data-placement="bottom"
            title={book.best_book.title}
          >
            {book.best_book.title}
          </p>
          <p className="text-sm-left card-text">
            {book.best_book.author.name}
          </p>
      </li>
    ))}
  </ul>
    )
  }
}

/*const BookList = ({ searchResult }) => (
  <ul className="list-group list-group-flush">
    {searchResult.map(book => (
      <li className="list-group-item" key={book.id}
        onClick={() => props.showSelectedBookDetail(book)}
      >
         <p
            className="text-sm-left font-weight-bold"
            data-toggle="tooltip"
            data-placement="bottom"
            title={book.best_book.title}
          >
            {book.best_book.title}
          </p>
          <p className="text-sm-left card-text">
            {book.best_book.author.name}
          </p>
      </li>
    ))}
  </ul>
);*/
const BookListComponent = connect(mapStateToProps,mapDispatchToProps)(BookList);
export default BookListComponent;