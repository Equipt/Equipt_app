import React from 'react';

import { Link } from 'react-router-dom';

const SideBar = (props) => {

	return (
		<aside className="sidebar-wrapper hidden-xs">

			<Link to="/sporting_goods">
				<i className="fa fa-home" aria-hidden="true"></i>
				<p>Rent an item</p>
			</Link>

			<Link to="/owner/sporting_goods">
				<i className="fa fa-list-ul" aria-hidden="true"></i>
				<p>See your items</p>
			</Link>

			<Link to="/owner/calendar">
				<i className="fa fa-calendar-check-o" aria-hidden="true"></i>
				<p>See your rentals</p>
			</Link>

			<Link to="/owner/sporting_goods/new">
				<i className="fa fa-plus" aria-hidden="true"></i>
				<p>Add an item</p>
			</Link>

		</aside>
	)
};

export default SideBar;
