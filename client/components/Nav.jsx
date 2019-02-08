import React from 'react';

import theme from 'assets/theme.js';
import logo from 'assets/images/logo.png';

import { Link } from 'react-router-dom';

const Nav = ({
	session,
	actions,
	content
}) => {

	const { currentUser } = session;

	let sessionHtml = (<div className="pull-right session-container">
    	<Link className="btn btn-success login" to="/login">Login</Link>
    	<Link className="btn btn-success signup" to="/signup">Signup</Link>
	</div>);

	const profileSectionMarkup = () => {
		return (
			<Link to="/profile">
				{
					currentUser.profile ?
					<img src={ currentUser.profile } className="profile-image"/> :
					<span>
						<i className="fa fa-user-o" aria-hidden="true"/>
						<p>{ currentUser.firstname }</p>
					</span>
				}
				<style jsx>{`
					i, p {
						color: #fff;
					}
				`}</style>
			</Link>
		)
	}

	// Set logged in html
	if (currentUser) {

		sessionHtml = (
			<div className="session-container">
				<div className="profile-container">
				{ profileSectionMarkup() }
				</div>
				<div onClick={ () => actions.logout() } className="logout-container">
					<i className="fa fa-power-off power-off" aria-hidden="true"></i>
					<p>Logout</p>
				</div>
			</div>
		)
	}

	return (
		<nav className="navbar fixed hidden-xs">
			<Link to="/home">
				<img src={ 'https://s3-us-west-2.amazonaws.com/equipt-assets/logo.png' } width="55px" className="logo"/>
			</Link>
			{ sessionHtml }
			<style jsx>{`

				nav {
					height: 72px;
					background: ${ theme.primaryColor };
					padding: 5px 25px 5px 0;
					z-index: 5;
					border-radius: 0;

					a, a:visited {
						color: #fff;
					}

					.signup {
						margin-left: 5px;
					}

					&.fixed {
						position: fixed;
						top: 0;
						left: 0;
				    width: 100%;
					}

					.logo {
						margin-left: 5px;
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

					&.mobile-nav {
						.dropdown-menu {
							width: 100%;
						}
						img {
							width: 50px;
						}
						i {
							font-size: 35px;
							margin: 6px 0;
							color: #fff;
						}
					}

				}

			`}</style>
		</nav>
	)

};

export default Nav;
