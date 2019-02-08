import types from 'actions/types';

const loader = (state = false, action) => {
	switch (action.type) {
		case types.SHOW_LOADER:
			return action.payload;
		default:
			return state;
	}
};

export default loader;
