import React, { Component } from 'react';

export default class AlertContainer extends Component {

	static SHOW_ALERT_PERIOD = 5000;

	componentWillReceiveProps(nextProps) {
    const { actions } = this.props;
		clearTimeout(this.showAlert);
		this.showAlert = setTimeout(actions.clearAlerts, 5000);
	}

  alertClass(alertType) {
		let alertClass = '';
		switch(alertType) {
			case 'error':
				alertClass = 'alert-danger';
			break;
			case 'success':
				alertClass = 'alert-success';
			break;
			case 'info':
				alertClass = 'alert-info';
			break;
		}
		return alertClass;
	}

	render() {

    const { alerts, actions } = this.props;

		return (
      <div className="alerts col-xs-12 col-md-5">
        {
          Object.keys(alerts).map((key, index) => (
            <div className={ `alert ${ this.alertClass(key) }` } key={ `alert_${index}` }>
              <i className="fa fa-times pull-right" aria-hidden="true" onClick={ actions.clearAlerts }></i>
              { alerts[key] }
            </div>
          ))
        }
      </div>
		)

	}

}
