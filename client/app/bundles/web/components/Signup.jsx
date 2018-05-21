import PropTypes from 'prop-types';
import React from 'react';

// import { UserForm } from 'components/UserForm';
import { FaceBookLogin } from 'components/FacebookLogin';
import SignupForm from 'components/forms/SignupForm';
import Terms from './modals/Terms.jsx';

export default class Signup extends React.Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

	static propTypes = {
		content: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		facebookAppId: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			aggreedToTerms: false
		}
	}

	submit(user) {

		const { actions } = this.props;

		actions.signup(user, () => {
				this.context.router.history.push('/sporting_goods');
		});

	}

	render() {

		const { user, actions, facebookAppId } = this.props;

		return (
			<section className="container">

				<h2>{ I18n.t('user.signup.title') }</h2>

				<SignupForm user={user} onSubmit={this.submit}>
					<a href="#" onClick={ e => {
						e.preventDefault();
						actions.openModal(<Terms terms={ I18n.t('user.terms.content') } title="End User License Aggreement"/>);
					}}>{ I18n.t('user.terms.title') }</a>
				</SignupForm>

				{ /* <UserForm { ...this.props } formContent={ content.signup } isCreating={ true }></UserForm> */ }

				<FaceBookLogin loginWithFacebook={ actions.loginWithFacebook } facebookAppId={ facebookAppId }/>

			</section>
		)
	}

}
