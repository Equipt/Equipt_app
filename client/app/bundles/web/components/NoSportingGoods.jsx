import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

const NoSportingGoods = ({
    content = {}
}) => {
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-xs-12 no-sporting-goods-wrapper">
        <div className="sporting-good-container no-sporting-goods">
          <h5 className="title">{ content.index.no_sporting_goods }</h5>
          <Link to="/owner/sporting_goods/new">
            <div className="sporting-good-image">
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </Link>
          <p>{ content.index.add_a_sporting_good }</p>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

export default NoSportingGoods;
