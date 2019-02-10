import React, { Component } from "react";
import { connect } from "react-redux";
import {showSelectedBookDetail} from "../actions/index"

class BookListItem extends Component {
    render() {
       const { details } = this.props;
       console.log("selected Id:"+details.id)
       return (
        <li className="list-group-item" key={details.id}
        onClick={() => this.props.showSelectedBookDetail(details)}
        >
         <p
            className="font-weight-bold"
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
    showSelectedBookDetail: bookData => dispatch(showSelectedBookDetail(bookData))
  };

}


const BookListItemComponent = connect(null,mapDispatchToProps)(BookListItem);
export default BookListItemComponent;
 