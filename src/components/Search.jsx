import React,{ Component } from "react";
import { connect } from "react-redux";
import { initSearch } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    initSearch: searchText => dispatch(initSearch(searchText))
  };
}

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;
    this.props.initSearch({ searchText });
  }

 
  
render() {
  const { searchText } = this.state;
  return (
      <div className="form-group row">
			  <input
				className="form-control"
				type="text"
				placeholder="Search Books by name"
				name="searchText"
        id="searchText"
        value={searchText}
        onChange={this.handleChange}
			  />
			  <button
				id="searchBtn" type="submit"
         className="btn btn-success btn-lg"
         onClick= {this.handleSubmit}
         >
				Search
			  </button>
			 </div>
  );
}
}
const SearchComponent = connect(null,mapDispatchToProps)(Search);
export default SearchComponent;