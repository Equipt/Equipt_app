import React from 'react';
import { Link } from 'react-router-dom';

import theme from 'assets/theme.js';

class MobileNav extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			menuVisible: false
		};
	}

	toggleMenu() {
		this.setState({
			menuVisible: this.state.menuVisible ? false : true
		})
	}

	render() {

		const { session, clearSession, content } = this.props;

		const styles = {
			display: this.state.menuVisible ? 'block' : 'none'
		};

		let sessionHtml = (
			<ul className="dropdown-menu" style={ styles }>
				<li>
					<Link to="/login">{ content.nav.login }</Link>
				</li>
				<li>
					<Link to="/signup">{ content.nav.signup }</Link>
				</li>
			</ul>
		);

		// Set logged in html
		if (session.currentUser) {

			sessionHtml = (
				<ul className="dropdown-menu" style={ styles }>
					<li>
						<Link to="/sporting_goods">{ I18n.t('nav.all_goods') }</Link>
					</li>
					<li>
						<Link to="/owner/sporting_goods/new">{ I18n.t('nav.add_good') }</Link>
					</li>
					<li>
						<Link to="/owner/sporting_goods">{  I18n.t('nav.your_goods') }</Link>
					</li>
					<li>
						<Link to="/owner/schedule">{  I18n.t('nav.schedule') }</Link>
					</li>
					<li onClick={ clearSession }>
						<a href="#">{ content.nav.logout }</a>
					</li>
					<style jsx>{`
						.dropdown-menu {
							width: 100%;
							margin-top: -1px;
							> li > a {
								color: ${ theme.textColor };
							}
						}
					`}</style>
				</ul>
			);

		}

		return (
			<nav className="navbar fixed mobile-nav visible-xs">
				<Link to="/home">
					<img src={ 'https://s3-us-west-2.amazonaws.com/equipt-assets/logo.png' } width="55px" className="logo"/>
				</Link>
				<div onClick={ this.toggleMenu.bind(this) }>
					<i className={ `fa ${ this.state.menuVisible ? 'fa-times' : 'fa-bars' } pull-right hamburger` } aria-hidden="true"></i>
				</div>
				{ sessionHtml }
				<style jsx>{`
					img {
						float: left;
					}
					i {
						color: #fff;
						font-size: 30px;
						padding: 10px 0;
					}
				`}</style>
			</nav>
		)


	}


};

export default MobileNav;
