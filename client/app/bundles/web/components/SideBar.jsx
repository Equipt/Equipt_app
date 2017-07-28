import React from 'react';

import { Link } from 'react-router-dom';

const SideBar = (props) => {

	return (
		<aside className="sidebar-wrapper hidden-xs">

			<Link to="/sporting_goods">
				<i className="fa fa-home" aria-hidden="true"></i>
			</Link>
			
			<Link to="/owner/sporting_goods">
				<i className="fa fa-list-ul" aria-hidden="true"></i>
			</Link>

			<i className="fa fa-calendar-check-o" aria-hidden="true"></i>
			
			<Link to="/owner/sporting_goods/new">
				<i className="fa fa-plus" aria-hidden="true"></i>
			</Link>

			<i className="fa fa-arrow-right bottom" aria-hidden="true"></i>

		</aside>
	)
};

export default SideBar;