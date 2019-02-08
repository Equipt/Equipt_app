import axios from 'axios';

import * as sessionActions from 'Session/actions.js';
import * as alertActions from 'Alert/actions.js';

export default class Api {

	constructor(history, store) {

		this.history = history;
		this.store = store;

		this.basePath = "/api";

		// Set api key header
		axios.interceptors.request.use(config => {
			const state = this.store.getState();
			if (state.session.token) {
				config.headers.authorization = state.session.token;
			}
			return config;
		});

		axios.interceptors.response.use(
			response => response,
		 	error => {

				const { status, data } = error.response;
				const { dispatch } = this.store;

				switch(status) {
					// Server error
					case 500:
						dispatch(alertActions.showErrorAlert({ error: I18n.t('errors.server_error')}));
						return Promise.reject({});
					break;
					// Bad Request
					case 400:
					 	if (data.notice) dispatch(alertActions.showErrorAlert(data.notice));
						break;
					// Forbidden
					case 403:
					// Unprocessable Entity
					case 422:
						dispatch(alertActions.showErrorAlert(data));
						break;
					// Unauthorized
					case 401:
						localStorage.clear();
						dispatch(sessionActions.clearSession());
						dispatch(alertActions.showErrorAlert({ error: I18n.t('user.unauthorized')}));
						break;
					// Not found
					case 404:
						dispatch(alertActions.showErrorAlert(data));
						return this.history.push('/not_found');
						break;
				}

				return Promise.reject(error);

			})

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
			.catch(({ response }) => reject(response.data));

		});

	}

};
