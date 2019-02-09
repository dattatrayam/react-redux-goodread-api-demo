import React from "react";
import BookListComponent from "./BookList";
import SearchComponent from "./Search";

const App = () => (
    <div className="container">
    <div className="container-body">
         <div className="header">
         <h3>Goodreads React Book Search Demo</h3>
         </div>
          <SearchComponent />
          <BookListComponent />
    </div>
  </div>
);
export default App;

