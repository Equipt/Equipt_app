import React from 'react';

import { UserForm } from 'components/UserForm';
import { UsersContact } from 'components/UsersContact';
import Reviews from 'components/Reviews';

export class UsersProfile extends React.Component {

	constructor(props) {
		super(props);

		const { tabs } = this.props.content.profile.edit;

		this.state = {
			tabs: tabs,
			currentTab: tabs[0]
		}
	}

	submit(formData) {

		e.preventDefault();

	}

	clickedListItem(item) {
		this.setState({
			currentTab: item
		})
	}

	getCurrentTab() {

		const { currentUser } = this.props;
		const { signup } = this.props.content;
		const { currentTab } = this.state;

		switch(currentTab) {
			case this.state.tabs[1]:
				return <UsersContact { ...this.props } setAddress={ this.setAddress.bind(this) }/>;
			break;
			case this.state.tabs[2]:
				return <Reviews reviews={ currentUser.reviews || [] }/>;
			break;
		}

		return <UserForm submit={ this.submit.bind(this) } formContent={ signup } user={ currentUser }/>;

	}

	setAddress(address) {

		debugger;

	}

	render() {

		return (

			<section className="container">

				<aside className="col-xs-2 selection-list">

					<ul>
						{
							this.state.tabs.map(item => {
								return <li 	key={ `list_item_${ item }` }
														onClick={ this.clickedListItem.bind(this, item) }
														className={ this.state.currentTab === item ? 'active' : '' }>
														{ item }</li>
							})
						}

					</ul>

				</aside>

				<div className="col-xs-10 box-container">
					{ this.getCurrentTab.call(this) }
				</div>

			</section>
		)
	}
}
