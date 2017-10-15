import React from 'react';
import PropTypes from 'prop-types';

const Reviews = ({
  reviews = []
}) => {

  return (
    <div className="reviews">
      <h5>Reviews</h5>
    </div>
  )

}

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
}

export default Reviews;
