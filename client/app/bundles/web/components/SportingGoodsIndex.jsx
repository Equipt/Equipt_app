import PropTypes from 'prop-types';
import React from 'react';

export default class SportingGoodsIndex extends React.Component {
  
    static propTypes = {
        sportingGoods: PropTypes.array.isRequired, // this is passed from the Rails view
    };

    constructor(props, _railsContext) {
        super(props);

        this.state = { 
            
        };

    }

    render() {

        const sportingGoods = this.props.sportingGoods;

        return (
            <section className="container">

                <h1>Equiptment</h1>

                <div className="row">
                {
                    sportingGoods.map(item => {
                        return  <li  className="col-lg-3 col-md-6 col-xs-12"
                                     key={ item.slug }>
                                    <a href={ `/sporting_goods/${ item.slug } `}>
                                        { item.title }
                                    </a>
                                </li>;
                    })
                }
                </div>
            </section>
        );

    }
}
