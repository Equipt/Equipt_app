import React from 'react';
import theme from 'assets/theme.js';

const GlobalStyles = () => (
  <div>
    <style jsx global>{`

      .main-wrapper {
      	position: relative;
      	.transition .container {
      		padding-top: 20px;
      	}
        .full-width {
          margin: 74px 0 0 0;
        }
      	margin: 74px 0 0 50px;
      	@media (max-width: ${ theme.tabletSize }) {
      		margin: 50px 0 0;
      	}
      }

      .container {
      	position: relative;
      	width: 95%;
      	min-height: 87vh;
      	max-width: 1500px;
      	margin-bottom: 50px;
      	&.reduce-margin-top {
      		margin-top: 50px;
      	}
      }

      .cta {
        display: inline-block;
        text-align: center;
        margin: 0 5px;
        padding: 10px 20px;
        color: #fff;
        font-size: 14px;
        background: ${ theme.primaryColor };
        font-family: 'Graduate', cursive;
        &:hover {
          color: #fff;
          text-decoration: none;
          background: ${ theme.lightGreen };
        }
        &.large {
          font-size: 16px;
          padding: 15px 25px;
          width: 150px;
        }
      }

      form {
        .error, .error::placeholder {
          border-color: rgb(220, 53, 69);
          color: rgb(220, 53, 69);
        }
      }


    `}</style>
  </div>
);

export default GlobalStyles;
