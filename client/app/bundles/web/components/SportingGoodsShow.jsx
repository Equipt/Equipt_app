import PropTypes from 'prop-types';
import React from 'react';

export default class SportingGoodsShow extends React.Component {
  
    static propTypes = {
        sportingGood: PropTypes.object.isRequired
    };

    constructor(props, _railsContext) {
        super(props);

        this.state = { 
            
        };

    }

    render() {

        const sportingGood = this.props.sportingGood;

        return (
            <section className="container">

                <h3>{ sportingGood.title }</h3>
                
            </section>
        );

    }
}