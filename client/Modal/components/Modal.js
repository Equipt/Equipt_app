import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  isOpen = false,
  content = '',
  actions
}) =>
  isOpen ? (
    <div className="modal">
      <div className="overlay" onClick={ actions.closeModal }></div>
      <div className="content col-xs-10 col-xs-offset-1">
        <a className="pull-right" onClick={ actions.closeModal }>
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
        { React.cloneElement(content, { actions }) }
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          display: block;
          z-index: 999 !important;
        }
        .overlay {
          height: 100vh;
          width: 100vw;
          background: #fff;
          opacity: 0.7;
        }
        .content {
          position: absolute;
          top: 40px;
          max-height: 90vh;
          min-height: 400px;
          overflow: scroll;
          background: #fff;
          padding: 40px;
          border: solid 1px #ccc;
        }
      `}</style>
    </div>
  ) : null

export default Modal;
