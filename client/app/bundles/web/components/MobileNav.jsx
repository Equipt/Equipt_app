import React from 'react';

import { Link } from 'react-router-dom';

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
						<Link to="/sporting_goods">{ content.nav.all_goods }</Link>
					</li>
					<li>
						<Link to="/sporting_goods/new">{ content.nav.add_good }</Link>
					</li>
					<li>
						<Link to="/sporting_goods/new">{ content.nav.your_goods }</Link>
					</li>
					<li>
						<Link to="/sporting_goods/new">{ content.nav.calendar }</Link>
					</li>
					<li onClick={ clearSession }>
						<a href="#">{ content.nav.logout }</a>
					</li>
				</ul>
			);

		}

		return (
			<nav className="navbar fixed mobile-nav visible-xs">
				<Link to="/home">
					<img className="pull-left" src={ content.logo } width="60"/>
				</Link>
				<div onClick={ this.toggleMenu.bind(this) }>				
					<i className={ `fa ${ this.state.menuVisible ? 'fa-times' : 'fa-bars' } pull-right hamburger` } aria-hidden="true"></i>
				</div>
				{ sessionHtml }

			</nav>
		)


	}


};

export default MobileNav;