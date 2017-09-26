import React from 'react';

import { UserForm } from 'components/UserForm';

import Address from 'components/Address';

export class ProfileForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			listItems: ['Basic', 'Address', 'Reviews', 'Verify'],
			currentListItem: 'Basic'
		}
	}

	submit(formData) {

		e.preventDefault();

	}

	clickedListItem(item) {
		this.setState({
			currentListItem: item
		})
	}

	getCurrentTab() {

		const { currentUser } = this.props;
		const { signup } = this.props.content;

		if (this.state.currentListItem === 'Address') {
			return <Address/>;
		}

		return <UserForm submit={ this.submit.bind(this) } formContent={ signup } user={ currentUser }/>;

	}

	render() {

		return (

			<section className="container">

				<aside className="col-xs-2 selection-list">

					<ul>
						{
							this.state.listItems.map(item => {
								return <li 	key={ `list_item_${ item }` }
														onClick={ this.clickedListItem.bind(this, item) }
														className={ this.state.currentListItem === item ? 'active' : '' }>
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
