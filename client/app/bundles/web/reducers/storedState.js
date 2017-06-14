const storedState = (state = {}, action) => {
	switch (action.type) {
		case 'LOAD_STORED_STATE':
			return Object.assign({}, state, action.storedState);
		default:
			return state;
	}
}

export default storedState;