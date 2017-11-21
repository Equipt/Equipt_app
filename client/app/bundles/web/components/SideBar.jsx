import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class SideBar extends Component {

	static contextTypes = {
			router: PropTypes.shape({
				history: PropTypes.object.isRequired
			})
	};

	componentDidMount() {

		const { sideBar } = this.refs;

		window.addEventListener("scroll", () => {

			const footer = document.getElementsByTagName('footer')[0];

			const scrollTop = window.pageYOffset;
			const bodyHeight = document.body.clientHeight;
			const footerHeight = footer.clientHeight;

			console.log(scrollTop)

			if (scrollTop > (bodyHeight - 890)) {
				sideBar.classList.add('absolute');
			} else {
				sideBar.classList.remove('absolute');
			}

		});
	}

	goBack() {
		this.context.router.history.goBack();
	}

	render() {
		return (
			<aside className="sidebar-wrapper hidden-xs" ref="sideBar">

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

			</aside>
		)
	}

};
