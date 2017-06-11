import PropTypes from 'prop-types';
import React from 'react';

import SportingGoodItem from './SportingGoodItem.jsx';

export class SportingGoodsIndex extends React.Component {
  
    static propTypes = {
        sportingGoods: PropTypes.array.isRequired, // this is passed from the Rails view
    };

    constructor(props, _railsContext) {
        super(props);
    }

    render() {

        const sportingGoods = this.props.sportingGoods;

        return (
            <section className="container">

                <h2>Equipment</h2>

                <div className="row">
                {
                    sportingGoods.map(item => {
                        return <SportingGoodItem key={ item.slug } sportingGood={ item }/>
                    })
                }
                </div>
            </section>
        );

    }
}
