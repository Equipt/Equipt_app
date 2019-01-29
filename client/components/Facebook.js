import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login';

export default class FaceBook extends Component {

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired,
  		})
	};

  static propTypes = {
    loginWithFacebook: PropTypes.func.isRequired,
    facebookAppId: PropTypes.string.isRequired
  }

	login(facebookData) {

		const { loginWithFacebook } = this.props;
		const { history, route } = this.context.router;

		loginWithFacebook(facebookData, () => {
			if (route.location.pathname.indexOf('/login') > -1) {
				this.context.router.history.push('/sporting_goods');
			} else {
				this.context.router.history.push(route.location.pathname);
			}
		});
	}

	render() {

    const { facebookAppId } = this.props;

		return (
			<div>
				<hr/>
				<FacebookLogin
    				appId={ facebookAppId }
    				autoLoad={true}
    				fields="name,email,picture"
						disableMobileRedirect={ true }
    				callback={ this.login.bind(this) }/>
    	</div>
		);
	}

}
