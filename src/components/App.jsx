import React from "react";
import BookListComponent from "./BookList";
import SearchComponent from "./Search";
import BookDetailComponent from "./BookDetail"

const App = () => (
    <div className="container">
    <div className="container-body">
		<div className="header">
      <h3>React-Redux-Redux-Thunk GoodReads API APP</h3>
      </div>
      <div>
      <SearchComponent />
      <div className='row'>
        <BookListComponent  />
        <BookDetailComponent />
      </div>
      </div>
    </div>
  </div>
);
export default App;

