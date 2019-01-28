import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-rating-component';

const RatingsList = ({
  ratings = []
}) => {
	return ratings.length ?
	<ul className="reviews">{ ratings.map((rating, index) => <Rating key={`rating_${ index }`} { ...rating }/>) }</ul> :
	<p>{ I18n.t('ratings.no_ratings') }</p>
}

const Rating = ({
	comment,
	rating,
	updatedAt
}) => (
	<li>
		<p className="pull-left">{ comment }</p>
		<div className="pull-right">
		<StarRatings value={ rating } name="rating" className="pull-right"/>
		<i className="date">{ updatedAt } ago</i>
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
);

RatingsList.propTypes = {
  ratings: PropTypes.array.isRequired
}

export default RatingsList;
