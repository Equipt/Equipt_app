import axios from 'axios';

export default function(history) {

	const BASE_PATH = '/api';

	this.token = null;

	this.get = (url, params) => {
		return new Promise((resolve, reject) => {

			this.send(url, 'GET', null, {params: params})
			.then((res, apiKey) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	this.post = (url, data, options) => {
		return new Promise((resolve, reject) => {
			this.send(url, 'POST', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	}

	this.put = function(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'PUT', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	this.delete = function(url) {
		return new Promise((resolve, reject) => {
			this.send(url, 'DELETE')
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	},

	this.send = function(url, method, data, options = {}) {

		return new Promise((resolve, reject) => {

			var ajaxObj = {
				url: BASE_PATH + url,
				method: method,
				responseType: options.isMultipart ? false : 'application/json',
 				cache: false,
 				processData: false,
				params: options.params,
				data: options.isMultipart ? options.data : data,
				headers: {
        			'Authorization': `Basic ${ this.token }`
    			}
			};

			axios(ajaxObj)
			.then((res, status, xhr) => resolve(res.data))
			.catch(err => {

				const { data, status } = err.response;

				if (status === 500 || status === 401) {
					localStorage.clear();
					return history.push('/login');
				} else if (status === 404) {
					return history.push('/not_found');
				}

				reject(data);

			});

		});

	}

};
