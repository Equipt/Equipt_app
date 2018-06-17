import React from 'react';
import theme from 'assets/theme.js';

const GlobalStyles = () => (
  <div>
    <style jsx global>{`

			$primary_color: #8FC485;

      .main-wrapper {
      	position: relative;
      	.transition .container {
      		padding-top: 20px;
      	}
        .full-width {
          margin: 90px 0 0 0;
        }
      	margin: 90px 0 0 50px;
      	@media (max-width: ${ theme.tabletSize }) {
      		margin: 50px 0 0;
      	}
      }

      .container {
      	position: relative;
      	width: 95%;
      	min-height: 100vh;
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

      input[type=checkbox] {
        appearance: none;
      }

      input[type=checkbox] + label {
        &:before {
          content: '';
          display: inline-block;
          height: 16px;
          width: 16px;
          margin-right: 5px;
          vertical-align: middle;
          border: solid 2px ${ theme.primaryColor };
        }
      }

      input[type=checkbox]:checked + label {
        &:before {
          content: '✔';
          line-height: 1;
          color: ${ theme.primaryColor };
          padding-right: 1px;
        }
      }

      .profile-image {
        border-radius: 100%;
        vertical: middle;
      }

      nav {
        height: 72px;
        background: rgb(73, 146, 82);
        padding: 5px 25px 5px 0;
        z-index: 5;
        border-radius: 0;

        .signup {
          margin-left: 5px;
        }

        &.fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
        }

        .profile-image {
          max-width: 50px;
          border-radius: 100%;
          margin-top: -4px;
        }

        .session-container {
          float: right;
          width: 150px;
          padding: 10px 0;
          .profile-container,
          .logout-container {
            display: inline-block;
            width: 50%;
            vertical-align: top;
            color: #fff;
            text-align: center;
            cursor: pointer;
            p {
              margin: 2px 0 0;
            }
            i {
              font-size: 20px;
            }
          }
        }

      }

    `}</style>
  </div>
);

export default GlobalStyles;
