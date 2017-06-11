import axios from 'axios';

export default {

	path: '/api',

	get: function(url) {
		return new Promise((resolve, reject) => {
			this.send(url, 'GET')
			.then((res, apiKey) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	},

	post: function(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'POST', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	put: function(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'PUT', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	delete: function(url) {
		return new Promise((resolve, reject) => {
			this.send(url, 'DELETE')
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	send: function(url, method, data, options = {}) {

		return new Promise((resolve, reject) => {

			let ApiKey = Equipt.stores.AuthStore.getApiKey();

			var ajaxObj = {
				url: Equipt.API.path + url,
				type: method,
				contentType: options.isMultipart ? false : 'application/json',
 				cache: false,
  				processData: false,
				data: options.data ? options.data : JSON.stringify(data),
				beforeSend: (request) => {
	            	request.setRequestHeader('AUTHORIZATION', ApiKey);
	        	}
			};

			axios(ajaxObj)
			.success((res, status, xhr) => {
				if (res.errors) return hasErrors(res.errors);
				else if (res.notice) hasNotice(res.notice);
				resolve(res);
			})
			.error((err) => {
				if (err.status === 500 || err.status === 401) {
					Equipt.API.apiKey = null;
					Equipt.actions.unauthorizedUser();
				}
				reject(err);
			})
			.done(() => {
				Equipt.actions.hideLoader();
			});

		});

	}

}
