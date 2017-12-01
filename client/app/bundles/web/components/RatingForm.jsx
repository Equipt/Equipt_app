import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StarRatings from 'react-star-ratings';

export class RatingForm extends Component {

  static PropTypes = {
    rate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  ratingChanged() {
  }

  render() {
    const { title } = this.props;
    return (
      <div className="rating-form-wrapper">
        <h4>{ title }</h4>
        <StarRatings name="rating" onRatingClick={ this.ratingChanged } starWidthAndHeight={ '25px' } totalStars={ 5 }/>
        <textarea className="form-control"/>
        <button className="btn btn-success pull-right">Rate</button>
      </div>
    )
  }

}
