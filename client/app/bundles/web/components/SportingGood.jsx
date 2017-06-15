import React from 'react';

const SportingGood = (props) => {

	const { sportingGood } = props;

	return (
		<div className="col-lg-3 col-md-6 col-xs-12">
  			<a href={ `/sporting_goods/${ sportingGood.slug } `}>
				{ sportingGood.title }
			</a>
		</div>
	)

}

export default SportingGood;