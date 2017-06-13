export default {

	setSession: (apiKey) => {		
		if (apiKey) localStorage['api_key'] = apiKey;
	},

	destroySession: () => {
		localStorage['session'] = null;	
	},

	getSessionKey: () => {
		return localStorage['api_key'];	
	}

}