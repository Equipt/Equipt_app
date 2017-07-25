import PropTypes from 'prop-types';
import React from 'react';

const SportingGoodsForm = ({
	content
}) => {

	const { create } = content.sporting_goods;

	return (
		<section className="container">
			<h3>{ create.title }</h3>
			<form>
			</form>
		</section>
	)

}

export default SportingGoodsForm;