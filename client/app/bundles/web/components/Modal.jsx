import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
    contentLabel = '',
    children = '',
    isVisible = false,
    onClose,
}) => {

    return (
        <div className={ `modal ${ isVisible ? 'show' : 'hide' }` } title={ contentLabel }>
            <div className="overlay" onClick={ onClose }></div>
            <div className="content col-xs-10 col-xs-offset-1">
                <i className="fa fa-times pull-right" onClick={ onClose } aria-hidden="true"></i>
                <span dangerouslySetInnerHTML={{ __html: children }}></span>
            </div>
        </div>
    )

};

Modal.propTypes = {
    contentLabel: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;
