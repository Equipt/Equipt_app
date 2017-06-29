import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

const SportingGoodDetails = (props) => {

    const { sportingGood } = props;

    return (
        <section className="container">

            <Link to="/sporting_goods" className="pull-right">Go Back</Link>

            <h3>{ sportingGood.title }</h3>
            
        </section>
    );

}

SportingGoodDetails.propTypes = {
    sportingGood: PropTypes.object.isRequired
}

export default SportingGoodDetails;