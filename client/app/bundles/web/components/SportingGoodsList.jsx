import PropTypes from 'prop-types';
import React from 'react';

import SportingGood from 'components/SportingGood';

const SportingGoodsList = ({
	sportingGoods
}) => {

	return (
		<section className="container">
		{
			sportingGoods.map(sportingGood => {
				return <SportingGood key={ sportingGood.title } 
									 sportingGood={ sportingGood }/>
			})	
		}
		</section>
	)

}

SportingGoodsList.propTypes = {
	sportingsGood: PropTypes.array
};

export default SportingGoodsList;