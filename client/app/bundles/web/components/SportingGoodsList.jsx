import PropTypes from 'prop-types';
import React from 'react';

import SportingGood from 'components/SportingGood';

const SportingGoodsList = ({
	sportingGoods,
	content,
	isOwner,
	actions
}) => {

	const indexContent = content.sporting_goods.index;

	return (
		<section className="container sporting-goods-index-wrapper">
		{
			sportingGoods.map((sportingGood, index) => {
				return <SportingGood key={ `${ sportingGood.title }_${ index }` } 
									 sportingGood={ sportingGood }
									 content={ indexContent }
									 isOwner={ isOwner }
									 actions={ actions }/>
			})	
		}
		</section>
	)

}

SportingGoodsList.propTypes = {
	sportingsGood: PropTypes.array,
	content: PropTypes.object.isRequired,
	isOwner: PropTypes.bool
}

export default SportingGoodsList;