import React, { Component } from 'react';
import PropTypes from 'prop-types';
import theme from 'assets/theme';

import { Link } from 'react-router-dom';

export class SideBar extends Component {

	static contextTypes = {
			router: PropTypes.shape({
				history: PropTypes.object.isRequired
			})
	};

	constructor(props) {
		super(props);
		this.state = {
			isSticky: true
		}
		this.stickyNav = this.stickyNav.bind(this);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.stickyNav);
		this.stickyNav();
	}

	componentWillReceiveProps() {
		setTimeout(() => {
			window.scrollTo(window.scrollX, window.scrollY - 1);
			window.scrollTo(window.scrollX, window.scrollY + 1);
		}, 300);
	}

	stickyNav() {

		const { sideBar } = this.refs;
		const footer = document.getElementsByTagName('footer')[0];
		const bodyHeight = document.body.clientHeight;
		const windowHeight = window.innerHeight;
		const footerHeight = footer.clientHeight;

		const scrollTop = window.pageYOffset + windowHeight;
		const footerStart = bodyHeight - 100;

		this.setState({
			isSticky: scrollTop < footerStart
		});

	}

	componentDidMount() {
		window.addEventListener("scroll", this.stickyNav);
	}

	goBack() {
		this.context.router.history.goBack();
	}

	render() {
		const { isSticky } = this.state;

		return (
			<aside className={ `sidebar-wrapper hidden-xs ${ isSticky ? 'fixed' : 'absolute' }` } ref="sideBar">

				<Link to="/sporting_goods">
					<i className="icon compass"/>
					<p>Rent an item</p>
				</Link>

				<Link to="/owner/sporting_goods">
					<i className="icon backpack"/>
					<p>See your items</p>
				</Link>

				<Link to="/owner/schedule">
					<i className="icon map"/>
					<p>Schedule</p>
				</Link>

				<Link to="/owner/sporting_goods/new">
					<i className="icon axe"/>
					<p>Add an item</p>
				</Link>

				<div className="back" onClick={ this.goBack.bind(this) }>
					<i className="fa fa-arrow-left" aria-hidden="true"></i>
					<p>Go Back</p>
				</div>

				<style jsx>{`
					.sidebar-wrapper {
						position: fixed;
						top: 72px;
						left: 0;
						width: 70px;
						height: 100vh;
						padding-top: 5px;
						background: ${ theme.secondaryColor };
						z-index: 4;
					}
					.sidebar-wrapper.absolute {
						position: absolute;
						top: inherit;
						left: -50px;
						height: 94.8vh;
    				bottom: 139.4px;
					}
					i {
						cursor: pointer;
						color: #D64E33;
						font-size: 25px;
						margin: 5px auto;
					}
					i.bottom {
						position: absolute;
						bottom: 75px;
					}
					p {
						font-size: 13px;
						font-weight: bold;
						padding: 0 2px;
						color: #D64E33;
						text-align: center;
					}
					.icon {
						display: block;
						width: 40px;
						height: 40px;
						background: url('https://s3-us-west-2.amazonaws.com/equipt-assets/sprite.png') no-repeat;
					}
					.icon.compass {
						background-position: 0 -190px;
					}
					.icon.backpack {
						background-position: 0 -48px;
					}
					.icon.map {
						background-position: 0 -142px;
					}
					.icon.axe {
						background-position: 0 -95px;
					}
					.back {
						position: absolute;
						bottom: 80px;
						width: 100%;
						text-align: center;
						cursor: pointer;
					}
				`}</style>

			</aside>
		)
	}

};
