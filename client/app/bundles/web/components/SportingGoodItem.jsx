import React from 'react';

export default function SportingGoodItem(props) {

	let SportingGood = props.sportingGood;
  	
  	return  (<div className="col-lg-3 col-md-6 col-xs-12">
  				<a href={ `/sporting_goods/${ SportingGood.slug } `}>
					{ SportingGood.title }
				</a>
			</div>);

}