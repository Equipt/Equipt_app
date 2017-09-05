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
                <a className="pull-right" onClick={ onClose }>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </a>
                { children }
            </div>
        </div>
    )

};

Modal.propTypes = {
    contentLabel: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;
