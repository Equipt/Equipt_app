import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Footer = ({
  content
}) => {

  return (
    <footer>
      <div className="row">
        <div className="col-xs-4">
          <Link to="/about">
            <h4>{ content.footer.about.title }</h4>
          </Link>
        </div>
        <div className="col-xs-4">
          <Link to="/how_it_works">
            <h4>{ content.footer.how_it_works.title }</h4>
          </Link>
        </div>
        <div className="col-xs-4">
          <Link to="/report_a_bug">
            <h4>{ content.footer.report_a_bug.title }</h4>
          </Link>
        </div>
      </div>
      <style jsx>{`
        footer {
          min-height: 100px;
          margin: 0 -50px;
          background: #8FC485;
          padding: 50px 50px;
        }
        .main-logo {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </footer>
  )

}

Footer.propTypes = {
  content: PropTypes.object.isRequired
}

export default Footer;
