import axios from 'axios';

export default function() {

	const BASE_PATH = '/api';

	this.token = null;

	this.get = (url) => {
		return new Promise((resolve, reject) => {
			
			this.send(url, 'GET')
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
				data: options.data ? options.data : data,
				headers: {
        			'Authorization': `Basic ${ this.token }`
    			}
			};

			axios(ajaxObj)
			.then((res, status, xhr) => {
				resolve(res.data);
			})
			.catch(err => {
				if (err.status === 500 || err.status === 401) {

				}

				reject(err.response.data);
			});

		});

	}

};

// export default (session) => {

// 	return {

// 		path: '/api',

// 		get: function(url) {
// 			return new Promise((resolve, reject) => {
// 				this.send(url, 'GET')
// 				.then((res, apiKey) => {
// 					resolve(res);
// 				}, (err) => {
// 					reject(err);
// 				});
// 			});
// 		},

// 		post: function(url, data, options) {
// 			return new Promise((resolve, reject) => {
// 				this.send(url, 'POST', data, options)
// 				.then((res, apiKey) => {
// 					resolve(res, apiKey);
// 				}, (err) => {
// 					reject(err);
// 				});
// 			});
// 		},

// 		put: function(url, data, options) {
// 			return new Promise((resolve, reject) => {
// 				this.send(url, 'PUT', data, options)
// 				.then((res, apiKey) => {
// 					resolve(res, apiKey);
// 				}, (err) => {
// 					reject(err);
// 				});
// 			});
// 		},

// 		delete: function(url) {
// 			return new Promise((resolve, reject) => {
// 				this.send(url, 'DELETE')
// 				.then((res, apiKey) => {
// 					resolve(res, apiKey);
// 				}, (err) => {
// 					reject(err);
// 				});
// 			});
// 		},

// 		send: function(url, method, data, options = {}) {

// 			return new Promise((resolve, reject) => {

// 				let path = this.path;

// 				var ajaxObj = {
// 					url: path + url,
// 					method: method,
// 					responseType: options.isMultipart ? false : 'application/json',
// 	 				cache: false,
// 					data: options.data ? options.data : data,
// 					headers: {
// 	        			'Authorization': `Basic ${ session.token }`
// 	    			}
// 				};

// 				axios(ajaxObj)
// 				.then((res, status, xhr) => {
// 					resolve(res.data);
// 				})
// 				.catch(err => {
// 					if (err.status === 500 || err.status === 401) {
// 						// Equipt.API.apiKey = null;
// 						// Equipt.actions.unauthorizedUser();
// 					}

// 					reject(err.response.data);
// 				});

// 			});

// 		}

// 	}

// }
