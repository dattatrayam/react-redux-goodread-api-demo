import React,{ Component } from "react";
import { connect } from "react-redux";
import { initSearch } from "../actions/index";

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
				className="mr-2 form-control col-sm-9"
				type="text"
				placeholder="Search Books by name"
				name="searchText"
        id="searchText"
        value={searchText}
        onChange={this.handleChange}
			  />
			  <button
				id="searchBtn"
         className="btn btn-primary btn-lg col-sm-2"
         onClick= {this.handleSubmit}
         >
				Search
			  </button>
        {this.props.searching ? (
          <p className="lead text-center">{"loading... "}</p>
        ) : ( <p></p>)}
			 </div>
  );
}
}

function mapDispatchToProps(dispatch) {
  return {
    initSearch: searchText => dispatch(initSearch(searchText))
  };
}

const mapStateToProps = state => {
  return { 
    searching: state.searching
   };
};

const SearchComponent = connect(mapStateToProps,mapDispatchToProps)(Search);
export default SearchComponent;