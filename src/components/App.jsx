import React from "react";
import BookListComponent from "./BookList";
import SearchComponent from "./Search";
import BookDetailComponent from "./BookDetail"

const App = () => (
    <div className="container">
    <div className="container-body">
         <div className="header">
         <h3>Goodreads React Book Search Demo</h3>
         </div>
          <SearchComponent />
          <div className='rowC'>
           <BookListComponent />
          <BookDetailComponent />
          </div>
    </div>
  </div>
);
export default App;

