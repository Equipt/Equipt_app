import axios from 'axios';

import * as sessionActions from 'actions/session';

export default class Api {

	constructor(history, store) {

		this.history = history;
		this.store = store;

		this.basePath = "/api";

		axios.interceptors.request.use(config => {
			const state = this.store.getState();
			if (state.session.token) {
				config.headers.authorization = state.session.token;
			}
			return config;
		});

	}

	get(url, params) {
		return new Promise((resolve, reject) => {

			this.send(url, 'GET', null, {params: params})
			.then((res, apiKey) => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}

	post(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'POST', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	}

	put(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'PUT', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	}

	delete(url, data, options) {
		return new Promise((resolve, reject) => {
			this.send(url, 'DELETE', data, options)
			.then((res, apiKey) => {
				resolve(res, apiKey);
			}, (err) => {
				reject(err);
			});
		});
	}

	send(url, method, data, options = {}) {

		return new Promise((resolve, reject) => {

			const ajaxObj = {
				url: this.basePath + url,
				method: method,
				responseType: options.isMultipart ? false : 'application/json',
 				cache: false,
 				processData: false,
				params: options.params,
				data: options.isMultipart ? options.data : data
			};

			axios(ajaxObj)
			.then((res, status, xhr) => resolve(res.data))
			.catch(err => {

				const { data, status } = err.response;

				if (status === 500 || status === 401) {
					localStorage.clear();
					this.store.dispatch(sessionActions.clearSession());
					return this.history.push('/login');
				} else if (status === 404) {
					this.history.push('/not_found');
				}

				reject(data);

			});

		});

	}

};
