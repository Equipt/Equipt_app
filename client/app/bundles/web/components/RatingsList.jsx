import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-rating-component';

const RatingsList = ({
  ratings = []
}) => {

  return (
    <ul className="reviews">
      {
        ratings.map((rating, index) => {
          return (
            <li key={`rating_${ index }`}>
              <p className="pull-left">{ rating.comment }</p>
              <div className="pull-right">
                <StarRatings value={ rating.rating } name="rating" className="pull-right"/>
                <i className="date">{ rating.updatedAt } ago</i>
              </div>
              <div className="clear"></div>
              <style jsx>{`
                li {
                  border-bottom: solid 1px #E4E4E4;
                  padding: 10px;
                }
                p {
                  width: 70%;
                }
                .clear {
                  clear: both;
                }
                .date {
                  display: block;
                  clear: right;
                }
              `}</style>
            </li>
          )
        })
      }
    </ul>
  )

}

RatingsList.propTypes = {
  ratings: PropTypes.array.isRequired
}

export default RatingsList;
