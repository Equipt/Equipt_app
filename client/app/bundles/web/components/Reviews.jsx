import React from 'react';
import PropTypes from 'prop-types';

const Reviews = ({
  reviews = []
}) => {

  return (
    <div className="reviews">
      <h1>Reviews</h1>
    </div>
  )

}

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
}

export default Reviews;
