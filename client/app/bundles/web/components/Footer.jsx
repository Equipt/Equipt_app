import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  content
}) => {

  return (
    <footer>
      <div className="row">'
        <div className="col-xs-4">
          <h4 className="header">{ content.footer.about.title }</h4>
        </div>
        <div className="col-xs-4">
          <h4 className="header">{ content.footer.how_it_works.title }</h4>
        </div>
      </div>
    </footer>
  )

}

Footer.propTypes = {
  content: PropTypes.object.isRequired
}

export default Footer;
