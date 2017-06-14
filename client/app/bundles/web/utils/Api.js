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

			let ApiKey = '111111';

			let path = this.path;

			var ajaxObj = {
				url: path + url,
				method: method,
				responseType: options.isMultipart ? false : 'application/json',
 				cache: false,
				data: options.data ? options.data : data,
			};

			axios(ajaxObj)
			.then((res, status, xhr) => {
				resolve(res.data);
			})
			.catch(err => {
				if (err.status === 500 || err.status === 401) {
					// Equipt.API.apiKey = null;
					// Equipt.actions.unauthorizedUser();
				}

				reject(err.response.data);
			});

		});

	}

}
