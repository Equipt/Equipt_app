import React from 'react';

import { Link } from 'react-router-dom';

const SideBar = (props) => {

	return (
		<aside className="sidebar-wrapper hidden-xs">

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

		</aside>
	)
};

export default SideBar;
