import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { searchResult: state.searchResult };
};
const BookList = ({ searchResult }) => (
  <ul className="list-group list-group-flush">
    {searchResult.map(book => (
      <li className="list-group-item" key={book.id}>
         <p
            className="text-sm-left card-title font-weight-bold"
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
);
const BookListComponent = connect(mapStateToProps)(BookList);
export default BookListComponent;