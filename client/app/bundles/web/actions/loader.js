import types from './types';

// Show / Hide Loader
export const showLoader = data => {
	return {
		type: types.SHOW_LOADER,
		payload: data
	}
};
