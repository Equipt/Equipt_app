import React from 'react';

const Alert = ({
	alerts = {},
	actions
}) => {

	function alertClass(alertType) {

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

	};

	return (
		<div className="container alerts">
			{
				Object.keys(alerts).map((key, index) => {
					let message = alerts[key];
					return 	<div className={ `alert ${ alertClass(key) }` }
								 key={ `alert_${index}` }>
								 <i className="fa fa-times pull-right"
								 	aria-hidden="true"
								 	onClick={ actions.clearAlerts }></i>
								{ message }
							</div>;
				})
			}
		</div>
	)

};

export default Alert;
