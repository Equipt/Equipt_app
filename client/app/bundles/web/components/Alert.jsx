import React from 'react';

const Alert = (props) => {

	const { alerts } = props;

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
		<div className="container">
			{ 
				alerts.map((alert, index) => {
					for (let key in alert) {
						let message = alert[key];
						return 	<div className={ `alert ${ alertClass(key) }` }
									 key={ `alert_${index}` }>
									{ message }
								</div>;	
					}
				})
			}
		</div>
	)

};

export default Alert;
