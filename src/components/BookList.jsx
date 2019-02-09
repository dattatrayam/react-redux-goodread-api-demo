import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { searchResult: state.searchResult };
};
const BookList = ({ searchResult }) => (
  <ul className="list-group list-group-flush">
    {searchResult.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const BookListComponent = connect(mapStateToProps)(BookList);
export default BookListComponent;