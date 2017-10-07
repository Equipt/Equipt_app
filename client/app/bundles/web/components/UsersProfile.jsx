import React from 'react';

import { UserForm } from 'components/UserForm';
import { UsersContactForm } from 'components/UsersContactForm';
import Reviews from 'components/Reviews';

export class UsersProfile extends React.Component {

	constructor(props) {
		super(props);

		const { tabs } = this.props.content.profile;

		this.state = {
			tabs: tabs,
			currentTab: tabs[0]
		}
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
				return <UsersContactForm { ...this.props }/>;
			break;
			case this.state.tabs[2]:
				return <Reviews reviews={ currentUser.reviews || [] }/>;
			break;
		}

		return <UserForm { ...this.props } formContent={ signup } isUpdating={ true }/>;

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
