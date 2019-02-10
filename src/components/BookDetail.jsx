import React, { Component } from 'react';
import {connect} from 'react-redux'
import StarRatings from "react-star-ratings";

class BookDetail extends Component {
	render() {
        if (!this.props.bookData) {
                return (<div></div>)
        }
		return (
			<div>
				<div>
				  <img
					src={this.props.bookData.best_book.image_url}
					height="200px"
					width="200px"
					alt="cover"
				  />
			 </div>
			 <div>
				<h3 className="mb-3 mt-3 word-wrap:break-word;">{this.props.bookData.best_book.title}</h3>
				 <p className="mb-3 mt-3">
					By:{" "}
					<span className="font-weight-bold">
					  {this.props.bookData.best_book.author.name}
					</span>
			   </p>
				<div className="row">
				<div>
					<StarRatings
					  rating={Number(this.props.bookData.average_rating)}
					  starRatedColor="orange"
					  changeRating={this.changeRating}
					  numberOfStars={5}
					  name='rating'
					  starDimension="20px"
					  starSpacing="3px"
					/>
					<span className="font-weight-bold ml-1 mt-3">
					{this.props.bookData.average_rating}
					</span>
				 </div>
				 <div>
					<span className="rating ml-1 mt-3">
					  Rating Details: {this.props.bookData.ratings_count} Ratings , {this.props.bookData.text_reviews_count} Reviews 
					</span>
				 </div>
				</div>
			 </div>
		 </div>
			
		);
	}
}

function mapStateToProps(state) {
  return {
    bookData: state.selectedBook
  };
}

const BookDetailComponent =  connect(mapStateToProps)(BookDetail)
export default BookDetailComponent