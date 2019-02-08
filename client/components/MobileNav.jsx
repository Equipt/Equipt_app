import React from 'react';
import { Link } from 'react-router-dom';

import theme from 'assets/theme.js';

class MobileNav extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isMenuVisible: false
		};

		this.renderDropDown = this.renderDropDown.bind(this);

	}

	toggleMenu() {
		this.setState({
			isMenuVisible: this.state.isMenuVisible ? false : true
		})
	}

	componentWillReceiveProps() {
		this.setState({
			isMenuVisible: false
		});
	}

	renderDropDown() {

		const { session, actions } = this.props;
		const dropDownList = session.currentUser ? I18n.t('nav.menuList') : I18n.t('nav.sessionList');

		return (
			<ul className="dropdown-menu">
				{
					dropDownList.map((listItem, index) => (
						<li key={ `drop_down_${ index }` }><Link to={ listItem.link }>{ listItem.name }</Link></li>
					))
				}
				{
					session.currentUser ?
					<li onClick={ () => actions.logout() }>Logout</li> :
					null
				}
				<style jsx>{`
					.dropdown-menu {
						display: block;
						position: fixed;
						top: 72px;
						width: 100%;
						margin-top: -1px;
						> li {
							padding: 0 5px 10px;
							font-size: 20px;
							color: ${ theme.textColor };
						}
					}
				`}</style>
				<style jsx global>{`
					.dropdown-menu a {
						padding: 0 !important;
						margin: 0;
					}
				`}</style>
			</ul>
		)
	}

	render() {

		const { session, clearSession } = this.props;
		const { isMenuVisible } = this.state;

		return (
			<nav className="navbar fixed mobile-nav visible-xs">
				<Link to="/home">
					<img src={ 'https://s3-us-west-2.amazonaws.com/equipt-assets/logo.png' } width="55px" className="logo"/>
				</Link>
				<div onClick={ this.toggleMenu.bind(this) }>
					<i className={ `fa ${ this.state.isMenuVisible ? 'fa-times' : 'fa-bars' } pull-right hamburger` } aria-hidden="true"></i>
				</div>
				{ isMenuVisible ? this.renderDropDown() : null }
				<style jsx>{`
					.mobile-nav {
						width: 100vw !important;
					}
					.hamburger {
						margin-top: 3px;
					}
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
