import React, { Component } from "react";
import { connect } from "react-redux";
import {showSelectedBookDetail} from "../actions/index"

class BookListItem extends Component {
    render() {
       const { details } = this.props;
       return (
        <li className="list-group-item" key={details.id}
        onClick={() => this.props.showSelectedBookDetail(details.id)}
        >
         <p
            className="text-sm-left card-title font-weight-bold"
            title={details.best_book.title}
          >
            {details.best_book.title}
          </p>
         
      </li>
       ); 
    } 
 }

 function mapDispatchToProps(dispatch) {
  return {
    showSelectedBookDetail: bookId => dispatch(showSelectedBookDetail(bookId))
  };

}

const BookListItemComponent = connect(null,mapDispatchToProps)(BookListItem);
export default BookListItemComponent;
 