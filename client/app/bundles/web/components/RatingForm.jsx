import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StarRatings from 'react-star-rating-component';

export class RatingForm extends Component {

  static PropTypes = {
    rate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    const { rental } = props;
    const { rating = {} } = rental;
    const { comment = {} } = rating;

    this.state = {
      rating: rating.rating || 0,
      comment: comment.comment || ""
    };

    this.onStarClick = this.onStarClick.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  onStarClick(newRating) {
    this.setState({
      rating: newRating
    })
  }

  submitRating() {

    const { rental, rate } = this.props;

    const comment = this.refs['comment'].value;
    const { rating } = this.state;

    rate(rental, {
      rating: {
        comment: comment,
        rating: rating
      }
    });

  }

  render() {

    const { title } = this.props;
    const { rating, comment } = this.state;

    return (
      <div className="rating-form-wrapper">
        <h4>{ title }</h4>
        <StarRatings
                  name="rentalRating"
                  starCount={ 5 }
                  value={ rating }
                  onStarClick={this.onStarClick.bind(this)}
              />
        <textarea className="form-control" ref="comment" defaultValue={ comment }/>
        <br/>
        <button className="btn btn-success pull-right" onClick={ this.submitRating }>Rate</button>
        <br className="clearfix"/>
      </div>
    )
  }

}
