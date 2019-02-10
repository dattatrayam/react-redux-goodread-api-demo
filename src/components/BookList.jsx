import React, { Component } from "react";
import { connect } from "react-redux";
import BookListItemComponent from "./BookListItem"




class BookList extends Component {

  render() {
    if (!this.props.searchResult) {
      return (<div></div>)
    }
    const data = this.props.searchResult;
    console.log("data:"+data);
    const display = Object.keys(data).map(key => (
      <BookListItemComponent details={data[key]} />
    ));
    return (<div className="col-xs-3 booklist">{display}</div>)
  }
}

const mapStateToProps = state => {
  return { searchResult: state.searchResult };
};


const BookListComponent = connect(mapStateToProps,null)(BookList);
export default BookListComponent;